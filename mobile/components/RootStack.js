import  gql from 'graphql-tag'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { DrawerItems, SafeAreaView, createBottomTabNavigator, createDrawerNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation'

import AuthLoadingScreen from './AuthLoadingScreen'
import BookshelfDetail from './BookshelfDetail'
import { BookshelfList } from './BookshelfList'
import CreateAccount from './CreateAccount'
import ConfirmAccount from './ConfirmAccount'
import Discover from './Discover'
import Launch from './Launch'
import LoginForm from './LoginForm'
import Profile from './Profile'

import { LIGHT_GREEN_HEX } from './CommonStyles'

const SHARED_NAV_OPTIONS = {
  headerStyle: {
    backgroundColor: '#008B8B',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  }
}

const AuthStack = createStackNavigator({
  Launch: {
    screen: Launch
  },
  CreateAccount: {
    screen: CreateAccount
  },
  ConfirmAccount: {
    screen: ConfirmAccount
  }
},
{
  initialRouteName: 'Launch',
  headerMode: 'screen',
  navigationOptions: SHARED_NAV_OPTIONS,
})

const BookshelfStack = createStackNavigator({
  BookshelfList: {
    screen: BookshelfList
  },
  BookshelfDetail: {
    screen: BookshelfDetail
  }
}, {
  initialRouteName: 'BookshelfList',
  navigationOptions: SHARED_NAV_OPTIONS,
})

const DiscoverStack = createStackNavigator({
  Discover: {
    screen: Discover
  }
}, {
  initialRouteName: 'Discover',
  navigationOptions: SHARED_NAV_OPTIONS,
})

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile
  }
}, {
  initialRouteName: 'Profile',
  navigationOptions: SHARED_NAV_OPTIONS,
})

const AppTabNavigator = createBottomTabNavigator({
  Bookshelves: {
    screen: BookshelfStack
  },
  Discover: {
    screen: DiscoverStack
  },
  Profile: {
    screen: ProfileStack
  },
},{
  initialRouteName: 'Bookshelves',
  tabBarOptions: {
    showLabel: true,
  }
})

const RootStack = createSwitchNavigator({
  App: { screen: AppTabNavigator },
  Auth: { screen: AuthStack },
  AuthLoading: { screen: AuthLoadingScreen }
}, {
  initialRouteName: 'AuthLoading'
})

export default RootStack
