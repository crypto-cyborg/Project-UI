import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiManager from '../../apiManager';

const baseUrl = import.meta.env.VITE_USER_SERVICE_API_URL

export const GetAllUsersAction = createAsyncThunk(
    'admin/getAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await ApiManager.apiRequest({
                Url: `${baseUrl}/users`,
                Method: 'GET',
                Headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const DeleteUserAction = createAsyncThunk(
    'admin/deleteUser',
    async (userId: string, { rejectWithValue }) => { 
        try {
            const response = await ApiManager.apiRequest({
                Url: `${baseUrl}/users/${userId}`, 
                Method: 'DELETE',
                Headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message); 
        }
    }
);