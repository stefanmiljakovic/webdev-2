import AbstractController from "../../base/AbstractController";

export default class TestController extends AbstractController {

    getPath() {
        return '/test';
    }

    protected initializeRoutes(): void {
        this.router.get('/test', (request, response) => {
            response.send('Test success');
        });
    }
}