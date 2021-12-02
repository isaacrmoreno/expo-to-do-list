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


import Task from './components/task';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [updateIcon, setUpdateIcon] = useState(false);

// this function will be called when the user presses the plus icon - works!
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  }

  // this function is called when the user presses the edit icon - works!
  const EditTask = (index) => {
    setUpdateIcon(true)
    const newTask = taskItems[index];
    setTask(newTask);
  }

  // this function will be called when the user pressed the check mark icon
  const handleUpdateTask = (index) => {
    setUpdateIcon(false);
    Keyboard.dismiss();

    let taskItemsCopy = [...taskItems];

    const taskToUpdate = taskItemsCopy[index];
    setTaskItems([taskToUpdate, task]); 
    
    setTask(null);
  } //gets rid of first value, makes second blank, and then updates the task. 

  // this function is called when the user presses the trash icon - works!
  const confirmDeleteAlert = (index) =>
  Alert.alert('Delete Task?', 'Are you sure you want to delete this task?', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    { text: 'Delete', onPress: () => completeTask(index), 
      style: 'destructive' 
    },
  ]);

  // this function is called when the user presses delete on the alert pop up - works!
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Task List</Text>
        <View style={styles.items}>
          {taskItems.map((item, index) => {
            return (
              <View>
                <Task text={item} key={index} confirmDeleteAlert={confirmDeleteAlert} EditTask={EditTask} index={index}/> 
              </View>
              )
            })
          }
        </View>
      </View>
        
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />

        {updateIcon === true ? 
          <TouchableOpacity onPress={() => handleUpdateTask()}>
            <View style={styles.addWrapper}>              
              <AntDesign name="check" size={24} color="black" />
            </View>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>              
              <AntDesign name="plus" size={24} color="black" />
            </View>
          </TouchableOpacity>
        } 
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
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  }
});