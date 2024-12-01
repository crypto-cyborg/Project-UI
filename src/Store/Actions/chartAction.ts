import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiManager from '../../apiManager';
import { Spot, Margin } from '../../Data/DTOs/Trading.dto';

const baseUrl = import.meta.env.VITE_SANDBOX_API_URL

export const SpotBuyAction = createAsyncThunk(
    'spot/buy',
    async (Spot: Spot, { rejectWithValue }) => {
        try {
            const response = await ApiManager.apiRequest({
                Url: `${baseUrl}/Spot/buy`,
                Method: 'POST',
                Headers: {
                    'Content-Type': 'application/json',
                },
                Data: Spot,
            });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const SpotSellAction = createAsyncThunk(
    'spot/sell',
    async (Spot: Spot, { rejectWithValue }) => {
        try {
            const response = await ApiManager.apiRequest({
                Url: `${baseUrl}/Spot/sell`,
                Method: 'POST',
                Headers: {
                    'Content-Type': 'application/json',
                },
                Data: Spot,
            });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const OpenPositionAction = createAsyncThunk(
    'margin/open',
    async (Margin: Margin, { rejectWithValue }) => {
        try {
            const response = await ApiManager.apiRequest({
                Url: `${baseUrl}/api/Margin/positions/open`,
                Method: 'POST',
                Headers: {
                    'Content-Type': 'application/json',
                },
                Data: Margin,
            });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const ClosePositionAction = createAsyncThunk(
    'margin/open',
    async (Margin: Margin, { rejectWithValue }) => {
        try {
            const response = await ApiManager.apiRequest({
                Url: `${baseUrl}/api/Margin/positions/open`,
                Method: 'POST',
                Headers: {
                    'Content-Type': 'application/json',
                },
                Data: Margin,
            });
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);