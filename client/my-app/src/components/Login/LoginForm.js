import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { loginSuccess } from "../actions";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Popup from 'react-popup';
import { useFormik } from "formik";


function LoginHandler() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const formSchema = yup.object().shape({
        password: yup.string().required("Must enter a password"),
        username: yup.string().required("Must enter a username"),
    });

    const formikLogin = useFormik({
        initialValues: {
            password: "",
            username: "",
        },
        validationSchema: formSchema,
        onSubmit: async () => {
            try {
                const response = await axios.get("http://localhost:5555/users");
                const contentType = response.headers["content-type"];

                if (contentType && contentType.includes("application/json")) {
                    const data = response.data;
                    const matchedUser = data.find(
                        (currentUser) =>
                            currentUser.username === formikLogin.values.username &&
                            currentUser.password === formikLogin.values.password
                    );

                    if (matchedUser) {
                        const storageUser = {
                            "username": matchedUser.username,
                            "user_id": matchedUser.user_id,
                            "profile_image": matchedUser.profile_image
                        };
                        dispatch(loginSuccess(storageUser));
                        navigate(`/home`);
                    } else {
                        Popup.alert('Incorrect username or password');
                    }
                } else {
                    throw new Error("Response is not in JSON format");
                }
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (

        <div className="login">
            <form onSubmit={formikLogin.handleSubmit}>
                <div className="input-group">
                    <input
                        id="username"
                        name="username"
                        placeholder="username"
                        onChange={formikLogin.handleChange}
                        value={formikLogin.values.username}
                    />
                    {formikLogin.errors.username && (
                        <p className="error">{formikLogin.errors.username}</p>
                    )}
                </div>
                <div className="input-group">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={formikLogin.handleChange}
                        value={formikLogin.values.password}
                    />
                    {formikLogin.errors.password && (
                        <p className="error">{formikLogin.errors.password}</p>
                    )}
                </div>
                <div className="input-group">
                    <div className="button-container">
                        <button type="submit">Login</button>
                    </div>
                </div>
            </form>
        </div>


    );
}

export default LoginHandler;
