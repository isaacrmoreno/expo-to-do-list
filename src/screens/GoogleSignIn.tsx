import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { Button } from 'react-native';
import { StyleSheet } from 'react-native';

// Initialize Firebase
initializeApp({
  apiKey: 'AIzaSyBxZgdo00vR_aoPSK09cK-KKZXqGHDWIt8',
  authDomain: 'expo-to-do-list.firebaseapp.com',
  projectId: 'expo-to-do-list',
  storageBucket: 'expo-to-do-list.appspot.com',
  messagingSenderId: '383655563055',
  appId: '1:383655563055:web:93228a361361b76b545bda',
});

WebBrowser.maybeCompleteAuthSession();

const GoogleSignIn = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '383655563055-lpe233e6f1eo1cd48dfnb9978ntlki0n.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const credential = provider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <Button
      style={styles.signInButton}
      disabled={!request}
      title='Login'
      onPress={() => {
        promptAsync();
      }}
    />
  );
};

export default GoogleSignIn;

const styles = StyleSheet.create({
  signInButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: 'red',
    borderWidth: 1,
    width: 100,
  },
});
