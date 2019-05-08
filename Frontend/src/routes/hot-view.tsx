import * as React from "react";
import {Paper, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Model} from "../models/models";
import {LinkedQuestion} from "../components/question";
import {connect} from "react-redux";
import {RootStateInterface} from "../reducers/root";
import {loadHotQuestions, loadQuestions} from "../actions/question-actions";
import QuestionInterface = Model.QuestionInterface;
import {ChangeEvent} from "react";

interface Props {
    questions: QuestionInterface[]
    fetch: () => void;
}

interface State {
    searchString: string
}

export default class HotView extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.props.fetch();
        this.state = {
            searchString: ''
        }
    }


    item = () => {
        const questions = this.searchFilter();
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

    searchFilter = () => {
        const data = this.props.questions;

        if(this.state.searchString === '')
            return data;

        return data.filter(value => {
            return value.tags.indexOf(this.state.searchString) !== -1;
        });
    };

    searchChange = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;

        this.setState({
            ...this.state,
            searchString: value
        });
    };

    render(): React.ReactNode {
        return (
            <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
                <TextField
                    id="search"
                    label="Search"
                    placeholder="Enter to search"
                    name="search"
                    margin="normal"
                    type="text"
                    onChange={this.searchChange}
                />
                {this.item()}
            </Grid>
        );
    }
}

const mapStateToProps = (state: RootStateInterface) => {
    return {
        questions: state.questions.hotQuestions.questions
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetch: () => dispatch(loadHotQuestions())
});

export const LinkedHotView = connect(mapStateToProps, mapDispatchToProps)(HotView);