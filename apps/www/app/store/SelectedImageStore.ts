import { create } from 'zustand'

// Define the state type
type FileStoreState = {
  selectedFile: File | null
}

// Define the actions type
type FileStoreActions = {
  setSelectedFile: (file: File | null) => void
}

const useFileStore = create<FileStoreState & FileStoreActions>((set) => ({
  selectedFile: null,
  setSelectedFile: (file) => set({ selectedFile: file }),
}))

export default useFileStore
