//Inicializamos el usuario a partir del token guardado en LocalStorage
import jwtDecode from 'jwt-decode'

const user = JSON.parse(localStorage.getItem("token-test"));
// const userDecoded = token ? jwtDecode(token) : {}

//cada reducer tiene su propio state
const initialState = {
    user: user ? user.user : {},
    error: null,
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {

        case 'SET_AUTH':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}
