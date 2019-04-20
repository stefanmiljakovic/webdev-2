import Axios from 'axios';
import {API_ROOT} from '../config';
import {Model} from '../models/models';
import LoginResponse = Model.LoginResponse;

export const userLogin = async (username: string, email: string, password: string) => {
    try {
        const response: any = Axios.post(`localhost:5000/api/auth/login`, {
            username: 'user_3',
            /*email: email,*/
            password: 'UserTest3'
        }).then(value => {
            console.log('hello');
        }).catch(reason => {
            console.log('kme');
        });

        console.log(response);
        return 'lel';
    } catch (e) {
        throw e;
    }

};
