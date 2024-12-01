import { useDispatch } from 'react-redux';
import { InitializeAction, GetUserPositionsAction } from '../Actions/profileAction';
import { AppDispatch } from '../Reducers/store';


export const useProfile = () => {
    const dispatch = useDispatch<AppDispatch>();

    const Initialize = async (userId: string) => {
        await dispatch(InitializeAction(userId));
    };

    const GetUserPositions = async (userId: string) => {
        await dispatch(GetUserPositionsAction(userId));
    };

    return { Initialize, GetUserPositions };
};