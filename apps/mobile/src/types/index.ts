export interface addTaskButtonProps {
  name: 'plus' | 'check'
  size: number
  isDisabled: boolean
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
  text: string | null
  index: number
  confirmDeleteAlert: (index: number) => void
  editTask: (index: number) => void
}
