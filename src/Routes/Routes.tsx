import App from "../App";
import Admin from "../Pages/Admin/Admin";
import Auth from "../Pages/Auth/Auth";
import Chart from "../Pages/Chart/Chart";
import Home from "../Pages/Home/Home";
import Profile from "../Pages/Profile/Profile";
import Analytics from "../Pages/Analytics/Analytics";
import PrivateRoute from "./PrivateRoute";

const appRoutes = [
    {
        path: "chart",
        element: <Chart />,
    },
    {
        path: "profile",
        element: <Profile />,
    },
    {
        path: "analytics",
        element: <Analytics />,
    },
    {
        path: "admin",
        element: <Admin />,
    }
];

const app = [
    {
        element: <PrivateRoute element={<App />} isAuthenticated={true} />,
        children: appRoutes
    },
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "auth",
        element: <Auth />,
    },
];

export default app;