import * as React from "react";
import {RootStateInterface} from "../reducers/root";
import {connect} from "react-redux";

interface Props {

}

export default class MakeQuestion extends React.Component<Props, {}> {

}

const mapStateToProps = (state: RootStateInterface) => {
    return {

    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export const LinkedMakeQuestion = connect(mapStateToProps, mapDispatchToProps)(MakeQuestion);