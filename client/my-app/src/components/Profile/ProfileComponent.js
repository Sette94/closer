import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { loginSuccess } from "../actions";
import { useNavigate } from 'react-router-dom';


import { useFormik } from "formik";
import * as yup from "yup";



function ProfileComponent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const matchedUser = {
    //     "first_year": "2024-02-09 00:10:34",
    //     "password": "Nick",
    //     "profile_image": null,
    //     "user_id": 1,
    //     "username": "Sette94"
    // }
    // dispatch(loginSuccess(matchedUser));


    const user = useSelector((state) => state.user);


    function handlePatch() {
        axios.patch(`http://localhost:5555/users/${user.user_id}`, {
            username: formik.values.username,
            password: formik.values.password,
        })
            .then(response => {
                console.log(response.data)
            }
            )
            .catch(error => console.error(error));
    }




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
                handlePatch()
            } catch (error) {
                console.log(error);
            }
        },
    });





    return (
        <div className="profileform">
            <form onSubmit={formik.handleSubmit}>
                <div className="input-group-profile">
                    <input
                        id="username"
                        name="username"
                        placeholder={user.username}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    {formik.errors.username && (
                        <p className="error">{formik.errors.username}</p>
                    )}
                </div>
                <div className="input-group-profile">
                    <input
                        id="password"
                        name="password"
                        placeholder={user.password}
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
    )

}

export default ProfileComponent