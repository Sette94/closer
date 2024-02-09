import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import "./Home.css"
import Card from 'react-bootstrap/Card';


const ConsolidatedHomeContainer = () => {
    const navigate = useNavigate()

    const isAuthenticated = useSelector((state) => state.isAuthenticated);
    const user = useSelector((state) => state.user);

    return (

        <div>
            {isAuthenticated ? (
                <div>
                    <h1>Welcome {user.username}</h1>
                    <h2>Please select an option below</h2>
                </div>
            ) : (
                <p>Please log in.</p>
            )}


            <div className="homecardscontainer">
                <div className="homecards">
                    <Card onClick={() => { navigate('/mygames') }} className="homecardsindividual">
                        <Card.Body >
                            <Card.Title>View Games Library</Card.Title>
                        </Card.Body>
                    </Card>

                    <Card onClick={() => { navigate('/closer') }} className="homecardsindividual">
                        <Card.Body >
                            <Card.Title>MLB Closer</Card.Title>
                        </Card.Body>
                    </Card>


                </div>
            </div>
        </div>

    );
};

export default ConsolidatedHomeContainer;
