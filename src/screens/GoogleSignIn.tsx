import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
// import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { TouchableOpacity, Text, View } from 'react-native';
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
      // GoogleAuthProvider.credential(id_token);
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.signInButton}
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignIn;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  signInButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 80,
    width: 100,
  },
});
