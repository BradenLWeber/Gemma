import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'


const Board = (props) => {
    // This button allows the user to change a board between public and private
    // It is only visible on "My boards"
    const publicPrivateButton = () => {
        return (
            <TouchableOpacity style={styles.boardButton}>
                <Text>Public</Text>
            </TouchableOpacity>
        )
    }
    return(
        <View style={styles.boardView}>
            {/* Text to the left of the map image */}
            <View style={styles.boardText}>
                <Text style={styles.boardTitle}>Sunset spot</Text>
                <View style={styles.boardDivider} />
                <Text style={styles.boardInfoText}>Pins: 3</Text>
                <Text style={styles.boardInfoText}>Upvotes: So many</Text>
                {/* Only render public/private button if it is personal boards, not public */}
                {props.boardType == 'My' && publicPrivateButton()}
                <Text style={styles.boardCreatorText}>Creator: VanderLindenIsTheGoose</Text>
            </View>
            {/* Image is wrapped in a button that takes user back to the map screen */}
            <TouchableOpacity style={styles.boardImageWrapper} onPress={() => props.navigator.navigate('Map')}>
                <Image source={require('../assets/map-pins.png')} style={styles.boardImage}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    boardView: {
        width: '91%',
        height: 180,
        marginBottom: 20,
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 20,
    },
    boardText: {
        flexDirection: 'column',
        height: '100%',
    },
    boardImageWrapper: {
        borderColor: 'black',
        borderWidth: 3,
        backgroundColor: 'white',
        margin: 10,
        height: 160,
        width: 160,
        elevation: 10,
    },
    boardImage: {
        height: 154,
        width: 154,
    },
    boardTitle: {
        marginLeft: 15,
        marginTop: 13,
        fontSize: 19,
    },
    boardInfoText: {
        marginTop: 5,
        marginLeft: 15,
    },
    boardDivider: {
        width: 140,
        height: 3,
        marginLeft: 15,
        marginTop: 7,
        backgroundColor: 'gray',
        marginBottom: 5,
    },
    boardButton: {
        width: 60,
        height: 27,
        borderRadius: 5,
        backgroundColor: 'gray',
        marginLeft: 15,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
    },
    boardCreatorText: {
        fontSize: 10,
        marginLeft: 12,
        color: '#6e6e6e',
        position: 'absolute',
        bottom: 14,
        width: '100%',
    }
});

export default Board;
