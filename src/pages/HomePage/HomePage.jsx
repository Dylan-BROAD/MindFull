import NavBar from "../../components/NavBar/NavBar";
import MindfullForm from "../../components/Mindfull/MindfullForm";

const HomePage = (props) => {
    let homepage = props.user ?
        <div>
            <MindfullForm user={props.user} />

        </div>
        :
        <></>
    return (
        <div>
            <NavBar user={props.user} handleLogout={props.handleLogout} />
            {homepage}
        </div>
    )
}

export default HomePage