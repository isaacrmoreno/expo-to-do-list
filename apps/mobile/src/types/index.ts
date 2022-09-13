export interface DrawerToggleProps {
	testID: string
}

export interface addTaskButtonProps {
	name: 'plus' | 'check'
	onPress: () => void
	testID: string
}

export interface loginSignUpScreenProps {
	selectLogin: boolean
	toggleLoginSignUp: () => void
}

export interface TaskItemProps {
	taskList: object
	index: number
	confirmDeleteAlert: (index: number) => void
	editTask: (index: number) => void
}

export interface MenuSwitchProps {
	text: string
	onValueChange: (value: boolean) => void | Promise<void>
	value: boolean
	testID: string
}
