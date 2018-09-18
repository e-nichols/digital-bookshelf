const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Context, getUserId, APP_SECRET } = require('./utils')

const resolvers = {
  Query: {
    user(parent, { id }, ctx, info) {
      return ctx.db.query.user({ where: { id: id } }, info)
    },
    users(parent, args, ctx, info) {
      return ctx.db.query.users()
    },
    book(parent, { isbn }, ctx, info) {
      return ctx.db.query.book({ where: { isbn: isbn } }, info)
    },
    books(parent, args, ctx, info) {
      return ctx.db.query.books()
    },
    async bookshelf(parent, { id }, ctx, info) {
      const bookshelf = await ctx.db.query.bookshelf({ where: { id: id } }, `
        {
          id
          owner {
            id
          }
          books {
            id
            title
            isbn
          }
        }
        `)

      console.log('bookshelf: ' + JSON.stringify(bookshelf))

      // `getUserId` throws an error if the requesting user is not authenticated
      const userId = getUserId(ctx)

      if(bookshelf.owner.id === userId){
        return bookshelf
      }

      throw new Error(
       'Invalid permissions, you must be an owner or follower of a bookshelf to access it.',
      )
    },
    bookshelves(parent, args, ctx, info) {
      return ctx.db.query.bookshelves()
    }
  },
  Mutation: {
    async addBooksToShelf(parent, { books, bookshelfId }, ctx, info){
      // TODO: update the addBooksToShelf input type to avoid this books.books call.
      const upsertBooks = books.books.map(book => {
        return {
          where: {
            isbn: book.isbn
          },
          update: {
            title: book.title
          },
          create: {
            isbn: book.isbn,
            title: book.title
          }
        }
      })

      return ctx.db.mutation.updateBookshelf({
          data: {
            books: { upsert: upsertBooks }
          },
          where: {
            id: bookshelfId
          }
        }, `{
        id
        owner {
          id
          email
        }
        books {
          id
          isbn
          title
        }
      }`)
    },
    async createAccount(parent, { firstName, lastName, email, password }, ctx, info) {
      const hashedPassword = await bcrypt.hash(password, 10)

      // TODO: Remove this when "Add a book" functionality exists.
      const seedbooks = await ctx.db.query.books()
      console.log('seedbooks!!! -> ' + JSON.stringify(seedbooks))
      connectBooks = []
      seedbooks.forEach(book => connectBooks.push({ id: book.id }))

      // THIS IS NOT actually connecting owner id and books to the bookshelf. They are null.
      // Fix: pass in the fields to query on the returned shelf, by default it will only be scalar.
      // So we need to explicitly tell the mutation which fields we're interested in
      // in the "info" argument.
      const bookshelf = await ctx.db.mutation.createBookshelf({
        data: {
          owner: {
            create: {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: hashedPassword
            }
          },
          books: {
            connect: connectBooks
          }
        }
      }, `{
        id
        owner {
          id
          email
        }
        books {
          id
          isbn
          title
        }
      }`)

      return {
        token: jwt.sign({ userId: bookshelf.owner.id }, APP_SECRET),
        user: bookshelf.owner,
        bookshelf: bookshelf
      }
    },
    deleteUser(parent, { id }, ctx, info) {
      return ctx.db.mutation.deleteUser({ where: { id: id } }, info)
    },
    async login(parent, { email, password }, ctx, info) {

      const user = await ctx.db.query.user({ where: { email: email } } );
      if(!user){
        throw new Error(`No user found for email: ${email}`)
      }

      const valid = await bcrypt.compare(password, user.password)
      if(!valid){
        throw new Error('Invalid password')
      }

      const bookshelves = await
        ctx.db.query.bookshelves({ where: { owner: {id: user.id} }})

      if(!bookshelves.length){
        throw new Error('No bookshelf for user')
      }

      console.log('num bookshelf for this user: ' + bookshelves.length)

      return {
        token: jwt.sign({ userId: user.id }, APP_SECRET),
        user: user,
        bookshelfId: bookshelves[0].id
      }
    },
  },
}

const PRISMA = 'https://eu1.prisma.sh/public-junglepig-932/digital-bookshelf/dev'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
      endpoint: PRISMA, // the endpoint of the Prisma API
      debug: true, // log all GraphQL queries & mutations sent to the Prisma API
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
