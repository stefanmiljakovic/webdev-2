import * as React from "react";
import {IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {RootStateInterface} from "../../reducers/root";
import {connect} from "react-redux";
import {messageClose} from "../../actions/snackbar-actions";
import Snackbar from "@material-ui/core/Snackbar";
import {CSSProperties} from "react";
import SnackbarContent from "@material-ui/core/SnackbarContent";

interface Props {
    message: string
    open: boolean
    error: boolean
    close: () => void
}

class SimpleSnackbar extends React.Component<Props, {}> {

    getStyle = (): CSSProperties => {
        if(this.props.error)
            return {backgroundColor: "#d32f2f"}
        return {backgroundColor: "#43a047"}
    };
    render = (): React.ReactNode => {
        return (
            <Snackbar
                anchorOrigin={{
                    horizontal: "right",
                    vertical: "bottom"
                }}
                open={this.props.open}
                autoHideDuration={4000}
                onClose={this.closeNotification}
            >
                <SnackbarContent
                    style={this.getStyle()}
                    message={<span>{this.props.message}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.closeNotification}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                >
                </SnackbarContent>
            </Snackbar>
        )
    };

    closeNotification = () => {
        this.props.close();
    }
}

const mapStateToProps = (state: RootStateInterface) => {
    return {
        message: state.snackbar.message,
        open: state.snackbar.open,
        error: state.snackbar.error
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    close: () => dispatch(messageClose())
});

export const LinkedSnackbar = connect(mapStateToProps, mapDispatchToProps)(SimpleSnackbar);