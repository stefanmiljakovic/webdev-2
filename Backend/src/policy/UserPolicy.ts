import AbstractPolicy from "../base/AbstractPolicy";
import {UserType} from "../model/UserModel";

export default class UserPolicy extends AbstractPolicy<UserType>
{
    create(manipulator?: UserType): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            resolve();
        });
    }

    destroy(manipulator: UserType, target?: UserType): Promise<any> {
        return new Promise<any>((resolve, reject) => {
           if(manipulator._id.equals(target._id))
               resolve();
           else
               reject('Permission Denied');
        });
    }

    read(manipulator: UserType, target?: UserType): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            resolve();
        });
    }

    update(manipulator: UserType, target?: UserType): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if(manipulator._id.equals(target._id))
                resolve();
            else
                reject('Permission Denied');
        });
    }

}