import {createSlice} from '@reduxjs/toolkit';
import {Tasks} from "../../services/Api";
import {helperCreateAsyncThunk} from "../../helpers/utils";

const initialState = {
    tasksList: [],
    tasksPageCount:false,
    tasksId: false,
    tasksIdLoad: false,
    tasksIdError: false,
    taskLoad: false,
    taskError: false,
    isCreate: false,
    addTasksLoad: false,
    addTasksError: false,
    isDeleteTask: false,
    deleteTasksLoad: false,
    deleteTasksId: null,
    deleteTasksLoadError: false,
    isUpdateTask: false,
    updateTasksLoad: false,
    updateTasksId: null,
    updateTasksError: false,
};

const getTasks = helperCreateAsyncThunk('getTasks', Tasks.getTasks);
const createTasks = helperCreateAsyncThunk('createTasks', Tasks.createTasks);
const deleteTasks = helperCreateAsyncThunk('deleteTasks', Tasks.deleteTasks);
const updateTasks = helperCreateAsyncThunk('updateTasks', Tasks.updateTasks);
const getTasksFromId = helperCreateAsyncThunk('getTasksFromId', Tasks.getTasksId);


const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        createTasksDefault: (state) => {
            state.addTasksLoad = false;
            state.addTasksError = false;
            state.isCreate = false;
        },
        updateTasksDefault: (state) => {
            state.isUpdateTask = false;
            state.updateTasksLoad = false;
            state.updateTasksId = false;
            state.updateTasksError = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTasks.pending, (state) => {
                state.addTasksLoad = true;
                state.addTasksError = false;
            })
            .addCase(createTasks.fulfilled, (state) => {
                state.addTasksLoad = false;
                state.addTasksError = false;
                state.isCreate = true;
            })
            .addCase(createTasks.rejected, (state, action) => {
                state.taskLoad = false;
                state.taskError = action.error.code;
            })
            .addCase(getTasks.pending, (state) => {
                state.taskLoad = true;
                state.taskError = false;
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.tasksList = action.payload.data;
                state.taskLoad = false;
                state.tasksPageCount=action.payload._meta?Math.ceil(action.payload._meta.total/12):0;
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.tasksList = false;
                state.taskLoad = false;
                state.taskError = action.error.code;
            })
            .addCase(deleteTasks.pending, (state,) => {
                state.deleteTasksId = null
                state.isDeleteTask = false;
                state.deleteTasksLoad = true;
                state.deleteTasksLoadError = false;
            })
            .addCase(deleteTasks.fulfilled, (state, action) => {
                state.deleteTasksId = action.meta.arg;
                state.tasksList = state.tasksList.filter((item) => item.id !== action.meta.arg)
                state.isDeleteTask = true;
                state.deleteTasksLoad = false;
            })
            .addCase(deleteTasks.rejected, (state, action) => {
                state.deleteTasksId = null;
                state.isDeleteTask = false;
                state.deleteTasksLoad = false;
                state.deleteTasksLoadError = action.error.code;
            })
            .addCase(updateTasks.pending, (state) => {
                state.updateTasksId = null
                state.isUpdateTask = false;
                state.updateTasksLoad = true;
                state.updateTasksError = false;
            })
            .addCase(updateTasks.fulfilled, (state, action) => {
                state.updateTasksId = action.meta.arg.id;
                state.isUpdateTask = true;
                state.updateTasksLoad = false;
            })
            .addCase(updateTasks.rejected, (state, action) => {
                state.updateTasksId = null;
                state.isUpdateTask = false;
                state.updateTasksLoad = false;
                state.updateTasksError = action.error.code;
            })
            .addCase(getTasksFromId.pending, (state) => {
                state.tasksId=false;
                state.tasksIdLoad=true;
                state.tasksIdError=false;
            })
            .addCase(getTasksFromId.fulfilled, (state, action) => {
                state.tasksId=action.payload.data;
                state.tasksIdLoad=false;
                state.tasksIdError=false;
            })
            .addCase(getTasksFromId.rejected, (state, action) => {
                state.tasksId=false;
                state.tasksIdLoad=false;
                state.tasksIdError=action.error.code;
            });
    },
});
const {
    createTasksDefault,
    updateTasksDefault
} = tasksSlice.actions;

export {
    getTasks,
    createTasks,
    createTasksDefault,
    deleteTasks,
    updateTasks,
    getTasksFromId,
    updateTasksDefault
};

export default tasksSlice.reducer;
