import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Google from 'expo-google-app-auth';

{/* login is the first screen users see when they open the app.
It displays the app's logo, and it gives users the option to log in, sign up, or continue as a guest. */}

const Login = (props) => {
    const [googleSubmitting, setGoogleSubmitting] = useState(false);
    const [demo, setDemo] = useState(false);

    const handleGoogleLogin = () => {
        setGoogleSubmitting(true);

        const config = {
            // These are from Braden's console.cloud.google account that he set up
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
            {/* Logo/wallpaper */}
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

            {/* Continue as guest */}
            <TouchableOpacity onPress={handleGuestLogin} style={styles.guestButton}>
                <Text style={styles.guestButtonText}>Continue as guest</Text>
            </TouchableOpacity>

            {/* Braden working on Google login */}
            {demo && <TouchableOpacity onPress={handleGoogleLogin} style={[styles.loginButton, { marginTop: 200 }]}>
                <Text style={[styles.buttonText, { fontSize: 20 }]}>{googleSubmitting ? 'Working' : 'Login with Google'}</Text>
            </TouchableOpacity>}
            </ImageBackground>
        </View>
    )
};

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 30,
        color: '#201E3C',
    },
    guestButton: {
        alignItems: 'center',
        width: 200,
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
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
    loginTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 60,
        marginTop: 80,
        color: '#DAD9D9',
        width: 500,
    },
    loginView: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    signupButton: {
        alignItems: "center",
        backgroundColor: "#97CCEE",
        width: 200,
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
    },
    wallpaper: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
    }
});

export default Login;