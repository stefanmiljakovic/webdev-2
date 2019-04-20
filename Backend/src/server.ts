import 'dotenv/config';
import App from "./app";
import TestController from "./controller/api/TestController";
import UserCrud from "./controller/crud/UserCrud";
import AuthController from "./controller/api/AuthController";
import QuestionCrud from "./controller/crud/QuestionCrud";
import QuestionController from "./controller/api/QuestionController";
import AnswerCrud from "./controller/crud/AnswerCrud";
import AnswerController from "./controller/api/AnswerController";
import UserController from "./controller/api/UserController";

const {
    PORT
} = process.env;

console.log(PORT);

const app = new App(
    [
        new QuestionController(),
        new AuthController(),
        new QuestionController(),
        new AnswerController(),
        new UserController()
    ],
    [
        new UserCrud(),
        new QuestionCrud(),
        new AnswerCrud()
    ],
    Number(PORT)
);

app.listen();