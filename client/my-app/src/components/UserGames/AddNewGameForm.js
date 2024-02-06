import React, { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from 'react-redux';
import axios from "axios";

function NewGameHandler({ handleNewGame }) {
    const user = useSelector((state) => state.user);
    const [response, setResponse] = useState(null);


    const formSchema = yup.object().shape({
        venue: yup.string().required("Must enter a MLB Ballpark"),
        date: yup.string().required("Must enter a date yyyy-mm-dd"),
    });

    const formik = useFormik({
        initialValues: {
            venue: "",
            date: "",
        },
        validationSchema: formSchema,
        onSubmit: async () => {
            try {
                const response = await axios.post(`http://localhost:5555/usergames/${user.user_id}`, {
                    data: {
                        "venue": formik.values.venue,
                        "date": formik.values.date
                    }
                });
                console.log(response)
                if (response.status == 200) {
                    setResponse(response.data.response);
                    handleNewGame(response.data.gamePk, user.user_id)
                    formik.resetForm();

                }
            }
            catch (error) {
                formik.resetForm();
                setResponse(error.response.data.response);
                console.error("Response error:", error.response.data);
                console.error("Status code:", error.response.status);
            }
        },
    });
    useEffect(() => {
        if (response !== null) {
            console.log(response);
        }
    }, [response]);

    return (
        <div>
            <p>{response}</p>
            <div className="login">
                <form onSubmit={formik.handleSubmit}>
                    <div className="input-group">
                        <input
                            id="date"
                            name="date"
                            placeholder="Enter a date yyyy-mm-dd"
                            onChange={formik.handleChange}
                            value={formik.values.date}
                        />
                        {formik.errors.date && (
                            <p className="error">{formik.errors.date}</p>
                        )}
                    </div>
                    <div className="input-group">
                        <input
                            id="venue"
                            name="venue"
                            placeholder="Enter MLB Ballpark"
                            onChange={formik.handleChange}
                            value={formik.values.venue}
                        />
                        {formik.errors.venue && (
                            <p className="error">{formik.errors.venue}</p>
                        )}
                        <div className="button-container">
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewGameHandler;
