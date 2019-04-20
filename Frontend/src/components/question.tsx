import * as React from "react";
import {Model} from "../models/models";
import QuestionInterface = Model.QuestionInterface;
import {Card, CardContent, Typography} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

interface Props {
    model: QuestionInterface
    classes: any
}

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class Question extends React.Component<Props, {}>
{
    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        const {classes, model} = this.props;
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h3">
                        {model.title}
                    </Typography>
                    <Typography variant="h6">
                        {model.description}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

}

export default withStyles(styles)(Question);