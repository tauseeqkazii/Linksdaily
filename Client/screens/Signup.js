import React, { useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import UserInput from '../components/auth/UserInput'
import SubmitButton from '../components/auth/SubmitButton'
import CircleLogo from '../components/auth/CircleLogo'
import axios from 'axios' // Import Axios
import { API } from './config'

const Signup = ({ navigation }) => {
  const [name, setName] = useState('Ryan')
  const [email, setEmail] = useState('ryan@gmail.com')
  const [password, setPassword] = useState('rrrrrr')
  const [loading, setLoading] = useState(false)

  // console.log("NAVIGATION -> ", navigation);

  const handleSubmit = async () => {
    setLoading(true)
    if (!name || !email || !password) {
      alert('All fields are required')
      setLoading(false)
      return
    }
    // console.log("SIGNUP REQUEST => ", name, email, password);
    try {
      const { data } = await axios.post(`${API}/Signup`, {
        name,
        email,
        password,
      })
      setLoading(false)
      console.log('SIGN IN SUCCESS => ', data)
      alert('Sign up successful')
    } catch (err) {
      alert('Signup failed. Try again.')
      console.log(err)
      setLoading(false)
    }
  }
  return (
    <View style={styles.container}>
      <CircleLogo />
      <Text style={styles.title}>Sign Up</Text>
      <UserInput
        name="NAME"
        value={name}
        setValue={setName}
        autoCapitalize="words"
        autoCorrect={false}
      />
      <UserInput
        name="EMAIL"
        value={email}
        setValue={setEmail}
        autoCompleteType="email"
        keyboardType="email-address"
      />
      <UserInput
        name="PASSWORD"
        value={password}
        setValue={setPassword}
        autoCompleteType="password"
        secureTextEntry={true}
      />
      <SubmitButton
        title="Sign-Up"
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <Text style={styles.text}>
        Already have an account?{' '}
        <Text
          onPress={() => navigation.navigate('Signin')}
          style={styles.linkText}
        >
          Sign-in
        </Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  json: {
    color: 'white',
  },
  text: {
    color: 'white',
    marginTop: 20,
  },
  linkText: {
    color: 'red',
  },
})

export default Signup
