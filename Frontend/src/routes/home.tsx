import * as React from "react";
import {TextField, Button, Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Model} from "../models/models";
import QuestionInterface = Model.QuestionInterface;
import Question, {LinkedQuestion} from "../components/question";
import {connect} from "react-redux";
import {RootStateInterface} from "../reducers/root";
import {loadQuestions} from "../actions/question-actions";

interface Props {
    questions: QuestionInterface[]
    fetch: () => void;
}

export default class Home extends React.Component<Props, {}> {

    constructor(props) {
        super(props);
        this.props.fetch();
    }


    item = () => {
        const {questions} = this.props;
        return (
            <Grid item xs={10}>
                {questions.map(value => (
                    <div style={{margin: "20px 0"}} key={'q_' + value._id}>
                        <Paper>
                            <LinkedQuestion model={value}/>
                        </Paper>
                    </div>
                ))}
            </Grid>
        );
    };

    render(): React.ReactNode {
        return (
            <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
                {this.item()}
            </Grid>
        );
    }
}

const mapStateToProps = (state: RootStateInterface) => {
    return {
        questions: state.questions.allQuestions.questions
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetch: () => dispatch(loadQuestions())
});

export const LinkedHome = connect(mapStateToProps, mapDispatchToProps)(Home);