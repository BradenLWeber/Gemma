import React, { useState, useEffect } from 'react';
import Board from '../components/board';
import UserBar from '../components/userBar';
import AddBoard from '../components/addBoard';
import PublicPrivateBar from '../components/publicPrivateBar';

import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView, Dimensions } from 'react-native';

const BoardScreen = (props) => {

  const [publicOrPrivate, setPublicOrPrivate] = useState('Private');
  const [isModalVisible, setIsModalVisible] = useState(false);
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
          x: 970,
          y: 750,
          title: 'The middle of the map',
          tags: 'middle, map, the',
          notes: 'This is exactly in the middle of the map! Imagine that.',
          key: 983,
        },
        {
          x: 460,
          y: 636,
          title: 'Frog pond',
          tags: 'Frog',
          notes: 'This pond has tadpoles and frogs consistently every year',
          key: 984,
        },
        {
          x: 480,
          y: 904,
          title: 'Good spot to pray',
          tags: 'Bridge, pray',
          notes: 'I like to stand on this bridge and hear the water while I pray',
          key: 985,
        },
        {
          x: 701,
          y: 760,
          title: 'Bird\'s nest!!!!',
          tags: 'Bird, nest, !!!',
          notes: 'I found a bird nest here the other day!!! The eggs had afros and I think one was doing the worm.',
          key: 986,
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
            x: 900,
            y: 650,
            title: 'A spot on the map',
            tags: 'map, the',
            notes: 'This is a public spot!',
            key: 483,
          },
          {
            x: 100,
            y: 636,
            title: 'Near the edge',
            tags: 'Edge',
            notes: 'This is near the edge',
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
            x: 260,
            y: 520,
            title: 'Baseball field',
            tags: 'Baseball, base, ball, field, fun, woo hoo',
            notes: 'Take me out to the ball game',
            key: 485,
          },
          {
            x: 910,
            y: 1210,
            title: 'The best dining hall',
            tags: 'In your face, commons is best',
            notes: 'It has been long debated which dining hall is best. Put your questions to rest, it has finally been answered.',
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
        <ScrollView style={styles.boardScrollContainer}>
          <View style={styles.boardContainer}>
            {publicOrPrivate === 'Private' && privateBoards.map((board) => showBoard(board))}
            {publicOrPrivate === 'Public' && publicBoards.map((board) => showBoard(board))}
          </View>
        </ScrollView>
      </SafeAreaView>
      <UserBar
        navigator={props.navigator}
        boardScreen={true}
        userPhoto={props.userPhoto}
        setSearchType={setSearchType}
        setSearchValue={setSearchValue}
      />
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
  boardContainer: {
    alignItems: 'center',
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
