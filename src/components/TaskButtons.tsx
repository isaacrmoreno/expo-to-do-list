import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';

import Task from './Task';

export default function TaskButtons() {
  const [task, setTask] = useState<string | null>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [taskItems, setTaskItems] = useState<Array<string | null>>([]);
  const [updateIcon, setUpdateIcon] = useState<Boolean>(false);

  const navigation = useNavigation();

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const editTask = (index: number) => {
    setUpdateIcon(true);
    const newTask = taskItems[index];
    setTask(newTask);
    setCurrentIndex(index);
  };

  const handleUpdateTask = () => {
    setUpdateIcon(false);
    Keyboard.dismiss();
    let taskItemsCopy = [...taskItems];
    taskItemsCopy.splice(currentIndex, 1, task);
    setTaskItems(taskItemsCopy);
    setTask(null);
  };

  const confirmDeleteAlert = (index: number) =>
    Alert.alert('Delete Task?', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Delete', onPress: () => completeTask(index), style: 'destructive' },
    ]);

  const completeTask = (index: number) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error: { message: string }) => alert(error.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.taskWrapper}>
        <View style={styles.headerWrapper}>
          <Text style={styles.sectionTitle}>Task List</Text>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          {taskItems.map((item, index) => {
            return (
              <View key={index}>
                <Task
                  text={item}
                  index={index}
                  confirmDeleteAlert={confirmDeleteAlert}
                  editTask={editTask}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={(text) => setTask(text)}
        />

        {updateIcon === true ? (
          <TouchableOpacity onPress={handleUpdateTask}>
            <View style={styles.addWrapper}>
              <AntDesign name='check' size={24} color='black' />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleAddTask}>
            <View style={styles.addWrapper}>
              <AntDesign name='plus' size={24} color='black' />
            </View>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    paddingTop: StatusBar.currentHeight,
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  scrollView: {
    marginTop: 30,
    marginBottom: 115,
  },
  signOutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 100,
    height: 30,
  },
});
