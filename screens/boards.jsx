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
    getBoards();
  }, []);

  async function getBoards() {
    const response = await fetch('https://still-retreat-52810.herokuapp.com/Boards');
    const responseJson = await response.json();
    setPrivateBoards(responseJson.filter((board) => board.boardtype === 'PRI'));
    setPublicBoards(responseJson.filter((board) => board.boardtype === 'PUB'));
  }

  const deleteBoard = async (board) => {
    setPublicBoards(publicBoards.filter(b => b !== board));
    setPrivateBoards(privateBoards.filter(b => b !== board));
    const response = await fetch('https://still-retreat-52810.herokuapp.com/Pins');
    const responseJson = await response.json();
    const pinsOnThisBoard = responseJson.filter((pin) => pin.boardid === board.boardid);
    await deletePins(pinsOnThisBoard);
    const response2 = await fetch(`https://still-retreat-52810.herokuapp.com/Board/${board.boardid}`, {method: 'DELETE'});
    if (response2.status !== 200) alert('Delete board failed with status ' + response2.status);
  }

  const deletePins = async (pinList) => {
    if (pinList.length === 0) return;
    const response = await fetch(`https://still-retreat-52810.herokuapp.com/Pin/${pinList[pinList.length - 1].pinid}`, {method: 'DELETE'});
    if (response.status !== 200) alert('Delete pin failed with status ' + response.status);
    pinList.pop();
    await deletePins(pinList);
  }

  const clickMakePublic = async (board) => {
    console.log('clicked make public');
    const response = await fetch(`https://still-retreat-52810.herokuapp.com/Board/${board.boardid}`, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        boardType: 'PUB'
      })
    })
    if (response.status !== 200) alert('Make public failed with status ' + response.status);
    await getBoards();
  }

  const clickMakePrivate = async (board) => {
    const response = await fetch(`https://still-retreat-52810.herokuapp.com/Board/${board.boardid}`, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        boardType: 'PRI'
      })
    })
    if (response.status !== 200) alert('Make private failed with status ' + response.status);
    await getBoards();
  }

  const clickAddBoard = async (title, map) => {
    if (title) {
      const response = await fetch(`https://still-retreat-52810.herokuapp.com/Boards`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          boardType: 'PRI',
          boardName: title,
          boardMap: map,
          userID: 4,
        })
      });
      if (response.status !== 200) alert('Add board failed with status ' + response.status);
    }
    setAddBoardModal(false);
    getBoards();
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
          key={String(board.boardid)}
          board={board}
          boardType={publicOrPrivate}
          navigator={props.navigator}
          setBoard={props.setBoard}
          deleteBoard={deleteBoard}
          makePublic={clickMakePublic}
          makePrivate={clickMakePrivate}
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
