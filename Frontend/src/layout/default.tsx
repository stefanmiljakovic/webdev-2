import * as React from 'react';
import Navigation from "../components/base/navigation";
import {
    Route,
    BrowserRouter
} from "react-router-dom";

import Login, {LinkedLogin} from "../routes/login";
import Register from "../routes/register";
import {Provider} from "react-redux";
import {store} from "../config";
import Home from "../routes/home";

export default class Default extends React.Component<{}, {}> {
    render() {
        return (
            <BrowserRouter>
                <Navigation/>
                <Route path="/login" component={LinkedLogin}/>
                <Route path="/register" component={Register}/>
                <Route path="/home" component={Home}/>
            </BrowserRouter>
        );
    }
}
