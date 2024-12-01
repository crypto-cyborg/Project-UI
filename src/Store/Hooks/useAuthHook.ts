import { useDispatch } from 'react-redux';
import { LoginUser, RegisterUser, GetUserAccountInfo } from '../../Store/Actions/authActions';
import { LoginDTO, RegisterDTO } from '../../Data/DTOs/Auth.dto';
import { AppDispatch } from '../Reducers/store';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const Login = async (loginData: LoginDTO) => {
        dispatch(LoginUser(loginData))
            .then((result) => {
                if (result.meta.requestStatus === 'fulfilled') {
                    GetUserAccountInfoAction();
                    navigate('/chart');
                }
            });
    };

    const Register = async (registerData: RegisterDTO) => {
        await dispatch(RegisterUser(registerData));
    };

    const GetUserAccountInfoAction = async () => {
        await dispatch(GetUserAccountInfo());
    };

    return { Login, Register, GetUserAccountInfoAction };
};