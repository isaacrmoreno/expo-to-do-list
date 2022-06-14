export interface addTaskButtonProps {
  name: 'plus' | 'check'
  size: number
<<<<<<< HEAD
  isDisabled: boolean
=======
>>>>>>> development
  onPress: () => void
}

export interface ScreenTitleProps {
  title: string
}

export interface LoginSignUpButtonProps {
  onPress: () => void
  text: string
}

export interface loginSignUpScreenProps {
  selectLogin: boolean
  toggleLoginSignUp: () => void
}

export interface ContinueWithButtonProps {
  name: 'google' | 'apple1' | 'mail'
  authType: string
  size: number
  onPress: () => void
}

export interface TaskItemProps {
  taskList: object
  index: number
  confirmDeleteAlert: (index: number) => void
  editTask: (index: number) => void
}
