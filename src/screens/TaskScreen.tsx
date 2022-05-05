import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

import TaskItem from '../components/TaskItem';
import AddTaskButton from '../components/AddTaskButton';

export default function TaskButtons() {
const [task, setTask] = useState<string | null>('');
const [currentIndex, setCurrentIndex] = useState<number>(0);
const [taskItems, setTaskItems] = useState<Array<string | null>>([]);
const [updateIcon, setUpdateIcon] = useState<Boolean>(false);

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

const completeTask = (index: number) => {
	let itemsCopy = [...taskItems];
	itemsCopy.splice(index, 1);
	setTaskItems(itemsCopy);
};
		
  const confirmDeleteAlert = (index: number) =>
    Alert.alert('Delete Task?', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Delete', onPress: () => completeTask(index), style: 'destructive' },
    ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.taskWrapper}>
        <ScrollView style={styles.scrollView}>
          {taskItems.map((item, index) => {
            return (
              <View key={index}>
                <TaskItem
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
        {(updateIcon) 
					? (<AddTaskButton name='check' size={24} color='black' onPress={handleUpdateTask}/>) 
					: (<AddTaskButton name='plus' size={24} color='black' onPress={handleAddTask}/>)}
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
    paddingHorizontal: 20,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 300,
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
