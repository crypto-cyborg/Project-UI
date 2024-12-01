import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiManager from '../../apiManager';

const baseUrl = import.meta.env.VITE_SANDBOX_API_URL

export const InitializeAction = createAsyncThunk(
    'Sandbox/Initialize',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await ApiManager.apiRequest({
                Url: `${baseUrl}/Sandbox/initialize`,
                Method: 'POST',
                Headers: {
                    'Content-Type': 'application/json',
                },
                Data: {userId},
            });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const GetUserPositionsAction = createAsyncThunk(
    'margin/positions',
    async (userId: string, { rejectWithValue }) => {
        try {
            const response = await ApiManager.apiRequest({
                Url: `${baseUrl}/api/Margin/positions/${userId}`,
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