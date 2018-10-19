import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { View, StyleSheet } from 'react-native'

export default class BookshelfIcon extends React.Component {
  render(){
    return (
      <View style={styles.icon}>
        <Svg width="33" height="30" viewBox="0 0 33 30">
      		<Path fill="#22556E" d="M9.5,0h-6C3.2,0,3,0.2,3,0.5v20C3,20.8,3.2,21,3.5,21h6c0.3,0,0.5-0.2,0.5-0.5v-20C10,0.2,9.8,0,9.5,0z M9,19.5C9,19.8,8.8,20,8.5,20h-4C4.2,20,4,19.8,4,19.5v-18C4,1.2,4.2,1,4.5,1h4C8.8,1,9,1.2,9,1.5V19.5z"/>
        	<Path fill="#22556E" d="M19.5,4C19.2,4,19,4.2,19,4.5v16c0,0.3,0.2,0.5,0.5,0.5h4c0.3,0,0.5-0.2,0.5-0.5v-16C24,4.2,23.8,4,23.5,4 H19.5z M23,19.5c0,0.3-0.2,0.5-0.5,0.5h-2c-0.3,0-0.5-0.2-0.5-0.5v-14C20,5.2,20.2,5,20.5,5h2C22.8,5,23,5.2,23,5.5V19.5z"/>
        	<Path fill="#22556E" d="M25.5,4C25.2,4,25,4.2,25,4.5v16c0,0.3,0.2,0.5,0.5,0.5h4c0.3,0,0.5-0.2,0.5-0.5v-16C30,4.2,29.8,4,29.5,4 H25.5z M29,19.5c0,0.3-0.2,0.5-0.5,0.5h-2c-0.3,0-0.5-0.2-0.5-0.5v-14C26,5.2,26.2,5,26.5,5h2C28.8,5,29,5.2,29,5.5V19.5z"/>
        	<Path fill="#22556E" d="M11.5,0C11.2,0,11,0.2,11,0.5v20c0,0.3,0.2,0.5,0.5,0.5h6c0.3,0,0.5-0.2,0.5-0.5v-20C18,0.2,17.8,0,17.5,0 H11.5z M17,19.5c0,0.3-0.2,0.5-0.5,0.5h-4c-0.3,0-0.5-0.2-0.5-0.5v-18C12,1.2,12.2,1,12.5,1h4C16.8,1,17,1.2,17,1.5V19.5z"/>
          <Path fill="#22556E" d="M31.2,21H1.8c-1,0-1.8,1.1-1.8,2.5v0C0,24.9,0.8,26,1.8,26H3v4h3v-4h21v4h3v-4h1.2c1,0,1.8-1.1,1.8-2.5v0 C33,22.1,32.2,21,31.2,21z M5,29H4v-3h1V29z M29,29h-1v-3h1V29z M32,23.6c0,1.1-0.2,1.4-1.8,1.4H2.8C1,25,1,25,1,23.6v-0.1 C1,22.3,1,22,2.8,22h27.5c1.4,0,1.8,0.2,1.8,1.4V23.6z"/>
        </Svg>
      </View> )
  }
}

const styles = StyleSheet.create({
  icon:{
    flex: 1,
    justifyContent: 'center',
  }
})
