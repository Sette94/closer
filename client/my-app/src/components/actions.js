export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = (user) => {
    localStorage.setItem('user', JSON.stringify(user));

    return {
        type: 'LOGIN_SUCCESS',
        payload: user,
    };
};

export const logout = () => {
    localStorage.removeItem('user');

    return {
        type: LOGOUT
    }

};
