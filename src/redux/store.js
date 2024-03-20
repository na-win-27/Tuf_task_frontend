import { configureStore } from '@reduxjs/toolkit'
import editorReducer from './slices/editor.js'
import tableReducer from './slices/table.js'

export const store = configureStore({
  reducer: {
      editor:editorReducer,
      table:tableReducer
  },
})