

exports.getToken = () => {
    return localStorage.getItem('jwt')
}

exports.setToken = (jwt) => {
    localStorage.setItem('jwt', jwt)
}

exports.getUser = () => {
    return localStorage.getItem('user')
}

exports.setUser = (user) => {
    localStorage.setItem('user', user)
}