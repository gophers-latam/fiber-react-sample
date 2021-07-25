import {/*combineReducers,*/ createStore} from 'redux';
import {userReducers} from "./reducers/userReducers";

/*const reducers=combineReducers({
    users: userReducers,
});*/

export const configStore= () => {
    return createStore(userReducers);
}