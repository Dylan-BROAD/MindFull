import { component } from 'react'
import { Link } from 'react-router-dom'
import './MindfullForm'


class Mindfull extends component {

   


    render() {
        const { title, journal, goals, songName, moodRating, id } = this.props
        return (
            <div class="row">
                <div class="col s12 m6">
                    <div class="card blue-grey darken-1">
                        <div class="card-content grey-text">
                            <span class="card title">{title}</span>
                            <h4>JOURNAL: {journal}</h4>
                            <p>GOALS: {goals}</p>
                            <p>SONG NAME{songName}</p>
                            <p>MOOD RATING:{moodRating}</p>
                            <button onClick={this.handleClick}>X</button>
                            <Link to={{
                                pathname: '/edit',
                                state: {
                                    title, journal, goals, songName, moodRating, id
                                }
                            }}>EDIT</Link>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}
export default Mindfull;