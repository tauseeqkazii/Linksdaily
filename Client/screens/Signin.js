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
import axios from 'axios'
import { API } from './config'
const Signin = ({ navigation }) => {
  const [email, setEmail] = useState('ryan@gmail.com')
  const [password, setPassword] = useState('rrrrrr')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    if (!email || !password) {
      alert('All fields are required')
      setLoading(false)
      return
    }
    // console.log("SIGNINREQUEST => ", name, email, password);
    try {
      const { data } = await axios.post(`${API}/signin`, {
        email,
        password,
      })
      setLoading(false)
      console.log('SIGN IN SUCCESS => ', data)
      alert('Sign in successful')
    } catch (err) {
      alert('Signup failed. Try again.')
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <CircleLogo />
      <Text style={styles.title}>Sign In</Text>

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
        title="Sign-In" // Update button title
        handleSubmit={handleSubmit}
        loading={loading}
      />
      <View style={styles.textContainer}>
        <Text style={styles.linkText}>
          Already joined?{' '}
          <Text
            onPress={() => navigation.navigate('Signup')}
            style={styles.link}
          >
            Sign-Up
          </Text>
        </Text>
        <Text style={styles.forgotPassword}>Forgot password ?</Text>
      </View>
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
  textContainer: {
    marginTop: 20,
  },
  link: {
    color: 'red',
    marginTop: 20,
  },
  linkText: {
    color: 'white',
  },
  forgotPassword: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
})

export default Signin
