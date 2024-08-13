import React from 'react';
import { Link } from 'react-router-dom';
import './MindfullForm';

const Mindfull = ({ title, journal, goals, songName, moodRating, id, handleClick }) => {
    return (
        <div className="row">
            <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content grey-text">
                        <span className="card-title">{title}</span>
                        <h4>JOURNAL: {journal}</h4>
                        <p>GOALS: {goals}</p>
                        <p>SONG NAME: {songName}</p>
                        <p>MOOD RATING: {moodRating}</p>
                        <button onClick={handleClick}>X</button>
                        <Link to={{
                            pathname: '/edit',
                            state: {
                                title, journal, goals, songName, moodRating, id
                            }
                        }}>EDIT</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mindfull;
