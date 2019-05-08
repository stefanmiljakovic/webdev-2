import * as React from 'react';
import Navigation from "../components/base/navigation";
import {
    Route,
    BrowserRouter
} from "react-router-dom";

import Login, {LinkedLogin} from "../routes/login";
import Register, {LinkedRegister} from "../routes/register";
import {connect, Provider} from "react-redux";
import {store} from "../config";
import Home, {LinkedHome} from "../routes/home";
import {UserInterfaceTokened} from "../reducers/models/users";
import {RootStateInterface} from "../reducers/root";
import {applyUserToken} from "../actions/user-actions";
import {LinkedMakeQuestion} from "../routes/make-question";
import {LinkedSnackbar} from "../components/base/snackbar";
import {LinkedUserProfile} from "../routes/user-profile";
import {LinkedQuestionView} from "../routes/question-view";
import {LinkedHotView} from "../routes/hot-view";

interface Props {
    user: UserInterfaceTokened
    applyToken: (token) => void;
}

export default class Default extends React.Component<Props, {}> {

    constructor(props) {
        super(props);
        const localToken = localStorage.getItem('token');
        this.props.applyToken(localToken ? localToken : '');
    }


    render() {
        return (
            <BrowserRouter>
                <Navigation/>
                <Route exact path="/login" component={LinkedLogin}/>
                <Route exact path="/register" component={LinkedRegister}/>
                <Route exact path="/" component={LinkedHome}/>
                <Route exact path="/hot" component={LinkedHotView}/>
                <Route exact path="/make-question" component={LinkedMakeQuestion}/>
                <Route path="/user/:id" component={LinkedUserProfile}/>
                <Route path="/question/:id" component={LinkedQuestionView}/>
                <LinkedSnackbar />
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state: RootStateInterface) => {
      return {
          user: state.users.activeUser
      }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    applyToken: (token) => dispatch(applyUserToken(token))
});

export const DefaultLinked = connect(mapStateToProps, mapDispatchToProps)(Default);