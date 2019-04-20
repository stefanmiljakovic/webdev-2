import "./styles/main.scss";

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Default from './layout/default';
import {store} from "./config";
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <Default />
    </Provider>, document.getElementById('app'));

