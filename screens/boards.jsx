import React from 'react';
import Board from '../components/board';
import UserBar from '../components/userBar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';

const BoardScreen = (props) => {

  const handleAddBoard = () => {
    alert('Pressed add board');
  }

  const handleDeleteBoard = () => {
    alert('Pressed delete board');
  }

  const handleCopyBoard = () => {
    alert('Pressed copy board');
  }

  const handleUpvoteBoard = () => {
    alert('Pressed upvote board');
  }

  const handleReportBoard = () => {
    alert('Pressed report board');
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

  const deleteBoardIcon = () => {
    return (
      <TouchableOpacity onPress={handleDeleteBoard}>
        <Image source={require('../assets/trash.bmp')} style={styles.imageIcon}></Image>
      </TouchableOpacity>
    )
  }

  const copyBoardIcon = () => {
    return (
      <TouchableOpacity onPress={handleCopyBoard}>
        <Image source={require('../assets/copy.bmp')} style={styles.copyIcon}></Image>
      </TouchableOpacity>
    )
  }

  const upvoteIcon = () => {
    return (
      <TouchableOpacity onPress={handleUpvoteBoard}>
        <Image source={require('../assets/upvote.bmp')} style={styles.imageIcon}></Image>
      </TouchableOpacity>
    )
  }

  const reportIcon = () => {
    return (
      <TouchableOpacity onPress={handleReportBoard}>
        <Image source={require('../assets/report.bmp')} style={styles.reportIcon}></Image>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ alignItems: 'center', position: 'relative' }}>
      <View style={styles.boardHeadingContainer}>
        <View style={styles.screenTitleView}>
          <Text style={styles.screenTitleText}>{props.boardsType} boards</Text>
        </View>
        {props.boardsType === 'My' && addBoardIcon()}
        {props.boardsType === 'My' && deleteBoardIcon()}
        {copyBoardIcon()}
        {props.boardsType === 'Public' && upvoteIcon()}
        {props.boardsType === 'Public' && reportIcon()}
      </View>
      <SafeAreaView style={{ height: 536 }}>
        <ScrollView style={styles.boardScrollContainer}>
          <View style={styles.boardContainer}>
            <Board boardType={props.boardsType} navigator={props.navigator} />
            <Board boardType={props.boardsType} navigator={props.navigator} />
            <Board boardType={props.boardsType} navigator={props.navigator} />
            <Board boardType={props.boardsType} navigator={props.navigator} />
            <Board boardType={props.boardsType} navigator={props.navigator} />
            <Board boardType={props.boardsType} navigator={props.navigator} />
          </View>
        </ScrollView>
      </SafeAreaView>
      <UserBar
        navigator={props.navigator}
        setBoardsType={(type) => props.setBoardsType(type)}
        boardScreen={true}
        userPhoto={props.userPhoto}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screenTitleView: {
    marginBottom: 10,
    marginRight: 5,
  },
  screenTitleText: {
    fontSize: 25,
    marginBottom: 5,
  },
  boardHeadingContainer: {
    marginTop: 95,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  addBoard: {
    marginLeft: 20,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderWidth: 1.5,
    borderRadius: 15,
  },
  addBoardText: {
    fontSize: 20,
  },
  imageIcon: {
    height: 40,
    width: 40,
    bottom: 3,
    marginLeft: 12,
  },
  reportIcon: {
    height: 36,
    width: 36,
    bottom: 1,
    marginLeft: 12,
  },
  copyIcon: {
    height: 35,
    width: 35,
    bottom: 1,
    marginLeft: 12,
  },
  boardScrollContainer: {
    height: '100%',
  },
  boardContainer: {
    alignItems: 'center'
  }
});

export default BoardScreen;