import React from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'

const UserInput = ({
  name,
  value,
  setValue,
  autoCapitalize = 'none',
  autoCorrect,
  autoCompleteType,
  keyboardType = 'default',
  secureTextEntry = false,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{name}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          autoCompleteType={autoCompleteType}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          style={styles.input}
          value={value}
          onChangeText={(text) => setValue(text)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 24,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelWrapper: {
    width: 80,
  },
  inputLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  inputWrapper: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    color: 'white',
  },
})

export default UserInput
