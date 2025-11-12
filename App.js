import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, StyleSheet, Linking } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as AppleAuthentication from 'expo-apple-authentication';
import { getAuth, signInWithCredential, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from 'firebase/auth';
import { auth } from './firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [googleRequest, googleResponse, googlePromptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'VENDOS_CLIENT_ID_EXPO_GOOGLE',
  });

  const [fbRequest, fbResponse, fbPromptAsync] = Facebook.useAuthRequest({
    clientId: 'VENDOS_FACEBOOK_APP_ID',
  });

  const githubProvider = new OAuthProvider('github.com');
  const microsoftProvider = new OAuthProvider('microsoft.com');
  const twitterProvider = new OAuthProvider('twitter.com');
  const yahooProvider = new OAuthProvider('yahoo.com');

  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const { id_token } = googleResponse.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(userCredential => {
          Alert.alert('✅ Google Login', `Hello ${userCredential.user.displayName}`);
        })
        .catch(error => Alert.alert('Error', error.message));
    }

    if (fbResponse?.type === 'success' && fbResponse.authentication) {
      const credential = FacebookAuthProvider.credential(fbResponse.authentication.accessToken);
      signInWithCredential(auth, credential)
        .then(userCredential => {
          Alert.alert('✅ Facebook Login', `Hello ${userCredential.user.displayName}`);
        })
        .catch(error => Alert.alert('Error', error.message));
    }
  }, [googleResponse, fbResponse]);

  const handleOAuthLogin = async (provider, name) => {
    signInWithCredential(auth, provider.credential())
      .then(user => Alert.alert(`✅ ${name} Login`, `Hello ${user.user.displayName}`))
      .catch(err => Alert.alert('Error', err.message));
  };

  const buttons = [
    { title: '🌐Sign in with Google', url: 'https://accounts.google.com/', color: '#1963ec', textColor: '#fff' },
    { title: '📘Sign in with Facebook', url: 'https://www.facebook.com/', color: '#3b5998', textColor: '#fff' },
    { title: '🍎Sign in with Apple', url: 'https://account.apple.com/account/home', color: '#000', textColor: '#fff' },
    { title: '🐱Sign in with GitHub', url: 'https://github.com/login', color: '#333', textColor: '#fff' },
    { title: '🖥️Sign in with Microsoft', url: 'https://login.microsoftonline.com', color: '#2F2F8D', textColor: '#fff' },
    { title: '💬Sign in with Twitter', url: 'https://twitter.com/login', color: '#1DA1F2', textColor: '#fff' },
    { title: '💌Sign in with Yahoo', url: 'https://login.yahoo.com', color: '#6001D2', textColor: '#fff' },
    { title: '🎮Sign in with Play Games', url: 'https://www.play-games.com/', color: '#cfed0b', textColor: '#000' },
    { title: '🕹️Sign in with Game Center', url: 'https://developer.apple.com/game-center/', color: '#df381e', textColor: '#fff' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🔥 Firebase Authentication Providers</Text>

      {buttons.map((btn, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.button, { backgroundColor: btn.color }]}
          onPress={() => Linking.openURL(btn.url)}
        >
          <Text style={[styles.buttonText, { color: btn.textColor }]}>{btn.title}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.note}>
        Play Games dhe Game Center janë në dispozicion vetëm në Android/iOS builds.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    marginTop: 30,
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
});
