import React from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
//import PublicPrivateBar from './publicPrivateBar';

{/* Here's the tutorial I'm using to learn about Modals: 
https://blog.logrocket.com/creating-a-pop-up-modal-in-react-native/ 

Also using library 'react-native-modal'... y'all might need to run 'npm i react-native-modal'*/}

const BoardMenu = (props) => {

       // Function handles displaying, hiding a menu of board options
       const handleModal = () => {
        setisModalVisible(() => !isModalVisible);
        }
    
      const handleDeleteBoard = () => {
        alert('Pressed delete on ' + props.boardPressed.title);
      }
    
      const handleCopyBoard = () => {
        alert('Pressed copy on ' + props.boardPressed.title);
      }
    
      const handleUpvoteBoard = () => {
        alert('Pressed upvote on ' + props.boardPressed.title);
      }
    
      const handleReportBoard = () => {
        alert('Pressed report on ' + props.boardPressed.title);
      }
    
      const deleteBoardIcon = () => {
        return (
          <TouchableOpacity onPress={handleDeleteBoard}>
            <Image source={require('../assets/trash.png')} style={styles.imageIcon}></Image>
          </TouchableOpacity>
        )
      }
    
      const copyBoardIcon = () => {
        return (
          <TouchableOpacity onPress={handleCopyBoard}>
            <Image source={require('../assets/copy.png')} style={styles.copyIcon}></Image>
          </TouchableOpacity>
        )
      }
    
      const upvoteIcon = () => {
        return (
          <TouchableOpacity onPress={handleUpvoteBoard}>
            <Image source={require('../assets/upvote.png')} style={styles.imageIcon}></Image>
          </TouchableOpacity>
        )
      }
    
      const reportIcon = () => {
        return (
          <TouchableOpacity onPress={handleReportBoard}>
            <Image source={require('../assets/report.png')} style={styles.reportIcon}></Image>
          </TouchableOpacity>
        )
      }
        return(
            <Modal isVisible={props.state}>
                <View style={styles.Modal}>
                    <Text style={styles.Header}>Board Options</Text>
                    <View style={styles.InputView}>
                    {props.boardsType === 'My' && deleteBoardIcon()}
                    {copyBoardIcon()}
                    {props.boardsType === 'Public' && upvoteIcon()}
                    {props.boardsType === 'Public' && reportIcon()}                  
                         </View>
                    <Button title="Hide modal" onPress={props.onClick}/>
                </View>
            </Modal>
        )

};

const styles = StyleSheet.create({
      imageIcon: {
        height: 80,
        width: 80,
        bottom: 3,
        marginLeft: 12,
      },
      reportIcon: {
        height: 72,
        width: 72,
        bottom: 1,
        marginLeft: 12,
      },
      copyIcon: {
        height: 70,
        width: 70,
        bottom: 1,
        marginLeft: 12,
      },
    Header: {
        fontSize: 20,
        paddingTop: 4,
        paddingLeft: 5,
       // style: 'bold',
        backgroundColor: '#6CC071'
    },
    InputView: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        height: 90,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    },
    Modal: {
        backgroundColor: '#E5E5E5',
        justifyContent: 'space-around',
        flexDirection: 'column'
    }
});

export default BoardMenu;