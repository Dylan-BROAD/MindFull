import{ Component } from 'react';
// import { Link } from 'react-router-dom'
import './Mindfull.css'


class MindfullForm extends Component {
    state = {
        title: this.props.editTitle || '',
        notion: this.props.editNotion || '',
        goals: this.props.editGoals || '',
        songName: this.props.editSongName || '',
        moodRating: this.props.editMoodRating || 10,
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = async event => {
        const { title, journal, goals, songName, moodRating } = this.state
        const email = this.props.user.email
        event.preventDefault()
        if (this.props.id)
            await update(title, journal, goals, songName, moodRating, email, this.props.id)
        else {
            const initialFetch = await create(title, journal, goals, songName, moodRating, email)
            const fetchJSON = await initialFetch.json()
            alert('thank you for your post')
        }
        this.setState({ title: '', journal: '', goals: '', songName: '' })
    }

    render() {
        return (
            <form className="blog-form" onSubmit={this.handleSubmit}>
                <div>
                    <div>
                        {' '}
                        <label>Title</label>
                        <input
                            className="text-box"
                            type="text"
                            name="title"
                            onChange={this.handleChange}
                            value={this.state.title}
                        />
                    </div>
                    <p>{this.state.notion}</p>
                    <div>
                        {' '}
                        <label>Journal</label>
                        <textarea
                            className="text-box"
                            type="text"
                            name="notion"
                            onChange={this.handleChange}
                            value={this.state.notion}
                        />
                    </div>
                    <div>
                        <label>Goals</label>
                        <input
                            className="text-box"
                            type="text"
                            name="goals"
                            onChange={this.handleChange}
                            value={this.state.goals}
                        />
                    </div>
                </div>
                <label>Song Name</label>
                <input
                    className="text-box"
                    type="text"
                    name="songName"
                    onChange={this.handleChange}
                    value={this.state.songName}
                />
                <input type="submit" />
            </form>
        )
    }

}
export default MindfullForm 