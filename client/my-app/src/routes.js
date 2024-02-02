import App from "./App";
import WelcomeContainer from "./components/Home";
import Login from "./components/Login/LoginComponent";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Login /> },
            { path: "/welcome", element: <WelcomeContainer /> }

        ],
    },
];

export default routes