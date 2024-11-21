import { createRoot } from 'react-dom/client'
import './main.scss'
import './i18n'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Routes from "./Routes/Routes"
import store from './Store/Reducers/store';
import { Provider } from 'react-redux';

const router = createBrowserRouter(Routes);

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)