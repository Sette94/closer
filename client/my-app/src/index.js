import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './components/store';
import routes from './routes'; // Make sure to import your routes configuration
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loginSuccess } from './components/actions'; // Adjust the path based on your project structure


// Check if there is a stored user in localStorage
const storedUser = localStorage.getItem('user');
console.log(store)
if (storedUser) {
    const user = JSON.parse(storedUser);
    // Dispatch the loginSuccess action with the stored user information
    store.dispatch(loginSuccess(user));
}

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
