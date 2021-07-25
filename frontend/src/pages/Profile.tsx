import axios from "axios";
import {Dispatch, SyntheticEvent, useEffect, useState} from "react";
import {connect} from "react-redux";
import {setUser} from "../redux/actions/userActions";
import Wrapper from "../components/Wrapper";
import {User} from "../models/user";

const Profile = (props: { user: User, setUser: (user: User) => void }) => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');

    useEffect(() => {
        setFirstName(props.user.first_name);
        setLastName(props.user.last_name);
        setEmail(props.user.email);
    }, [props.user]);

    const infoSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const {data} = await axios.put('/update-profile', {
            first_name,
            last_name,
            email
        });

        props.setUser(new User(
            data.user_id,
            data.first_name,
            data.last_name,
            data.email,
            data.role
        ));
    }

    const passwordSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put('/update-password', {
            password,
            password_confirm
        });
    }


    return (
        <Wrapper>
            <h3>Account Information</h3>
            <form onSubmit={infoSubmit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input className="form-control"
                           defaultValue={first_name}
                           onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input className="form-control"
                           defaultValue={last_name}
                           onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input className="form-control"
                           defaultValue={email}
                           onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>

            <h3 className="mt-4">Change Password</h3>
            <form onSubmit={passwordSubmit}>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control"
                           onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Password Confirm</label>
                    <input type="password" className="form-control"
                           onChange={e => setPasswordConfirm(e.target.value)}
                    />
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>            
        </Wrapper>
    )
}

const mapStateToProps = (state: { user: User }) => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);