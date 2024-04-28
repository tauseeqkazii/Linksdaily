// import react from 'react'
// import { View, Text, Image, StyleSheet } from 'react-native'

// const CircleLogo = () => (
//   <View style={styles.imageWrap}>
//     <Image style={styles.image} source={require('../../assets/image1.png')} />
//   </View>
// )
// const styles = StyleSheet.create({
//   image: {
//     height: 100,
//     width: 300,
//     marginBottom: 38,
//   },
//   imageWrap: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// })

// export default CircleLogo

import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Keyboard,
  KeyboardEvent,
} from 'react-native'

const CircleLogo = () => {
  const [logoSize, setLogoSize] = useState({ width: 300, height: 100 })

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setLogoSize({ width: 150, height: 50 }) // Adjust the size when the keyboard is shown
      },
    )

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setLogoSize({ width: 300, height: 100 }) // Restore the original size when the keyboard is hidden
      },
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  return (
    <View style={styles.imageWrap}>
      <Image
        style={[
          styles.image,
          { width: logoSize.width, height: logoSize.height },
        ]}
        source={require('../../assets/image1.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    margin: 38,
    marginBottom: 40,
    justifyContent: 'center',
  },
  imageWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, // Adjust the margin from the top}
  },
})

export default CircleLogo
