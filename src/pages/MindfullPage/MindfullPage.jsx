import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Mindfull from '../../components/Mindfull/Mindfull';
import { mindfullsPerUser } from '../../utilities/mindfull-api';

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
            <div key={d._id} className="bg-white p-6 rounded-lg shadow-md mb-6">
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
        <div className="min-h-screen flex flex-col">
            <NavBar user={user} handleLogout={handleLogout} />
            <div className="flex-grow bg-gray-100 p-6">
                <div className="container mx-auto">
                    {collection ? (
                        collection
                    ) : (
                        <p className="text-center text-gray-700">No journals found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MindfullPage;
