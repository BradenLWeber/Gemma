import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';

import AddBoard from '../components/addBoard';
import Board from '../components/board';
import UserBar from '../components/userBar';

{/* This screen displays the boards available to the user. 
It allows the user to toggle between public and private boards and to create a new board. */}

const BoardScreen = (props) => {

  const [publicOrPrivate, setPublicOrPrivate] = useState('Private');
  const [searchType, setSearchType] = useState('board');
  const [searchValue, setSearchValue] = useState('');
  const [addBoardModal, setAddBoardModal] = useState(false);
  const [publicBoards, setPublicBoards] = useState([]);
  const [privateBoards, setPrivateBoards] = useState([]);

  useEffect(() => {
    setPrivateBoards([
      {
        creator: 'Me',
        title: 'Default ecosystem board',
        map: 'ECO',
        pins: []
      },
      {
        creator: 'Me',
        title: 'Default campus board',
        map: 'CAM',
        pins: []
      },
      {
      creator: 'VanderGoosen',
      title: 'Private board',
      map: 'ECO',
      pins: [
        {
          longitude: -85.581606,
          latitude: 42.935067,
          pinname: 'Frog pond',
          pintag: 'Frog',
          pinnotes: 'This pond has tadpoles and frogs consistently every year',
          pinid: 984,
        },
        {
          longitude: -85.580725,
          latitude: 42.934221,
          pinname: 'Bird\'s nest!!!!',
          pintag: 'Bird, nest, !!!',
          pinnotes: 'I found a bird nest here the other day!!! The eggs had afros and I think one was doing the worm.',
          pinid: 986,
        },
        {
          longitude: -85.585157,
          latitude: 42.938853,
          pinname: 'Corner',
          pintag: 'Corn',
          pinnotes: 'You\'r cornered',
          pinid: 986,
        },
        {
          longitude: -85.5787955,
          latitude: 42.934196,
          pinname: 'Middle of the map',
          pintag: 'MIDDLEFORDAYS',
          pinnotes: 'You have clicked on a pin. Congrats, you have a finger.',
          pinid: 986,
        },
      ]
    }
    ]);
    setPublicBoards([
      {
        creator: 'NoobIsNewbie',
        title: 'Public board',
        map: 'ECO',
        pins: [
          {
            longitude: -85.580512,
            latitude: 42.932655,
            pinname: 'A spot on the map',
            pintag: 'map, the',
            pinnotes: 'This is a public spot!',
            key: 483,
          },
          {
            longitude: -85.584557,
            latitude: 42.935176,
            pinname: 'Near the edge',
            pintag: 'Edge',
            pinnotes: 'This is near the edge',
            key: 484,
          },
        ]
      },
      {
        creator: 'IAmPotato',
        title: 'Campus!',
        map: 'CAM',
        pins: [
          {
            longitude: -85.592107,
            latitude: 42.934988,
            pinname: 'Baseball field',
            pintag: 'Baseball, base, ball, field, fun, woo hoo',
            pinnotes: 'Take me out to the ball game',
            key: 485,
          },
          {
            longitude: -85.587391,
            latitude: 42.931423,
            pinname: 'The best dining hall',
            pintag: 'In your face, commons is best',
            pinnotes: 'It has been long debated which dining hall is best. Put your questions to rest, it has finally been answered.',
            key: 486,
          },
          {
            longitude: -85.594130,
            latitude: 42.937887,
            pinname: 'Corner',
            pintag: 'tag, you\'re it',
            pinnotes: 'Everybody has a water buffalo',
            key: 485,
          },
          {
            longitude: -85.586977,
            latitude: 42.932377,
            pinname: 'Middle',
            pintag: 'Midelife crisis',
            pinnotes: 'Middle Earth, Frodo',
            key: 486,
          },
        ],
      }
    ]);
  }, []);

  const deleteBoard = (board) => {
    setPublicBoards(publicBoards.filter(b => b !== board));
    setPrivateBoards(privateBoards.filter(b => b !== board));
  }

  const clickAddBoard = (title, type) => {
    if (title) {
      setPrivateBoards(privateBoards.concat({ title: title, creator: 'BradenTheDude', map: type, pins: [] }));
    }
    setAddBoardModal(false);
  }

  const handleAddBoard = () => {
    setAddBoardModal(true);
  }

  const addBoardIcon = () => {
    return (
      <TouchableOpacity onPress={handleAddBoard}>
        <View style={styles.addBoard}>
          <Text style={styles.addBoardText}>+</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const showBoard = (board) => {
    if (searchValue !== '') {
      if (searchType === 'board' && !board.title.toLowerCase().includes(searchValue.toLowerCase())) return;
      else if (searchType === 'creator' && !board.creator.toLowerCase().includes(searchValue.toLowerCase())) return;
    }
    console.log('Braden board', board);
    return (
        <Board
          key={String(privateBoards.indexOf(board)).concat(board.title)}
          board={board}
          boardType={publicOrPrivate}
          navigator={props.navigator}
          setBoard={props.setBoard}
          setCreator={props.setCreator}
          deleteBoard={deleteBoard}
        />
    )
  }

  return (
    <View style={{ alignItems: 'center', position: 'relative' }}>
      <View style={styles.boardHeadingContainer}>
        <View style={{flexDirection: 'row'}}>
          {/* Public/Private bar (new design!) */}
          <TouchableOpacity
            style={[styles.boardType, publicOrPrivate === 'Private' ? styles.boardTypeChosen : {}]}
            onPress={() => setPublicOrPrivate('Private')}
          >
            <Text style={styles.boardTypeText}>Private</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.boardType, publicOrPrivate === 'Public' ? styles.boardTypeChosen : {}]}
            onPress={() => {setPublicOrPrivate('Public')}}
          >
            <Text style={styles.boardTypeText}>Public</Text>
          </TouchableOpacity>
        </View>
        {publicOrPrivate === 'Private' && addBoardIcon()}
      </View>
      <SafeAreaView style={{ height: Dimensions.get('window').height - 210 }}>

        {/* Display boards */}
        <ScrollView style={styles.boardScrollContainer}>
          <View style={styles.boardContainer}>
            {publicOrPrivate === 'Private' && privateBoards.map((board) => showBoard(board))}
            {publicOrPrivate === 'Public' && publicBoards.map((board) => showBoard(board))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* UserBar component (search boards, access user information) */}
      <UserBar
        navigator={props.navigator}
        boardScreen={true}
        userPhoto={props.userPhoto}
        setSearchType={setSearchType}
        setSearchValue={setSearchValue}
      />

      {/* Add new board (private boards only) */}
      <AddBoard visibility={addBoardModal} makeBoard={clickAddBoard} exitModal={() => setAddBoardModal(false)} />
    </View>
  )
}

const styles = StyleSheet.create({
  addBoard: {
    marginTop: 3,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 36,
    height: 36,
    borderWidth: 1.5,
    borderRadius: 18,
  },
  addBoardText: {
    fontSize: 20,
  },
  boardContainer: {
    alignItems: 'center',
  },
  boardHeadingContainer: {
    marginTop: 95,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    height: 55,
    justifyContent: 'space-between'
  },
  boardScrollContainer: {
    height: '100%',
  },
  boardType: {
    marginTop: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 90,
    borderRadius: 10,
  },
  boardTypeChosen: {
    backgroundColor: '#F9D01E',
  },
  boardTypeText: {
    fontSize: 20,
  }
});

export default BoardScreen;
