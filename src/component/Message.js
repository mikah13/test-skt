import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

class Message extends React.Component {
    constructor(props) {
       super(props);
       this.handleShowSnackbar = this.handleShowSnackbar.bind(this);
       this.handleTimeoutSnackbar = this.handleTimeoutSnackbar.bind(this);
       this.state = { isSnackbarActive: false };
     }

     handleShowSnackbar() {
       this.setState({ isSnackbarActive: true });
     }
     handleTimeoutSnackbar() {
       this.setState({ isSnackbarActive: false });
     }
     render() {
       const { isSnackbarActive } = this.state;
       return (
         <div>
           <Button raised onClick={this.handleShowSnackbar}>Show a Toast</Button>
           <Snackbar

         open={this.state.isSnackbarActive}

         ContentProps={{
           'aria-describedby': 'message-id',
         }}
         message={<span id="message-id">I love snacks</span>}
       />
         </div>
       );
     }
}
export default Message;
