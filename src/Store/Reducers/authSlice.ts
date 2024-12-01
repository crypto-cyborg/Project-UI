import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterDTO } from '../../Data/DTOs/Auth.dto';
import { LoginUser, RegisterUser, GetUserAccountInfo } from '../Actions/authActions';
import { toast } from 'react-toastify';
import '../../Pages/Auth/Auth.scss'
import { User } from '../../Data/Models/Auth.model';

interface AuthData {
    registerData: RegisterDTO,
    isRegister: boolean,
    isLoading: boolean,
    isLoggedIn: boolean,
    User: User,
}

const initialState: AuthData = {
    registerData: {
        Username: '',
        Password: '',
        ConfirmPassword: '',
        Email: '',
        FirstName: '',
        LastName: '',
        SecretKey: '',
        ApiKey: ''
    },
    isRegister: false,
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn') || 'false'),
    isLoading: false,
    User: {
        Id: '',
        Username: '',
        ImageUrl: '',
        Email: '',
        IsEmailConfirmed: false,
        FirstName: '',
        LastName: '',
        Role: '',
    }
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
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
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
                state.isRegister = false;
                state.isLoggedIn = true;
                localStorage.setItem('isLoggedIn', JSON.stringify(state.isLoggedIn));

                toast.success("Succes", {
                    position: "bottom-right",
                });
            })
            .addCase(LoginUser.rejected, (state, action: any) => {
                state.isLoading = false;
            
                const errorMessage = action.payload?.ex?.Message || 'User not found';  // Если Message не существует, выводим дефолтное сообщение
            
                console.log(action.payload);
                toast.error(errorMessage, {
                    position: "bottom-right",
                });
            })
            
            .addCase(RegisterUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(RegisterUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isRegister = true;
            })
            .addCase(RegisterUser.rejected, (state, action: any) => {
                state.isLoading = false;

                const errorMessage = action.payload?.ex?.Message || 'User not found';  // Если Message не существует, выводим дефолтное сообщение
            
                console.log(action.payload);
                toast.error(errorMessage, {
                    position: "bottom-right",
                });
            })
            .addCase(GetUserAccountInfo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetUserAccountInfo.fulfilled, (state, action: any) => {
                state.isLoading = false;
                state.isRegister = true;

                state.User = {
                    Id: action.payload.id,
                    Username: action.payload.username || '',
                    ImageUrl: action.payload.imageUrl || '',
                    Email: action.payload.email || '',
                    IsEmailConfirmed: action.payload.isEmailConfirmed || false,
                    FirstName: action.payload.firstName || '',
                    LastName: action.payload.lastName || '',
                    Role: action.payload.roles[0].name || '',
                };

                console.log(state.User);
            })
            .addCase(GetUserAccountInfo.rejected, (state, action) => {
                state.isLoading = false;
            })
    }
});

export const { setRegisterData, setIsRegister, setIsLoading } = authSlice.actions;
export default authSlice.reducer;