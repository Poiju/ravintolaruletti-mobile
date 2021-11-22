import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { TextInput } from 'react-native-paper';

function LoginScreen() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {

  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login to your account.</Text>
      <TextInput
        title="Username"
        placeholder="Username"
        value={username}
        onChange={text => setUsername(text)}
        style={styles.nameInput}
      />
      <TextInput
        title="Password"
        placeholder="Password"
        value={password}
        onChange={text => setPassword(text)}
        style={styles.pwInput}
      />
      <Button title="Login" onPress={() => handleLogin()} style={styles.button} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 25
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18
  },
  nameInput: {
    marginBottom: 10,
    fontSize: 14
  },
  pwInput: {
    marginBottom: 20,
    fontSize: 14
  }
})

export default LoginScreen