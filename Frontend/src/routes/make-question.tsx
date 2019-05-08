import * as React from "react";
import {RootStateInterface} from "../reducers/root";
import {connect} from "react-redux";
import {Grid, TextField} from "@material-ui/core";
import {ReactTags} from 'react-tag-autocomplete';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeQuestion} from "../actions/question-actions";

interface Props {
    make: (title: string, description: string, tags: string) => void;
}

export default class MakeQuestion extends React.Component<Props, {}> {

    submit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        let current = e.currentTarget;
        let parentForm = current.closest('form');

        let title = (parentForm.querySelectorAll('input#title')[0] as HTMLInputElement).value;
        let description = (parentForm.querySelectorAll('textarea#description')[0] as HTMLInputElement).value;
        let tags = (parentForm.querySelectorAll('input#tags')[0] as HTMLInputElement).value;

        this.props.make(title, description, tags);
    };

    render = (): React.ReactNode => {
        return (
            <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
                <Grid item xs={10}>
                    <Typography variant={'h3'} color={"primary"}>
                        Make Question
                    </Typography>
                    <form>
                        <TextField
                            fullWidth
                            id="title"
                            label="Title"
                            placeholder="Enter Title"
                            name="title"
                            margin="normal"
                            type="text"
                        />
                        <TextField
                            fullWidth
                            multiline={true}
                            rows={4}
                            id="description"
                            label="Description"
                            placeholder="Enter Description"
                            name="description"
                            margin="normal"
                            type="text"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            id="tags"
                            label="Tags"
                            placeholder="Enter Tags, separate by spaces"
                            name="tags"
                            margin="normal"
                            type="text"
                            variant="outlined"
                        />
                        <Button color={"primary"}
                                variant={"contained"}
                                style={{marginLeft: 'auto', display: 'block'}}
                                onClick={this.submit}
                        >
                            Submit
                        </Button>
                    </form>
                </Grid>
            </Grid>
        );
    };
}

const mapStateToProps = (state: RootStateInterface) => {
    return {}
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    make: (title: string, description: string, tags: string) => dispatch(makeQuestion(title, description, tags))
});

export const LinkedMakeQuestion = connect(mapStateToProps, mapDispatchToProps)(MakeQuestion);