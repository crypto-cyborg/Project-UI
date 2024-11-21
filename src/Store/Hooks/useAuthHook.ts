import { useDispatch } from 'react-redux';
import { LoginUser, RegisterUser } from '../../Store/Actions/authActions';
import { LoginDTO, RegisterDTO } from '../../Data/DTOs/Auth.dto';
import { AppDispatch } from '../Reducers/store';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();

    const Login = async (loginData: LoginDTO) => {
        try {
            await dispatch(LoginUser(loginData));
        } catch (error) {
            console.error('Ошибка регистрации:', error);
        }
    };
    const Register = async (registerData: RegisterDTO) => {
        try {
            await dispatch(RegisterUser(registerData));
        } catch (error) {
            console.error('Ошибка регистрации:', error);
        }
    };

    return { Login, Register };
};