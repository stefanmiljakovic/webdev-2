import * as React from "react";
import {TextField, Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Model} from "../models/models";
import QuestionInterface = Model.QuestionInterface;
import Question from "../components/question";
import {connect} from "react-redux";

interface Props {
    questions: QuestionInterface[]
}

class Home extends React.Component<Props, {}> {

    login = () => {};

    item = () => {
        const {questions} = this.props;
        return (
          <Grid item xs={10}>
              {questions.map(value => (
                  <Question model={value} />
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

function mapStateToProps(state){
    return {
        questions: state.questions
    }
}

export default connect(mapStateToProps)(Home);