import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'

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

    const showPin = (pin) => {
        const pos = {
            left: pin.x / 1940 * 160 - 5,
            top: pin.y / 1500 * 126 - 10,
        }
        return (
            <View key={pin.title + String(pin.key)} style={{position: 'absolute'}}>
                <Image source={require('../assets/gem.png')} style={[styles.mapPin, pos]}/>
            </View>
        )
    }

    const displayName = (name) => {
        return name.length > 23 ? name.slice(0, 23) + '...' : name;
    }

    return(
        <View style={styles.boardView}>
            {/* Text to the left of the map image */}
            <View style={styles.boardText}>
                <Text style={styles.boardTitle}>{props.board.title}</Text>
                <View style={styles.boardDivider} />
                <Text style={styles.boardInfoText}>Pins: {props.board.pins.length}</Text>
                <Text style={styles.boardInfoText}>Upvotes: {props.board.upvotes}</Text>
                {/* Only render public/private button if it is personal boards, not public */}
                {props.boardType == 'My' && publicPrivateButton()}
                <Text style={styles.boardCreatorText}>{displayName(props.board.creator)}</Text>
            </View>
            {/* Image is wrapped in a button that takes user back to the map screen */}
            <View style={styles.imageBorder}>
                <TouchableOpacity style={styles.boardImageWrapper} onPress={() => {props.setBoard(props.board.pins); props.setCreator(props.board.creator); props.navigator.navigate('Map')}}>
                    <Image source={require('../assets/mapEcoPreserve.png')} style={styles.boardImage}/>
                    {props.board.pins.map((pin) => showPin(pin))}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    boardView: {
        width: Dimensions.get('window').width * 0.93,
        position: 'relative',
        height: 180,
        marginBottom: 20,
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        elevation: 20,
        alignItems: 'center',
    },
    boardText: {
        flexDirection: 'column',
        height: '100%',
        paddingLeft: 15,
        width: Dimensions.get('window').width * 0.93 - 195,
    },
    boardImageWrapper: {
        backgroundColor: 'white',
        height: 125,
        width: 160,
        elevation: 10,
        top: 3,
        left: 3,
        position: 'absolute',
    },
    boardImage: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    boardTitle: {
        marginTop: 13,
        fontSize: 19,
    },
    boardInfoText: {
        marginTop: 5,
    },
    boardDivider: {
        width: 140,
        height: 3,
        marginTop: 7,
        backgroundColor: 'gray',
        marginBottom: 5,
    },
    boardButton: {
        width: 60,
        height: 27,
        borderRadius: 5,
        backgroundColor: 'gray',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
    },
    boardCreatorText: {
        fontSize: 10,
        color: '#6e6e6e',
        width: '100%',
        position: 'absolute',
        bottom: 13,
        marginLeft: 15,
    },
    mapPin: {
        width: 10,
        height: 10,
    },
    imageBorder: {
        height: 131,
        width: 166,
        backgroundColor: 'black',
        right: 25,
        position: 'absolute',
    }
});

export default Board;
