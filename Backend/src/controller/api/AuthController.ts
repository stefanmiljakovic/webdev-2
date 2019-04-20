import AbstractController from "../../base/AbstractController";
import AuthService from "../../middleware/AuthMiddleware";
import {ExpressCallback} from "../../interface/CrudInterface";
import {UserInterface, UserModel} from "../../model/UserModel";

export default class AuthController extends AbstractController {

    login: ExpressCallback = async (request, response, next) => {
        request.checkBody('password').notEmpty();

        try {
            await request.getValidationResult();
            const user: UserInterface = request.body;

            const userAttempt = await UserModel.findOne({
                "$or": [
                    {
                        'email': user.email
                    },
                    {
                        'username': user.username
                    }
                ]
            }).select(['+password']).exec();

            const verification = await userAttempt.verifyPassword(request.body.password);

            if (verification)
                response.send(AuthService.generateToken(userAttempt));
            else
                response.status(401).send("Wrong password");
        }
        catch (e) {
            next(e);
        }
    };

    whoami: ExpressCallback = async (request, response, next) => {
        try {
            const me = await AuthService.authenticate(request, response, next);
            response.send(me);
        } catch (e) {
            next(e);
        }
    };

    getPath(): string {
        return "/auth";
    }

    protected initializeRoutes(): void {
        this.router.route(`${this.getPath()}/login`).post((req, res, next) => {
            this.login(req, res, next);
        });
        this.router.get(`${this.getPath()}/whoami`, (req, res, next) => {
            this.whoami(req, res, next);
        });
    }

}