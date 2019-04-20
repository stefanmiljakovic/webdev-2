import AbstractPolicy from "../base/AbstractPolicy";
import {QuestionType} from "../model/QuestionModel";
import {UserModel, UserType} from "../model/UserModel";

export default class QuestionPolicy extends AbstractPolicy<QuestionType>
{
    create(manipulator?: UserType): Promise<any> {
        return new Promise<any>((resolve, reject) => {
           UserModel.findById(manipulator._id).exec().then(
               value => {
                   resolve();
               }
           ) .catch(reason => {
               reject('Permission Denied');
           })
        });
    }

    destroy(manipulator: UserType, target?: QuestionType): Promise<any> {
        return new Promise<any>((resolve, reject) => {
           if(manipulator._id.equals(target.user))
               resolve();
           else
               reject('Permission Denied');
        });
    }

    read(manipulator: UserType, target?: QuestionType): Promise<any> {
        return new Promise<any>((resolve, reject) => {
           resolve();
        });
    }

    update(manipulator: UserType, target?: QuestionType): Promise<any> {
        return new Promise<any>((resolve, reject) => {
           if(manipulator._id.equals(target.user))
               resolve();
           else
               reject('Permission Denied');
        });
    }

}