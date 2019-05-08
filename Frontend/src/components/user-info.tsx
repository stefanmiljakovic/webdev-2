import * as React from "react";
import {Typography} from "@material-ui/core";
import {Model} from "../models/models";
import UserInterface = Model.UserInterface;
import {activeUserDefault} from "../reducers/models/users";
import Axios from "axios";
import {CRUD_ROOT} from "../config";
import {TypographyClassKey} from "@material-ui/core/Typography";
import {ThemeStyle} from "@material-ui/core/styles/createTypography";

interface Props {
    id: string
    variant?: ThemeStyle
}

interface State {
    user: UserInterface
}

export default class UserInfo extends React.Component<Props, State> {

    static defaultProps = {
        variant: "body2"
    };

    constructor(props) {
        super(props);
        this.state = {
            user: activeUserDefault
        }
    }

    componentDidMount(): void {
        Axios.get(`${CRUD_ROOT}/user?id=${this.props.id}`).then(response => {
            this.setState({
                ...this.state,
                user: response.data
            });
        });
    }

    render(): React.ReactNode {
        const {user} = this.state;
        return (
            <Typography variant={this.props.variant}>
                User: {user.username} - ({user.email})
            </Typography>
        );
    }

}
