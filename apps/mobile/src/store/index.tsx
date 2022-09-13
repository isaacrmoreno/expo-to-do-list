import create from 'zustand'

const useStore = create((set) => ({
	stylized: false,
	setStylized: (input: boolean) => set((state) => ({ stylized: input })),
	isMuted: false,
	setIsMuted: (input: boolean) => set((state) => ({ isMuted: input })),
}))

export default useStore
