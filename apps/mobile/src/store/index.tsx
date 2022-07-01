import create from 'zustand'

const useStore = create((set) => ({
  stylized: false,
  setStylized: (input: boolean) => set((state) => ({ stylized: input })),
}))

export default useStore
