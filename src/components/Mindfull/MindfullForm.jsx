import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create, update } from '../../services/mindfull-api';
import Modal from '../Modal/Modal';

const MindfullForm = ({ user, id }) => {
    const [formState, setFormState] = useState({
        title: '',
        journal: '',
        goals: '',
        songName: '',
        moodRating: 10,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

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
                setModalMessage('Thank you for your post');
                setIsModalOpen(true);
            }
            setFormState({ title: '', journal: '', goals: '', songName: '', moodRating: 10 });
        } catch (err) {
            console.error('Error submitting form:', err);
            setModalMessage('Error submitting form. Please try again.');
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        navigate('/mindfull'); // Optionally navigate to another page after closing the modal
    };

    const { title, journal, goals, songName, moodRating } = formState;

    return (
        <>
            <form className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Title</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={title}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Journal</label>
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        name="journal"
                        onChange={handleChange}
                        value={journal}
                        rows="4"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Goals</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        type="text"
                        name="goals"
                        onChange={handleChange}
                        value={goals}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Song Name</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        type="text"
                        name="songName"
                        onChange={handleChange}
                        value={songName}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Mood Rating</label>
                    <select
                        name="moodRating"
                        value={moodRating}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        {[...Array(10).keys()].map(i => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                >
                    Submit
                </button>
            </form>

            {/* Modal for feedback */}
            <Modal
                isOpen={isModalOpen}
                title="Submission Status"
                message={modalMessage}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default MindfullForm;
