import React, { useState } from 'react';
import Board from '../components/board';
import UserBar from '../components/userBar';
import PublicPrivateBar from '../components/publicPrivateBar';
import BoardMenu from '../components/boardMenu';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';

const BoardScreen = (props) => {
  const [publicOrPrivate, setPublicOrPrivate] = useState('Private');
  const [boardsType, setBoardsType] = useState('My');
  const [isModalVisible, setisModalVisible] = useState(false);

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
    setisModalVisible(() => !isModalVisible);
    }

   const handleAddBoard = () => {
    alert('Pressed add board');
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

  return (
    <View style={{ alignItems: 'center', position: 'relative' }}>
      <View style={styles.boardHeadingContainer}>
        {boardsType === 'My' && addBoardIcon()}
      </View>
      <SafeAreaView style={{ height: 536 }}>
        <ScrollView style={styles.boardScrollContainer}>
          <View style={styles.boardContainer}>
            <TouchableOpacity onPress={handleModal}>
              <Board boardType={boardsType} navigator={props.navigator} />
              </TouchableOpacity>
              <BoardMenu state={isModalVisible} boardsType={boardsType}
              onClick={() => setisModalVisible()} />

            <TouchableOpacity onPress={handleModal}>
              <Board boardType={boardsType} navigator={props.navigator} />
              </TouchableOpacity>
              <BoardMenu state={isModalVisible} boardsType={boardsType}
              onClick={() => setisModalVisible()} />

            <TouchableOpacity onPress={handleModal}>
              <Board boardType={boardsType} navigator={props.navigator} />
              </TouchableOpacity>
              <BoardMenu state={isModalVisible} boardsType={boardsType}
              onClick={() => setisModalVisible()} />

            <TouchableOpacity onPress={handleModal}>
              <Board boardType={boardsType} navigator={props.navigator} />
              </TouchableOpacity>
              <BoardMenu state={isModalVisible} boardsType={boardsType}
              onClick={() => setisModalVisible()} />

            <TouchableOpacity onPress={handleModal}>
              <Board boardType={boardsType} navigator={props.navigator} />
              </TouchableOpacity>
              <BoardMenu state={isModalVisible} boardsType={boardsType}
              onClick={() => setisModalVisible()} />

            <TouchableOpacity onPress={handleModal}>
              <Board boardType={boardsType} navigator={props.navigator} />
              </TouchableOpacity>
              <BoardMenu state={isModalVisible} boardsType={boardsType}
              onClick={() => setisModalVisible()} />
          </View>
        </ScrollView>
      </SafeAreaView>
      <UserBar
        navigator={props.navigator}
        setBoardsType={(type) => setBoardsType(type)}
        boardScreen={true}
        userPhoto={props.userPhoto}
      />
      {/* Public/private bar at the top of the screen */}
      <PublicPrivateBar type={publicOrPrivate} onClick={clickPublicOrPrivate} />
    </View>
  )
}

const styles = StyleSheet.create({
  addBoard: {
    marginLeft: 300,
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
  },
  boardScrollContainer: {
    height: '100%',
  },
  boardContainer: {
    alignItems: 'center',
  }
});

export default BoardScreen;