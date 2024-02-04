import App from "./App";
import HomeContainer from "./components/Home";
import Login from "./components/Login/LoginComponent";
import UserGamesComponent from "./components/UserInfo/UserGamesComponent"
import LoginRoute from "./components/Login/LoginRoute"



const routes = [

    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Login /> },
            { path: "/home", element: <HomeContainer /> },
            { path: "/mygames", element: <UserGamesComponent /> }


        ],
    },
];

export default routes