import React from 'react';
import { Link } from 'react-router-dom';
import { deleteOne } from '../../services/mindfull-api';

const Mindfull = ({ title, journal, goals, songName, moodRating, id, update }) => {

    const handleClick = async () => {
        await deleteOne(id);
        update();
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-6">
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <span className="block text-xl font-semibold text-gray-800">{title}</span>
                    <button
                        onClick={handleClick}
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                        X
                    </button>
                </div>
                <div className="mt-4 text-gray-600">
                    <h4 className="text-lg font-semibold">JOURNAL:</h4>
                    <p>{journal}</p>
                    <h4 className="text-lg font-semibold mt-2">GOALS:</h4>
                    <p>{goals}</p>
                    <h4 className="text-lg font-semibold mt-2">SONG NAME:</h4>
                    <p>{songName}</p>
                    <h4 className="text-lg font-semibold mt-2">MOOD RATING:</h4>
                    <p>{moodRating}</p>
                </div>
                <div className="mt-4">
                    <Link
                        to={{
                            pathname: '/edit',
                            state: { title, journal, goals, songName, moodRating, id }
                        }}
                        className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                        EDIT
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Mindfull;
