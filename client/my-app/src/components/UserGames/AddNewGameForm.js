import React, { useEffect, useState } from 'react';
import { form, useField, useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from 'react-redux';
import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from 'date-fns/locale/es';

registerLocale('es', es)


function NewGameHandler({ handleNewGame, ballparks }) {
    const user = useSelector((state) => state.user);
    const [response, setResponse] = useState(null);
    const [startdate, setStartDate] = useState('2023-01-01');
    const [filterValue, setFilterValue] = useState('');



    function handleDate(date) {
        const dateObject = new Date(date);
        dateObject.setDate(dateObject.getDate() + 1); // Add a day to the date

        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
        const day = dateObject.getDate().toString().padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;
        setStartDate(formattedDate)
        handleForm(formattedDate)

    }

    function handleForm(formDate) {
        const dateObject = new Date(formDate);
        dateObject.setDate(dateObject.getDate()); // Add a day to the date

        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
        const day = dateObject.getDate().toString().padStart(2, "0");

        const formattedformDate = `${year}-${month}-${day}`;
        formik.setFieldValue('date', formattedformDate); // Update formik values

    }

    const formSchema = yup.object().shape({
        venue: yup.string().required("Must enter a MLB Ballpark"),
        date: yup.string().required("Must enter a date yyyy-mm-dd"),
    });

    const formik = useFormik({
        initialValues: {
            venue: "",
            date: startdate,
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

    const filteredBallparks = Object.values(ballparks).filter(ballpark =>
        ballpark.toLowerCase().includes(filterValue.toLowerCase()))

    return (
        <div>
            <p>{response}</p>
            <div className="login">
                <form onSubmit={formik.handleSubmit}>
                    <div className="input-group">


                        <form>
                            <DatePicker
                                selected={startdate}
                                onChange={(date) => handleDate(date)}

                            />
                        </form>
                        {formik.errors.date && (
                            <p className="error">{formik.errors.date}</p>
                        )}
                    </div>

                    <div className="input-group">


                        <select
                            id="venue"
                            name="venue"
                            onChange={formik.handleChange}
                            value={formik.values.venue}>
                            <input
                                type="text"
                                placeholder="Filter ballparks"
                                value={filterValue}
                                onChange={e => setFilterValue(e.target.value)}
                            />
                            {Object.values(filteredBallparks).map((ballpark, index) => (
                                <option key={index} value={ballpark}>{ballpark}</option>
                            ))}
                        </select>



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
