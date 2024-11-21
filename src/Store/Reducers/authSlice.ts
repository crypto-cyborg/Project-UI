import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterDTO } from '../../Data/DTOs/Auth.dto';
import { LoginUser, RegisterUser } from '../Actions/authActions';

interface AuthData {
    registerData: RegisterDTO,
    isRegister: boolean,
    isLoading: boolean,
}

const initialState: AuthData = {
    registerData: {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        firstName: '',
        lastName: '',
        secretKey: '',
        apiKey: ''
    },
    isRegister: false,
    isLoading: false,
};

const authSlice = createSlice({
    name: `auth`,
    initialState,
    reducers: {
        setRegisterData: (state, action: PayloadAction<RegisterDTO>) => {
            state.registerData = action.payload;
        },
        setIsRegister: (state, action: PayloadAction<boolean>) => {
            state.isRegister = action.payload;
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(LoginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isRegister = true;
                console.log(action.payload);
            })
            .addCase(LoginUser.rejected, (state, action) => {
                state.isLoading = false;
                console.log(action.payload);
            })
            .addCase(RegisterUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(RegisterUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isRegister = true;
                console.log(action.payload);
            })
            .addCase(RegisterUser.rejected, (state, action) => {
                state.isLoading = false;
                console.log(action.payload);
            })
    }
});

export const { setRegisterData, setIsRegister, setIsLoading } = authSlice.actions;
export default authSlice.reducer;