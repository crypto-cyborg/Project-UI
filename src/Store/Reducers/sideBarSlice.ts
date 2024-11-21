import { createSlice } from "@reduxjs/toolkit";
import { RootState } from './store';

interface SideBarState {
    isActive: boolean;
}

const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState: {
        isActive: false,
    } as SideBarState,
    reducers: {
        setIsActive: (state) => {
            state.isActive = !state.isActive
        },
    }
});

export const { setIsActive } = sideBarSlice.actions;

export const selectSideBar = (state: RootState) => state.sideBar;

export default sideBarSlice.reducer;