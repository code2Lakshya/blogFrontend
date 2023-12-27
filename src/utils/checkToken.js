

export const checkToken = () => {
    if (localStorage.getItem('token'))
        return true;
    return false;
}

export const changeLocalStorage = (task, payload = null) => {
    if (task === 'remove') {
        localStorage.clear();
    }
    else {
        localStorage.setItem('token', payload.token);
        localStorage.setItem('user', JSON.stringify({username: payload.username, profile_pic: payload.profile_pic}));
    }
}