import React, { useState, useEffect } from 'react';
import Board from '../components/board';
import UserBar from '../components/userBar';
import AddBoard from '../components/addBoard';
import PublicPrivateBar from '../components/publicPrivateBar';
import BoardMenu from '../components/boardMenu';

import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView, Dimensions } from 'react-native';

const BoardScreen = (props) => {

  const [publicOrPrivate, setPublicOrPrivate] = useState('Private');
  const [boardsType, setBoardsType] = useState('My');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchType, setSearchType] = useState('board');
  const [searchValue, setSearchValue] = useState('');
  const [boardPressed, setBoardPressed] = useState(null);
  const [addBoardModal, setAddBoardModal] = useState(false);
  const [publicBoards, setPublicBoards] = useState([]);
  const [privateBoards, setPrivateBoards] = useState([]);

  useEffect(() => {
    setPrivateBoards([
      {
        upvotes: 0,
        creator: 'Me',
        title: 'Default ecosystem board',
        map: 'ECO',
        pins: []
      },
      {
        upvotes: 0,
        creator: 'Me',
        title: 'Default campus board',
        map: 'CAM',
        pins: []
      },
      {
      upvotes: 20,
      creator: 'VanderGoosen',
      title: 'Private board',
      map: 'ECO',
      pins: [
        {
          x: -85.581658,
          y: 42.935014,
          title: 'Frog pond',
          tags: 'Frog',
          notes: 'This pond has tadpoles and frogs consistently every year',
          pinid: 984,
        },
        {
          x: -85.580725,
          y: 42.934221,
          title: 'Bird\'s nest!!!!',
          tags: 'Bird, nest, !!!',
          notes: 'I found a bird nest here the other day!!! The eggs had afros and I think one was doing the worm.',
          pinid: 986,
        },
      ]
    }
    ]);
    setPublicBoards([
      {
        upvotes: 20,
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
        upvotes: 1,
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

  // Function handles a click on the public/private bar
  const clickPublicOrPrivate = () => {
    if (publicOrPrivate === 'Public') {
      setPublicOrPrivate('Private');
      setBoardsType('My');
    } else {
      setPublicOrPrivate('Public');
      setBoardsType('Public');
    }
  }

  // Function handles displaying, hiding a menu of board options
  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  }

  const clickAddBoard = (title, type) => {
    if (title) {
      setPrivateBoards(privateBoards.concat({ title: title, upvotes: 0, creator: 'BradenTheDude', map: type, pins: [] }));
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
      <TouchableOpacity onLongPress={() => {handleModal(); setBoardPressed(board)}} key={String(privateBoards.indexOf(board)).concat(board.title)}>
        <Board boardType={boardsType} navigator={props.navigator} setBoard={props.setBoard} board={board} setCreator={props.setCreator}/>

      </TouchableOpacity>
    )
  }

  return (
    <View style={{ alignItems: 'center', position: 'relative' }}>
      <View style={styles.boardHeadingContainer}>
        <PublicPrivateBar type={publicOrPrivate} onClick={clickPublicOrPrivate} />
        {boardsType === 'My' && addBoardIcon()}
      </View>
      <SafeAreaView style={{ height: Dimensions.get('window').height - 210 }}>
        <ScrollView style={styles.boardScrollContainer}>
          <View style={styles.boardContainer}>
            {publicOrPrivate === 'Private' && privateBoards.map((board) => showBoard(board))}
            {publicOrPrivate === 'Public' && publicBoards.map((board) => showBoard(board))}
            <BoardMenu state={isModalVisible} boardsType={boardsType} onClick={() => setIsModalVisible()} boardPressed={boardPressed} />
          </View>
        </ScrollView>
      </SafeAreaView>
      <UserBar
        navigator={props.navigator}
        setBoardsType={(type) => setBoardsType(type)}
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
  }
});

export default BoardScreen;
