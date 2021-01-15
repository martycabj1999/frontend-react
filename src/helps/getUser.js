import jwtDecode from 'jwt-decode'

export const getUserHelp = () => {
    let token = JSON.parse(localStorage.getItem("token-test"));

    if (token) {
        const tokenDecoded = jwtDecode(token.access_token)
        return token.user
    }
    return {}

}

