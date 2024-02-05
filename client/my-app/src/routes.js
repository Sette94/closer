import App from "./App";
import HomeContainer from "./components/Home";
import Login from "./components/Login/LoginComponent";
import UserInfoComponent from "./components/UserInfo/UserInfoComponent"
import UserGamesComponent from "./components/UserGames/UserGamesComponent";



const routes = [

    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Login /> },
            { path: "/home", element: <HomeContainer /> },
            { path: "/userinfo", element: <UserInfoComponent /> },
            { path: "/mygames", element: <UserGamesComponent /> }



        ],
    },
];

export default routes