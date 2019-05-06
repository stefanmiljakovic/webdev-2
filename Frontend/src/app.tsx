import "./styles/main.scss";

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Default, {DefaultLinked} from './layout/default';
import {setAuthToken, store} from "./config";
import {Provider} from "react-redux";
import {applyUserToken} from "./actions/user-actions";

ReactDOM.render(
    <Provider store={store}>
        <DefaultLinked />
    </Provider>, document.getElementById('app'));

