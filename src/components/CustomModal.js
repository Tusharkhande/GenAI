import { View, Text, TextInput, Modal, StyleSheet, BackHandler } from 'react-native'
import Button from './Button';
import React from 'react'

export default function CustomModal(setModalVisible, modalVisible) {
    
    return (
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter Password :</Text>
              <TextInput
                style={styles.input}
                editable={true}
                onChangeText={(text) => setPassword(text)}
              />
              <View style={styles.buttonContainer1}>

              <View style={styles.buttonContainer}>
                <Button title="   No" onPress={() => setModalVisible(false)} />
              </View>
              <View style={styles.buttonContainer}>
                <Button title="   Yes" onPress={() => BackHandler.exitApp()} />
              </View>
              </View>
            </View>
          </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
},
modalContent: {
    backgroundColor: '#007EA7',
    width: '60%',
    padding: 16,
    borderRadius: 8,
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
},
modalTitle: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#003249',
    width: 100,
    borderRadius: 8,
    marginLeft: 20,
    marginRight: 20,
},
buttonContainer1: {
  flexDirection: 'row',
  justifyContent: 'center',
},
buttonContainer2: {
  flexDirection: 'row',
  justifyContent: 'center',
  backgroundColor: '#003249',
  width: 200,
  borderRadius: 20,
  paddingTop: 11,
  marginLeft: 20,
  marginRight: 20,
},
input: {
  textAlign: 'center',
  justifyContent: 'center',
  marginLeft: 40,
  width: 150,
  height: 50,
  borderColor: '#000',
  borderWidth: 1,
  marginBottom: 16,
  paddingHorizontal: 8,
  color: '#000',
},

});