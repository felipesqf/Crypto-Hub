import axios from 'axios';

export const registerUser = (userData) => {
    // console.log(userData);
    return axios.post('/api/register', {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
    });
};

export const loginUser = (userData) => {
    // console.log(userData);
    return axios.post('/api/login', {
        email: userData.email,
        password: userData.password,
    });
};

export const getUsers = () => {
    return axios.get('/api/displayusers').then((res) => res.data);
};

export const getUser = (p) => {
    return axios.get('/api/profile', p).then((res) => res.data)
};

export const addFav = (userData) => {
    console.log(userData)
    return axios.put('/api/addFav',{
        coin: userData.coin[0].name,
        email: userData.email,
    }
   ).then((res) => res.data);
};
export const addPort = (userData) => {
    console.log(userData)
    return axios.put('/api/addPort',{
        coin: userData.coin,
        amount: userData.amount,
        email: userData.email,
    }
   ).then((res) => console.log(res.data));
};

