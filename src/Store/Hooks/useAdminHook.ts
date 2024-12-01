import { useDispatch } from 'react-redux';
import { GetAllUsersAction, DeleteUserAction } from '../Actions/adminActions';
import { AppDispatch } from '../Reducers/store';
import * as adminSlice from '../Reducers/adminSlice';

export const useAdmin = () => {
    const dispatch = useDispatch<AppDispatch>();

    const GetAllUsers = async () => {
        await dispatch(GetAllUsersAction());
    };

    const DeleteUser = async (userId: string) => {
        await dispatch(DeleteUserAction(userId));
        await dispatch(GetAllUsersAction());
    };

    const Resize = () => {
        const width = window.innerWidth;
        if (width <= 768) {
            dispatch(adminSlice.setUsersPerPage(2));
        } else if (width <= 1200) {
            dispatch(adminSlice.setUsersPerPage(4));
        } else {
            dispatch(adminSlice.setUsersPerPage(6));
        }
    };

    const PageChange = (page: number, totalPages: number) => {
        if (page > 0 && page <= totalPages) {
            dispatch(adminSlice.setCurrentPage(page));
        }
    };

    return { GetAllUsers, DeleteUser, Resize, PageChange };
};