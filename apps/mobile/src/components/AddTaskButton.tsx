import React from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { addTaskButtonProps } from '../types/index'

const AddTaskButton: React.FC <addTaskButtonProps> = ({name, size, color, onPress}) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.addTaskWrapper}>
				<AntDesign name={name} size={size} color={color} /> 
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	addTaskWrapper: {
		width: 50,
		height: 50,
		backgroundColor: '#fff',
		borderRadius: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#C0C0C0',
		borderWidth: 1,
	},
})


export default AddTaskButton
