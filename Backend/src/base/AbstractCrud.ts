import AbstractController from "./AbstractController";
import CrudInterface, {ExpressCallback} from "../interface/CrudInterface";

export default abstract class AbstractCrud extends AbstractController implements CrudInterface
{
    abstract create: ExpressCallback;
    abstract destroy: ExpressCallback;
    abstract read: ExpressCallback;
    abstract update: ExpressCallback;

    protected initializeRoutes(): void {
        this.router.route(this.getPath())
            .post((req, res, next) => this.create(req, res, next))
            .delete((req, res, next) => this.destroy(req, res, next))
            .get((req, res, next) => this.read(req, res, next))
            .patch((req, res, next) => this.update(req, res, next));
    }
}