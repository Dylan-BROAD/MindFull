import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create, update } from '../../services/mindfull-api';
import './Mindfull.css';

const MindfullForm = ({ user, id }) => {
    const [formState, setFormState] = useState({
        title: '',
        journal: '',
        goals: '',
        songName: '',
        moodRating: 10,
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { title, journal, goals, songName, moodRating } = formState;
        const email = user.email;

        try {
            if (id) {
                await update(title, journal, goals, songName, moodRating, email, id);
            } else {
                const initialFetch = await create(title, journal, goals, songName, moodRating, email);
                const fetchJSON = await initialFetch.json();
                alert('Thank you for your post');
            }
            setFormState({ title: '', journal: '', goals: '', songName: '', moodRating: 10 });
            navigate('/'); // Optionally navigate to another page after submission
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    };

    const { title, journal, goals, songName } = formState;

    return (
        <form className="blog-form" onSubmit={handleSubmit}>
            <div>
                <div>
                    <label>Title</label>
                    <input
                        className="text-box"
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={title}
                    />
                </div>
                <p>{journal}</p>
                <div>
                    <label>Journal</label>
                    <textarea
                        className="text-box"
                        type="text"
                        name="journal"
                        onChange={handleChange}
                        value={journal}
                    />
                </div>
                <div>
                    <label>Goals</label>
                    <input
                        className="text-box"
                        type="text"
                        name="goals"
                        onChange={handleChange}
                        value={goals}
                    />
                </div>
            </div>
            <label>Song Name</label>
            <input
                className="text-box"
                type="text"
                name="songName"
                onChange={handleChange}
                value={songName}
            />
            <input type="submit" />
        </form>
    );
};

export default MindfullForm;
