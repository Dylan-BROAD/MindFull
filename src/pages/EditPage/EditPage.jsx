import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import MindfullForm from '../../components/Mindfull/MindfullForm';
import { useLocation } from 'react-router-dom';

const EditPage = ({ user, handleLogout }) => {
    const location = useLocation();
    const { title, journal, goals, songName, moodRating, id } = location.state;

    return (
        <>
            <NavBar user={user} handleLogout={handleLogout} />
            <MindfullForm
                user={user}
                editTitle={title}
                editJournal={journal}
                editGoals={goals}
                editSongName={songName}
                editMoodRating={moodRating}
                id={id}
            />
        </>
    );
};

export default EditPage;
