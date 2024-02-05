import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { loginSuccess } from "../actions";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function LoginHandler() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const formSchema = yup.object().shape({
        password: yup.string().required("Must enter a password"),
        username: yup.string().required("Must enter a username"),
    });

    const formik = useFormik({
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
                            currentUser.username === formik.values.username &&
                            currentUser.password === formik.values.password
                    );

                    if (matchedUser) {
                        // Dispatch the loginSuccess action to update Redux state
                        dispatch(loginSuccess(matchedUser));
                        console.log(dispatch(loginSuccess(matchedUser)))
                        navigate(`/home`);
                    } else {
                        console.log("Incorrect username or password");
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
            <form onSubmit={formik.handleSubmit}>
                <div className="input-group">
                    <input
                        id="username"
                        name="username"
                        placeholder="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    {formik.errors.username && (
                        <p className="error">{formik.errors.username}</p>
                    )}
                </div>
                <div className="input-group">
                    <input
                        id="password"
                        name="password"
                        placeholder="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password && (
                        <p className="error">{formik.errors.password}</p>
                    )}
                    <div className="button-container">
                        <button type="submit">Login</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginHandler;
