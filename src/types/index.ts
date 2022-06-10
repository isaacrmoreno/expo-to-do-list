export interface addTaskButtonProps {
	name: 'plus' | 'check'
	size: number
	color: string
	onPress: () => void
}

export interface HeaderProps {
  ScreenTitle: string;
}

export interface SignUpButtonProps {
  name: 'google' | 'apple1' | 'mail'
	authType: string
	size: number
	color: string
	onPress: () => void
}

export interface TaskItemProps {
  text: string | null;
  index: number;
  confirmDeleteAlert: (index: number) => void;
  editTask: (index: number) => void;
}
