import axios from "axios";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {User} from "../models/user";

const Nav = (props: { user: User }) => {

    const logout = async() => {
        await axios.post('logout', {});
    }

    const {user} = props;

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="/">Vapor - cyberpunk theme</a>

            <ul className="my-2 my-md-0 mr-md-3">
                <NavLink to="/profile" className="p-2 text-white text-decoration-none">
                    <b>{user.name}</b>
                </NavLink>
                <NavLink to="/login" className="p-2 text-white text-decoration-none"
                onClick={logout}
                >Log out
                </NavLink>
            </ul>
        </nav>
    )
}

const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Nav);