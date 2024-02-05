import App from "./App";
import HomeContainer from "./components/Home";
import Login from "./components/Login/LoginComponent";
import UserInfoComponent from "./components/UserInfo/UserInfoComponent"
import UserGamesComponent from "./components/UserGames/UserGamesComponent";
import UserIndividualGame from "./components/UserGames/UserIndividualGame";


const routes = [

    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Login /> },
            { path: "/home", element: <HomeContainer /> },
            { path: "/userinfo", element: <UserInfoComponent /> },
            { path: "/mygames", element: <UserGamesComponent /> },
            { path: "/games/:userId/", element: <UserIndividualGame /> }


        ],
    },
];

export default routes