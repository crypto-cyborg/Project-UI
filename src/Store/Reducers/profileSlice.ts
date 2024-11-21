import { createSlice } from '@reduxjs/toolkit';

interface ProfileData {
    transactionPopUp: boolean;
}

const initialState: ProfileData = {
    transactionPopUp: false,
};

const profileSlice = createSlice({
    name: `profile`,
    initialState,
    reducers: {
        setTransactionPopUp : (state, action) => {
            state.transactionPopUp = action.payload;
        },
    },
});

export const { } = profileSlice.actions;
export default profileSlice.reducer;