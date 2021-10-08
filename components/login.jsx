import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import * as Google from 'expo-google-app-auth';

// Here's the youtube video that taught me how to login: https://www.youtube.com/watch?v=FSMrzYpBeDM
// Note: This video has a followup that explains how to stay logged in even after exitting the app
const Login = (props) => {

    // This can be used to trigger certain things on the screen while google is authenticating
    const [googleSubmitting, setGoogleSubmitting] = useState(false);

    const handleLogin = () => {
        setGoogleSubmitting(true);

        const config = {
            // These are gotten from my console.cloud.google account that I set up
            iosClientId: `282320214945-agg9q4c7vaakcickd2eivuo63fm14ouo.apps.googleusercontent.com`,
            androidClientId: `282320214945-e9oa9ldi6veroi1gj5bemmednrlfumo4.apps.googleusercontent.com`,
            scopes: ['profile', 'email']
        };

        // Login and share the user information with the map screen
        Google
            .logInAsync(config)
            .then((result) => {
                const { type, user } = result;
                if (type === 'success') {
                    const { email, name, photoUrl } = user;
                    props.setUserInfo(name, email, photoUrl);
                    setTimeout(() => { props.navigator.navigate('Map'); }, 500);
                } else {
                    alert('Google login failed');
                }
                setGoogleSubmitting(false);
            })
            .catch((error) => {
                console.log(error);
                setGoogleSubmitting(false);
            });
    }

    return (
        <View style={styles.loginView}>
            <Text style={styles.loginTitle}>Gemma</Text>
            <TouchableOpacity style={styles.signupButton}>
                <Text style={styles.buttonText}>{googleSubmitting ? 'Working' : 'Sign Up'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                <Text style={styles.buttonText}>{googleSubmitting ? 'Working' : 'Login'}</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    loginView: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    loginTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 60,
        marginTop: 80,
        color: '#201E3C',
    },
    signupButton: {
        alignItems: "center",
        backgroundColor: "#97CCEE",
        width: 200,
        marginTop: 20,
        padding: 10,
    },
    buttonText: {
        fontSize: 30,
        color: '#201E3C',
    },
    loginButton: {
        alignItems: "center",
        backgroundColor: "#6CC071",
        width: 200,
        marginTop: 20,
        padding: 10,
    },
});



export default Login;