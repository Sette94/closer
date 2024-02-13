import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { loginSuccess } from "../actions";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Popup from 'react-popup';
import { useFormik } from "formik";


function RegistrationHandler() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const formSchema = yup.object().shape({
        password: yup.string().required("Must enter a password"),
        username: yup.string().required("Must enter a username"),
    });

    const formikRegistration = useFormik({
        initialValues: {
            password: "",
            username: "",
        },
        validationSchema: formSchema,
        onSubmit: async () => {
            try {

                await axios.post("http://localhost:5555/users", {
                    username: formikRegistration.values.username,
                    password: formikRegistration.values.password
                })
                    .then((response) => {
                        console.log(response);
                        Popup.alert('Successfully created account!');
                        formikRegistration.resetForm(); // Reset form values
                    });
            } catch (error) {
                console.log(error.response.data.response);
                Popup.alert(error.response.data.response);

            }
        },
    });

    return (

        <div className="Registration">
            <form onSubmit={formikRegistration.handleSubmit}>
                <div className="input-group">
                    <input
                        id="username"
                        name="username"
                        placeholder="username"
                        onChange={formikRegistration.handleChange}
                        value={formikRegistration.values.username}
                    />
                    {formikRegistration.errors.username && (
                        <p className="error">{formikRegistration.errors.username}</p>
                    )}
                </div>
                <div className="input-group">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={formikRegistration.handleChange}
                        value={formikRegistration.values.password}
                    />
                    {formikRegistration.errors.password && (
                        <p className="error">{formikRegistration.errors.password}</p>
                    )}
                    <div className="button-container">
                        <button type="submit">Register</button>
                    </div>
                </div>
            </form>
        </div>


    );
}

export default RegistrationHandler;
