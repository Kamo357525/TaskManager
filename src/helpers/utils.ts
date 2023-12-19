import {createAsyncThunk} from '@reduxjs/toolkit';

export function helperCreateAsyncThunk(action, path){
    return  createAsyncThunk(action, async (requestData) => {
        try {
            const {data}=await path(requestData);
            return data
        } catch (error) {
            throw error;
        }
    });
}

export function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}
