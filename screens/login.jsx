import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import * as Location from 'expo-location';
import * as Google from 'expo-google-app-auth';

const Login = (props) => {
    const [googleSubmitting, setGoogleSubmitting] = useState(false);
    const [demo, setDemo] = useState(false);

    //const wallpaper = require('../assets/homescreen1.png') ;

    const handleGoogleLogin = () => {
        setGoogleSubmitting(true);

        const config = {
            // These are gotten from my console.cloud.google account that I set up
            iosClientId: `282320214945-agg9q4c7vaakcickd2eivuo63fm14ouo.apps.googleusercontent.com`,
            androidClientId: `282320214945-e9oa9ldi6veroi1gj5bemmednrlfumo4.apps.googleusercontent.com`,
            scopes: ['profile', 'email'],
        };

        // Login and share the user information with the map screen
        Google
            .logInAsync(config)
            .then((result) => {
                const { type, user } = result;
                if (type === 'success') {
                    const { email, name, photoUrl } = user;
                    props.navigator.navigate('Map', photoUrl);
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

    const handleLogin = () => {
        props.navigator.navigate('User Login');
    }

    const handleSignup = () => {
        props.navigator.navigate('User Sign Up');
    }

    const handleGuestLogin = async () => {
        props.navigator.navigate('Map', -1);
    }

    return (
        <View style={styles.loginView}>
            <ImageBackground source={require('../assets/homescreen1.png')} style={styles.wallpaper}>
            <Text style={styles.loginTitle}>Gemma</Text>
            {/* Sign up button */}
            <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            {/* Login button */}
            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGuestLogin} style={styles.guestButton}>
                <Text style={styles.guestButtonText}>Continue as guest</Text>
            </TouchableOpacity>
            {demo && <TouchableOpacity onPress={handleGoogleLogin} style={[styles.loginButton, { marginTop: 200 }]}>
                <Text style={[styles.buttonText, { fontSize: 20 }]}>{googleSubmitting ? 'Working' : 'Login with Google'}</Text>
            </TouchableOpacity>}
            </ImageBackground>
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
        color: '#DAD9D9',
        width: 500,
    },
    signupButton: {
        alignItems: "center",
        backgroundColor: "#97CCEE",
        width: 200,
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 30,
        color: '#201E3C',
    },
    guestButtonText: {
        fontSize: 20,
        color: "#DAD9D9",
    },
    loginButton: {
        alignItems: "center",
        backgroundColor: "#6CC071",
        width: 200,
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
    },
    guestButton: {
        alignItems: 'center',
        width: 200,
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
    },
    wallpaper: {
        //flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        //resizeMode: 'cover',

    }
});

export default Login;