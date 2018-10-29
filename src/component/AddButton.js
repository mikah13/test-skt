import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

/**
 * Set Style for the Button
 * @type {Object}
 */
const styles = {
    appBar: {
        position: 'relative'
    },
    flex: {
        flex: 1
    }
};
const margin = {
    margin: '0 0 0 0 '
}

/**
 * Transition for opening the modal
 * @param       {[type]} props [description]
 * @constructor
 */
function Transition(props) {
    return <Slide direction="up" {...props}/>;
}

/**
 * Class AddButton
 * @extends React
 */
class AddButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            obj: this.props.schema.reduce((a, b) => {
                a[b] = '';
                return a;
            }, {})
        };
    }

    /**
     * Click event will open the modal.
     * @return {[function]} Set open state to true
     */
    handleClickOpen = () => {
        this.setState({open: true});
    };

    /**
     * Close event will close the modal.
     * @return {[function]} Set open state to false
     */
    handleClose = () => {
        this.setState({
            open: false,
            obj: this.props.schema.reduce((a, b) => {
                a[b] = "";
                return a;
            }, {})
        });

    };

    /**
     * [handleAdd description]
     * @param  {[type]} a [description]
     * @return {[type]}   [description]
     */
    handleAdd = a => {
        this.props.clickEvent(a);
        this.setState({open: false,obj: this.props.schema.reduce((a, b) => {
            a[b] = "";
            return a;
        }, {})});
    }

    /**
     * Live Update feature
     * @param  {[type]} e
     * @return {[function]}  Live update of input data
     */
    handleInputChange = e => {
        let prop = e.target.id

        // Incompleted Validation Feature
        if (e.target.name === "integer") {
            if (!e.target.value.slice(-1).match(/^[+-]?\d+$/)) {
                e.target.value = e.target.value.substring(0, e.target.value.length - 1)
            }
        }

        //For double (number)
        if (e.target.name === "number") {
            if (!e.target.value.slice(-1).match(/^[+-]?\d+(\.\d+)?$/)) {
                e.target.value = e.target.value.substring(0, e.target.value.length - 1)
            }
        }

        //For email
        // if (e.target.name == "email"){
        //     if (e.target.value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        //         validation = true;
        //     } else {
        //         validation = false;
        //     }
        // }

        //For required
        // if (e.target.required){
        //     if (e.target.value != ""){
        //         validation = true;
        //     } else {
        //         validation = false;
        //     }
        // }

        let newData = e.target.value;
        let newObj = this.state.obj;
        newObj[prop] = newData;

        this.setState({obj: newObj})
    }

    /**
     * Generate input rows and labels for every single field
     * @param  {[type]} a item label
     * @param  {[type]} i index
     * @return {[Grid]}  Grid item
     */
    generateInput = (a, i) => {
        return <Grid item={true} lg={7} xs={12} key={`gi-${i}`}><TextField key={`tf-${i}`} id={a} label={a} type="" margin="normal" style={{
                width: '50%',
                marginLeft: '25%'
            }} onChange={this.handleInputChange
}/></Grid>

    }

    /**
     * Generate the entire form
     * @param  {[type]} _ [description]
     * @return {[type]}   [description]
     */
    generateForm = _ => {
        return this.props.schema.map((a, i) => {
            return this.generateInput(a, i);

        })
    }

    /**
     * Render main function
     * @return {[type]} [description]
     */
    render() {
        const {classes} = this.props;
        return (<div style={margin}>
            {/**
             * This part will render a Button
             * @type {String}
             */
            }
            <Tooltip title="Add New">
                <Button variant="contained" color="primary" aria-label="Add" className={classes.button} onClick={this.handleClickOpen}>
                    <AddIcon/>
                    Add
                </Button>
            </Tooltip>

            {
                /**
                 * This part will render the dialog that can be toggled
                 * @type {Object}
                 */
            }
            <Dialog fullScreen={true} open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            New Entry
                        </Typography>
                        <Button color="inherit" onClick={() => this.handleAdd(document.getElementById('code').innerText)}>
                            Add
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <Grid container={true} justify="center">
                        <Grid item={true} xs={6}>
                            {this.generateForm()}
                        </Grid>
                        <Grid item={true} xs={5}>
                            <pre id="code">{JSON.stringify(this.state.obj,undefined,4).split(',').join(',\n')}</pre>
                        </Grid>
                    </Grid>

                </DialogContent>
            </Dialog>

        </div>);
    }
}

AddButton.propTypes = {
    classes: PropTypes.object.isRequired,
    clickEvent: PropTypes.func.isRequired
};

/**
 * Export Add Button. End of the class
 */
export default withStyles(styles)(AddButton);
