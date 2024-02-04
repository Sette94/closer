import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';



function UserGameContainer() {
    const navigate = useNavigate();

    const { state } = useLocation();
    const activeUser = state?.active_user;  // Assuming currentUser is part of the state

    console.log(activeUser)

    return (
        <div>
            <div className="landingpage">
                <h1>{activeUser.username} Profile</h1>

            </div>


        </div>

    )



}


export default UserGameContainer