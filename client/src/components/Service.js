const url = 'http://127.0.0.1:5000';

const loginUser = async (creds) => {
    return fetch(url+'/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds)
    })
    .then(data => data.json())
};


const deleteUser = async (user) => {
    return fetch(url+'/signout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
    .then(data => data.json())
}

export default {loginUser, deleteUser};