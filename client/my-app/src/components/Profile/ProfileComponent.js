import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { loginSuccess } from "../actions";
import Popup from 'react-popup';

import { useFormik } from "formik";
import * as yup from "yup";
import './styles/profile.css'

function ProfileComponent() {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    function handlePatch() {
        const formUserData = {
            user_id: user.user_id,
            username: formik.values.username,
            password: formik.values.password,
            profile_image: formik.values.profile_image
        }

        axios.patch(`http://localhost:5555/users/${user.user_id}`, {
            user_id: user.user_id,
            username: formik.values.username,
            password: formik.values.password,
            profile_image: formik.values.profile_image
        })
            .then(response => {
                Popup.alert(response.data.response);
                dispatch(loginSuccess(formUserData));
            })

            .catch(error => {
                console.log(error)
                Popup.alert(error.response.data.response);
            });
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
        <div>
            <div className="profile-container">
                <Popup />
                <div className="profile-card">
                    <h2>Edit Profile</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="input-group-profile">
                            <input
                                id="username"
                                name="username"
                                placeholder="Change username"
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
                                type="password"
                                placeholder="Change password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                            {formik.errors.password && (
                                <p className="error">{formik.errors.password}</p>
                            )}
                        </div>
                        <div className="button-container">
                            <button type="submit">Update Profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default ProfileComponent;
