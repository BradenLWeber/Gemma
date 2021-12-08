import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import * as Location from 'expo-location';
import * as Google from 'expo-google-app-auth';

const Login = (props) => {
    const [googleSubmitting, setGoogleSubmitting] = useState(false);
    const [demo, setDemo] = useState(false);

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
        props.navigator.navigate('User Login', {geoPermissions: handleGeoPermissions});
    }

    const handleSignup = () => {
        props.navigator.navigate('User Sign Up', { geoPermissions: handleGeoPermissions});
    }

    const handleGeoPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert("Location Permission has been denied!");
        }
    }

    const handleGuestLogin = async () => {
        handleGeoPermissions();
        props.navigator.navigate('Map', -1);
    }

    return (
        <View style={styles.loginView}>
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
        color: "black",
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
    }
});

export default Login;