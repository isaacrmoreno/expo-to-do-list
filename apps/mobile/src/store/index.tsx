import create from 'zustand'

const useStore = create((set) => ({
  stylized: false,
  setStylized: (input: boolean) => set((state) => ({ stylized: input })),
  isMuted: false,
  setIsMuted: (input: boolean) => set((state) => ({ isMuted: input })),
  dialog: false,
  setDialog: (input: boolean) => set((state) => ({ dialog: input })),
  allList: [],
  addListName: (listName: string) => {
    set((state) => ({
      allList: [...state.allList, listName],
    }))
  },
  setListName: (allList: []) => set((state) => ({ allList: allList })),
}))

export default useStore
