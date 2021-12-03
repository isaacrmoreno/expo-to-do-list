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
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import 'react-native-get-random-values';

import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [taskItems, setTaskItems] = useState([]);
  const [updateIcon, setUpdateIcon] = useState(false);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  const editTask = (index) => {
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

  const confirmDeleteAlert = (index) =>
    Alert.alert('Delete Task?', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Delete', onPress: () => completeTask(index), style: 'destructive' },
    ]);

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Task List</Text>
        <View style={styles.items}>
          {taskItems.map((item, index) => {
            return (
              <View>
                <Task
                  text={item}
                  key={index}
                  confirmDeleteAlert={confirmDeleteAlert}
                  editTask={editTask}
                  index={index}
                />
              </View>
            );
          })}
        </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
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
});
