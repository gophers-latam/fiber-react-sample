/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import {Dispatch, useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {User} from "../models/user";
import {setUser} from "../redux/actions/userActions";
import Menu from "./Menu";
import Nav from "./Nav";

const Wrapper = (props: any) => {
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get('user');
                props.setUser(new User(
                    data.user_id,
                    data.first_name,
                    data.last_name,
                    data.email,
                    data.role
                ));                
            } catch (error) {
                setRedirect(true);
            }
            
        })()
    }, [])
    
    if (redirect) {
        return <Redirect to={'/login'}/>
    }    

    return (
    <>
    <Nav />
    <div className="container-fluid">
        <div className="row">
            <Menu />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                {props.children}
            </main>
        </div>
    </div>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);