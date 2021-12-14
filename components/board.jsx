import React, { useState, useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

{/* The Board component displays a collection of pins on a map. 
It does this by pulling the pin data for a certain board from the server. */}

const Board = (props) => {
    const MAPCORNERSECO = {
        NW: {latitude: 42.938853, longitude: -85.585157},
        NE: {latitude: 42.938853, longitude: -85.572434},
        SW: {latitude: 42.929539, longitude: -85.585157},
        SE: {latitude: 42.929539, longitude: -85.572434},
    };
    const MAPCORNERSCAM = {
        // The north and south are reversed because for some unknown reason,
        // that makes it work. I'm still baffled as to why.
        SW: { latitude: 42.937887, longitude: -85.594130 },
        SE: { latitude: 42.937887, longitude: -85.579824 },
        NW: { latitude: 42.926867, longitude: -85.594130 },
        NE: { latitude: 42.926867, longitude: -85.579824 },
    };

    const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false);
    const [creator, setCreator] = useState('');
    const [pins, setPins] = useState([]);
    const [makeBoard, setMakeBoard] = useState(null);
    const { board } = props;
    const mapIsEcosystem = board.boardmap === 'ECO';

    const MAPS = {
        ECO: require('../assets/mapEcoPreserve.png'),
        CAM: require('../assets/CampusFinal.png')
    }

    useEffect(() => {
        async function getData() {
            const response = await fetch('https://still-retreat-52810.herokuapp.com/Pins');
            const responseJson = await response.json();
            const pins = responseJson.filter((pin) => pin.boardid === board.boardid);
            setPins(pins);

            const response2 = await fetch('https://still-retreat-52810.herokuapp.com/AUsers');
            const response2Json = await response2.json();
            const theUser = response2Json.filter((user) => user.userid === board.userid);
            setCreator(theUser.nickname || 'Me');

            setMakeBoard({ pins: pins || [], map: board.boardmap, creator: theUser.nickname || '', boardid: board.boardid });
        }
        getData();
    }, []);

    const ecoTop = (pin) => {
        return (pin.latitude - MAPCORNERSECO.SW.latitude) / (MAPCORNERSECO.NE.latitude - MAPCORNERSECO.SW.latitude) * 126 - 10;
    }

    const ecoLeft = (pin) => {
        return (pin.longitude - MAPCORNERSECO.SW.longitude) / (MAPCORNERSECO.NE.longitude - MAPCORNERSECO.SW.longitude) * 160 - 5;
    }

    const camTop = (pin) => {
        return (pin.latitude - MAPCORNERSCAM.SW.latitude) / (MAPCORNERSCAM.NE.latitude - MAPCORNERSCAM.SW.latitude) * 154 - 10;
    }

    const camLeft = (pin) => {
        return (pin.longitude - MAPCORNERSCAM.SW.longitude) / (MAPCORNERSCAM.NE.longitude - MAPCORNERSCAM.SW.longitude) * 144 - 5;
    }

    const showPin = (pin) => {
        const pos = {
            left: mapIsEcosystem ? ecoLeft(pin) : camLeft(pin),
            top: mapIsEcosystem ? ecoTop(pin) : camTop(pin),
        }
        return (
            <View key={pin.pinname + String(pin.pinid)} style={{position: 'absolute'}}>
                <Image source={require('../assets/gem.png')} style={[styles.mapPin, pos]}/>
            </View>
        )
    }

    const displayName = (name) => {
        return name.length > 23 ? name.slice(0, 23) + '...' : name;
    }

    const getColor = (type) => {
        return props.boardType === 'Private' ? (type === 'primary' ? styles.privateColor : styles.privateColor2) : (type === 'primary' ? styles.publicColor : styles.publicColor2);
    }

    const handleMakePublicOrPrivate = async () => {
        if (props.boardType === 'Public') await props.makePrivate(board);
        else await props.makePublic(board);
    }

    const deleteBoardModal = () => {
        return (
          <Modal isVisible={true}>
            <View style={styles.deleteBoardModal}>
              <Text style={{alignSelf: 'center', fontSize: 25, margin: 10,}}>Delete board?</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity style={styles.deleteBoardModalButton} onPress={() => {props.deleteBoard(board); setShowDeleteBoardModal(false)}}>
                  <Text>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBoardModalButton} onPress={() => setShowDeleteBoardModal(null)}>
                  <Text>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )
      }

    return(
        <>
        <View style={[styles.boardView, getColor('primary')]}>
            {/* Text to the left of the map image */}
            <View style={styles.boardText}>
                <Text style={styles.boardTitle}>{board.boardname}</Text>
                <View style={styles.boardDivider} />
                <View style={{flexDirection: 'row'}}>
                    {board.boardname !== 'Default Private' && board.boardname !== 'Default Public' &&
                    <>
                        <TouchableOpacity style={[styles.boardButton, getColor('secondary')]} onPress={handleMakePublicOrPrivate}>
                            <Text>Make{'\n'}{props.boardType === 'Private' ? 'Public' : 'Private'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.boardButton2, getColor('secondary')]} onPress={() => setShowDeleteBoardModal(true)}>
                            <Image source={require('../assets/trash.png')} style={styles.trashIcon} />
                        </TouchableOpacity>
                    </>}
                </View>
                {/* This makes sure there is room for the creator name */}
                <View style={{height: 40}}/>
                <Text style={styles.boardCreatorText}>{displayName(creator)}</Text>
            </View>
            {/* Image is wrapped in a button that takes user back to the map screen */}
            <View style={mapIsEcosystem ? styles.imageBorderEco : styles.imageBorderCam}>
                <TouchableOpacity style={mapIsEcosystem ? styles.boardImageWrapperEco : styles.boardImageWrapperCam} onPress={() => {props.setBoard(makeBoard); props.navigator.navigate('Map', -1)}}>
                    <Image source={mapIsEcosystem ? MAPS.ECO : MAPS.CAM} style={board.map === 'ECO' ? styles.ecoImage : styles.camImage}/>
                    {pins.map((pin) => showPin(pin))}
                </TouchableOpacity>
            </View>
        </View>
        {showDeleteBoardModal ? deleteBoardModal() : null}
        </>
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
        width: 140,
        height: 3,
        marginTop: 7,
        backgroundColor: 'black',
        marginBottom: 5,
    },
    boardButton: {
        width: 60,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#909090',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        marginRight: 20,
    },
    boardButton2: {
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#909090',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
    },
    boardCreatorText: {
        fontSize: 10,
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
        right: -10
    },
    imageBorderCam: {
        height: 160,
        width: 150,
        backgroundColor: 'black',
        marginTop: 20,
        marginBottom: 20,
        right: -20,
    },
    trashIcon: {
        width: 40,
        height: 40,
    },
    privateColor: {
        backgroundColor: '#78beeb',
    },
    privateColor2: {
        backgroundColor: '#b4cfe0',
    },
    publicColor: {
        backgroundColor: '#6CC071',
    },
    publicColor2: {
        backgroundColor: '#b4ccb4',
    },
    deleteBoardModal: {
        backgroundColor: '#F2F2F2',
        width: 200,
        height: 120,
        alignSelf: 'center'
    },
    deleteBoardModalButton: {
        marginTop: 10,
        width: 50,
        height: 33,
        backgroundColor: '#C4C4C4',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Board;
