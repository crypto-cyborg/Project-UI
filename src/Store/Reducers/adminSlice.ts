import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../Data/Models/Auth.model';
import { GetAllUsersAction, DeleteUserAction } from '../Actions/adminActions';
import { toast } from 'react-toastify';

interface AdminData {
    userPopUp: boolean;
    Users: User[] | null;
    isLoading: boolean;
    currentPage: number;
    usersPerPage: number;
    showDeletePopOp: boolean;
    userId: string,
}

const initialState: AdminData = {
    userPopUp: false,
    Users: null,
    isLoading: false,
    currentPage: 1,
    usersPerPage: 6,
    showDeletePopOp: false,
    userId: '',
};

const adminSlice = createSlice({
    name: `admin`,
    initialState,
    reducers: {
        setUserPopUp: (state, action) => {
            state.userPopUp = action.payload;
        },
        setUsers: (state, action) => {
            state.Users = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setUsersPerPage: (state, action) => {
            state.usersPerPage = action.payload;
        },
        setShowDeletePopOp: (state, action) => {
            state.showDeletePopOp = action.payload.visibility;
            state.userId = action.payload.userId;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllUsersAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetAllUsersAction.fulfilled, (state, action: any) => {
                state.isLoading = false;

                state.Users = action.payload.map((user: any) => ({
                    Id: user.id,
                    Username: user.username || '',
                    ImageUrl: user.imageUrl || '',
                    Email: user.email || '',
                    IsEmailConfirmed: user.isEmailConfirmed || false,
                    FirstName: user.firstName || '',
                    LastName: user.lastName || '',
                    Role: user.roles[0].name || '',
                }));

                console.log(state.Users);
            })
            .addCase(GetAllUsersAction.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(DeleteUserAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(DeleteUserAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.showDeletePopOp = false;

                toast.success("Succes", {
                    position: "bottom-right",
                });
            })
            .addCase(DeleteUserAction.rejected, (state, action) => {
                state.isLoading = false;
                state.showDeletePopOp = false;

                toast.error("Error", {
                    position: "bottom-right",
                });
            })
    }
});

export const { setUserPopUp, setUsers, setCurrentPage, setUsersPerPage, setShowDeletePopOp } = adminSlice.actions;
export default adminSlice.reducer;