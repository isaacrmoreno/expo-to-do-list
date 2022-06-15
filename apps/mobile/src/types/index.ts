export interface addTaskButtonProps {
  name: 'plus' | 'check'
  size: number
  onPress: () => void
}

export interface ScreenTitleProps {
  title: string
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
