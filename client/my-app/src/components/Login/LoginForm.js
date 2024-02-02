import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios'


function LoginForm() {
    const navigate = useNavigate();

    const formSchema = yup.object().shape({
        password: yup.string().required("Must enter an password"),
        username: yup.string().required("Must enter a username"),
    });

    const formik = useFormik({
        initialValues: {
            password: '',
            username: '',
        },
        validationSchema: formSchema,
        onSubmit: () => {
            axios.get('http://localhost:5555/users')
                .then((response) => {
                    const contentType = response.headers['content-type'];
                    console.log(contentType);

                    if (contentType && contentType.includes('application/json')) {
                        return response.data;
                    } else {
                        throw new Error('Response is not in JSON format');
                    }
                })
                .then((data) => {
                    console.log(data);

                    data.forEach((currentUser) => {
                        if (
                            currentUser.username === formik.values.username &&
                            currentUser.password === formik.values.password
                        ) {
                            navigate(`/welcome`, {
                                state: { currentUser },
                            });
                        }
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
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
                    {formik.errors.username && <p className="error">{formik.errors.username}</p>}
                </div>
                <div className="input-group">
                    <input
                        id="password"
                        name="password"
                        // type="password"
                        placeholder="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <p> {formik.errors.position}</p>
                    <div className="button-container">
                        <button type="submit">Login</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;


