import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { Feather } from '@expo/vector-icons'; 

const Task = ({text, confirmDeleteAlert, handleEditTask}) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Feather 
          style={styles.editButton} 
          name="edit" 
          size={24} 
          color="black"
          onPress={() => handleEditTask()} />
        <Text style={styles.itemText}>{text}</Text>
      </View>
      <Feather 
        name="trash-2" 
        size={24} 
        color="black"
        onPress={() => confirmDeleteAlert()} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemText: {
    maxWidth: '80%',
  },
  editButton: {
    marginRight: 15,
  }
});

export default Task;