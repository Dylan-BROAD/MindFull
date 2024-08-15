import { useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import MindfullForm from '../../components/Mindfull/MindfullForm';
import { useLocation, useNavigate } from 'react-router-dom';

const EditPage = ({ user, handleLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!location.state) {
            // Redirect to the home page or a fallback page if location.state is null
            navigate('/');
        }
    }, [location.state, navigate]);

    if (!location.state) {
        return null; // Return null to prevent rendering if the state is null
    }

    const { title, journal, goals, songName, moodRating, id } = location.state;

    return (
        <>
            <NavBar user={user} handleLogout={handleLogout} />
            <MindfullForm
                user={user}
                editTitle={title || ""}
                editJournal={journal || ""}
                editGoals={goals || ""}
                editSongName={songName || ""}
                editMoodRating={moodRating || ""}
                id={id || ""}
            />
        </>
    );
};

export default EditPage;
