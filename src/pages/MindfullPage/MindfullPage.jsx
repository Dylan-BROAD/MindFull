import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Mindfull from '../../components/Mindfull/Mindfull';
import { mindfullsPerUser } from '../../services/mindfull-api';

const MindfullPage = ({ user, handleLogout }) => {
    const [apiResponse, setApiResponse] = useState(null);

    const componentUpdate = async () => {
        if (user) {
            const result = await mindfullsPerUser(user.email);
            setApiResponse(result);
        }
    };

    useEffect(() => {
        componentUpdate();
    }, [user]);

    const mindfullData = apiResponse;
    let collection;
    if (mindfullData) {
        collection = mindfullData.map((d) => (
            <div key={d._id}>
                <Mindfull
                    title={d.title}
                    journal={d.journal}
                    goals={d.goals}
                    songName={d.songName}
                    moodRating={d.moodRating}
                    id={d._id}
                    update={componentUpdate}
                />
            </div>
        ));
    }

    return (
        <>
            <NavBar user={user} handleLogout={handleLogout} />
            {collection}
        </>
    );
};

export default MindfullPage;
