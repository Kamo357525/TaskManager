import { configureStore } from '@reduxjs/toolkit';
import user from './slices/userSlice'
import tasks from './slices/tasksSlices'

const store = configureStore({
    reducer: {
        user,
        tasks,
    },
})


export type RootState = ReturnType<typeof store.getState>
export {store};
