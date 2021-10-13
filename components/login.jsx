import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

const Login = (props) => {

    const handleLogin = () => {
        alert('Login will be implemented soon...');
    }

    const handleSignup = () => {
        alert('Sign in will also be implemented soon...');
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
            {/* Continue as guest button */}
            <TouchableOpacity onPress={() => props.navigator.navigate('Map')} style={styles.guestButton}>
                <Text style={styles.guestButtonText}>Continue as guest</Text>
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