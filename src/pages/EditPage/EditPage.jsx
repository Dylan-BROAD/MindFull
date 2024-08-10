import { Component } from 'react';
import NavBar from '../../components/NavBar/NavBar'
import MindfullForm from '../../components/Mindfull/MindfullForm';


class EditPage extends Component {

    render() {
        const { title, journal, goals, songName, moodRating, id } = this.props.location.state
        return (
            <>
                <NavBar user={this.props.user} handleLogout={this.props.handleLogout} />
                <MindfullForm user={this.props.user} editTitle={title} editJournal={journal} editGoals={goals} editSongName={songName} editMoodRating={moodRating} id={id} />
            </>
        )
    }
}
export default EditPage; 