import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
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
            iosClientId : `282320214945-agg9q4c7vaakcickd2eivuo63fm14ouo.apps.googleusercontent.com`,
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
                    alert('Google signin successful');
                    setTimeout(() => {props.navigator.navigate('Map', {email, name, photoUrl});}, 3000);
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
        <View>
            <Button onPress={handleLogin} title={googleSubmitting ? 'Working' : 'Login'} style={{backgroundColor: 'yellow', height: 34}} />
        </View>
    )
};

export default Login;