import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://frontend-test-assignment-api.abz.agency/api/v1',
    timeout: 10000
});
instance.interceptors.response.use(
    config => config,
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.log(`A timeout happend on url ${error.config.url}`)
        }
        return Promise.reject(error);
    },
); 

export default instance;