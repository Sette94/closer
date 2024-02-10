import App from "./App";
import HomeContainer from "./components/Home";
import Login from "./components/Login/LoginComponent";
import UserInfoComponent from "./components/UserInfo/UserInfoComponent"
import UserGamesComponent from "./components/UserGames/UserGamesComponent";
import UserIndividualGame from "./components/UserGames/UserIndividualGame";
import CloserComponent from "./components/Closer/CloserComponent";
import CloserGameComponent from "./components/Closer/CloserGameComponent";
import CloserFunFactsLanding from "./components/Closer/CloserFunFactsLanding"
import CloserFunFacts from "./components/Closer/CloserFunFacts"
import CloserPlayersLanding from "./components/Closer/CloserPlayersLanding"
import CloserEnding from "./components/Closer/CloserEnding"





const routes = [

    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Login /> },
            { path: "/home", element: <HomeContainer /> },
            { path: "/userinfo", element: <UserInfoComponent /> },
            { path: "/mygames", element: <UserGamesComponent /> },
            { path: "/games/:userId/", element: <UserIndividualGame /> },
            { path: "/closer", element: <CloserComponent /> },
            { path: "/closer/:userId", element: <CloserGameComponent /> },
            { path: "/closer/:userId/general", element: <CloserFunFactsLanding /> },
            { path: "/closer/:userId/general/facts", element: <CloserFunFacts /> },
            { path: "/closer/:userId/general/players", element: <CloserPlayersLanding /> },
            { path: "/closer/:userId/ending", element: <CloserEnding /> }





        ],
    },
];

export default routes