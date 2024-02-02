import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useLocation } from 'react-router-dom';



function HomeContainer() {
    const { state } = useLocation();
    const user = state?.currentUser;  // Assuming currentUser is part of the state



    console.log(user)

    return (
        <div>
            <div className="home">
                <h1>{user.username}</h1>
                <button> Add New Game </button>
                <button> MLB Closer </button>
            </div>


        </div>

    )



}


export default HomeContainer