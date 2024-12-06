import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiManager from '../../apiManager';
import { LoginDTO, RegisterDTO } from '../../Data/DTOs/Auth.dto';

const baseUrl = import.meta.env.VITE_AUTH_API_URL

export const LoginUser = createAsyncThunk(
    'auth/login',
    async (LoginDTO: LoginDTO, { rejectWithValue }) => {
        try {
            const response = await ApiManager.apiRequest({
                Url: `${baseUrl}/api/Auth/sign-in`,
                Method: 'POST',
                Headers: {
                    'Content-Type': 'application/json',
                },
                Data: LoginDTO,
            });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const RegisterUser = createAsyncThunk(
    'auth/register',
    async (RegisterDTO: RegisterDTO, { rejectWithValue }) => {
        try {
            const response = await ApiManager.apiRequest({
                Url: `${baseUrl}/api/Auth/sign-up`,
                Method: 'POST',
                Headers: {
                    'Content-Type': 'application/json',
                },
                Data: RegisterDTO,
            });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const GetUserAccountInfo = createAsyncThunk(
    'auth/getaccountinfo',
    async (_, { rejectWithValue }) => {
        try {
            const response = await ApiManager.apiRequest({
                Url: `${baseUrl}/api/Account`,
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