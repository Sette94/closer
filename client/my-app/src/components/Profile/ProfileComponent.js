import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProfileComponent() {

    const [userProfile, setUserProfile] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(``);
                setUserProfile(response.data);
            } catch (error) {
                console.error('Error fetching user games:', error);
            }
        };

        fetchData();
    }, []);



    return (
        <div>
            Hello
        </div>
    )

}

export default ProfileComponent