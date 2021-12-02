import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'

const Board = (props) => {
    const { board } = props;
    const mapIsEcosystem = board.map === 'ECO';

    const MAPS = {
        ECO: require('../assets/mapEcoPreserve.png'),
        CAM: require('../assets/CampusFinal.png')
    }

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
            left: mapIsEcosystem ? pin.x / 1940 * 160 - 5 : pin.x / 1850 * 144 - 5,
            top: mapIsEcosystem ? pin.y / 1500 * 126 - 10 : pin.y / 1965 * 154 - 10,
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
                <Text style={styles.boardTitle}>{board.title}</Text>
                <View style={styles.boardDivider} />
                <Text style={styles.boardInfoText}>Pins: {board.pins.length}</Text>
                <Text style={styles.boardInfoText}>Upvotes: {board.upvotes}</Text>
                {/* Only render public/private button if it is personal boards, not public */}
                {props.boardType === 'My' && publicPrivateButton()}
                {/* This makes sure there is room for the creator name */}
                <View style={{height: 40}}/>
                <Text style={styles.boardCreatorText}>{displayName(board.creator)}</Text>
            </View>
            {/* Image is wrapped in a button that takes user back to the map screen */}
            <View style={mapIsEcosystem ? styles.imageBorderEco : styles.imageBorderCam}>
                <TouchableOpacity style={mapIsEcosystem ? styles.boardImageWrapperEco : styles.boardImageWrapperCam} onPress={() => {props.setBoard(props.board); props.setCreator(props.board.creator); props.navigator.navigate('Map')}}>
                    <Image source={mapIsEcosystem ? MAPS.ECO : MAPS.CAM} style={board.map === 'ECO' ? styles.ecoImage : styles.camImage}/>
                    {board.pins.map((pin) => showPin(pin))}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    boardView: {
        width: Dimensions.get('window').width * 0.93,
        position: 'relative',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        elevation: 10,
        alignItems: 'center',
    },
    boardText: {
        flexDirection: 'column',
        height: '100%',
        paddingLeft: 15,
        width: Dimensions.get('window').width * 0.93 - 195,
    },
    boardImageWrapperEco: {
        backgroundColor: 'white',
        height: 125,
        width: 160,
        elevation: 10,
        top: 3,
        left: 3,
        position: 'absolute',
    },
    boardImageWrapperCam: {
        backgroundColor: 'white',
        height: 154,
        width: 144,
        elevation: 10,
        top: 3,
        left: 3,
        position: 'absolute',
    },
    ecoImage: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    camImage: {
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
        width: 160,
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
        left: 15,
    },
    mapPin: {
        width: 10,
        height: 10,
    },
    imageBorderEco: {
        height: 131,
        width: 166,
        backgroundColor: 'black',
        marginTop: 20,
        marginBottom: 20,
        right: -5
    },
    imageBorderCam: {
        height: 160,
        width: 150,
        backgroundColor: 'black',
        marginTop: 20,
        marginBottom: 20,
        right: -20,
    }
});

export default Board;
