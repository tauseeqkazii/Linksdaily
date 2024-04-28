import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

const SubmitButton = ({ title, handleSubmit, loading }) => (
  <TouchableOpacity style={styles.button} onPress={handleSubmit}>
    <Text style={styles.buttontext}>{loading ? 'please wait' : title}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    fontWeight: 'bold',
    justifyContent: 'center',
    backgroundColor: 'blue',
    padding: 12,
    alignSelf: 'stretch',
    borderRadius: 15,
    // margin: ,
    marginTop: 20,
  },
  buttontext: {
    color: '#000000',
    textAlign: 'center',
  },
})
export default SubmitButton
