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
let schema_field = [
    'name',
    'latitude',
    'longtitude',
    'phone',
    'artist',
    'status'
];

let schema_type = [
    'string',
    'string',
    'string',
    'integer',
    'string',
    'string'
];

const styles = {
    appBar: {
        position: 'relative'
    },
    flex: {
        flex: 1
    }
};
const margin = {
    margin: '15px'
}
function Transition(props) {
    return <Slide direction="up" {...props}/>;
}

class AddButton extends React.Component {
    state = {
        open: false,
        obj: schema.reduce((a, b) => {
            a[b] = '';
            return a;
        }, {})
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});

    };

    handleAdd = a => {
        this.props.clickEvent(a);
        this.setState({
            open: false,
            obj: schema.reduce((a, b) => {
                a[b] = '';
                return a;
            }, {})
        });
    }
    handleInputChange = e => {
        let prop = e.target.id
        //Validation
        //For integer
        // if (e.target.value.slice(-1).match(/^[+-]?\d+$/)){
        //     e.target.value = e.target.value.substring(0, e.target.value.length - 1)
        // }
        //For double
        // if (e.target.value.slice(-1).match(/^[+-]?\d+(\.\d+)?$/)){
        //     e.target.value = e.target.value.substring(0, e.target.value.length - 1)
        // }

        let newData = e.target.value;
        let newObj = this.state.obj;
        newObj[prop] = newData;
        this.setState({obj: newObj})
        // document.getElementById('code').innerText = e.target.value;
    }
    generateInput = (a, b, i) => {
        //add type
        return <Grid item={true} lg={7} xs={12} key={`gi-${i}`}><TextField key={`tf-${i}`} id={a.field} label={a.charAt(0).toUpperCase() + a.slice(1)} type="" margin="normal" style={{
                width: '50%',
                marginLeft: '25%'

            }} onChange={this.handleInputChange
}/></Grid>

    }
    generateForm = _ => {

        //need to be modified
        return this.props.schema.map((a, i) => {
            // console.log(a);
<<<<<<< HEAD
            return this.generateInput(a.name, a.type, i);
=======

            return this.generateInput(a, i);
>>>>>>> 309471b3c6cc087c113989b898c1f631f3cda661
        })
    }
    render() {
        const {classes} = this.props;

        return (<div style={margin}>
            <Button variant="contained" color="primary" aria-label="Add" className={classes.button} onClick={this.handleClickOpen}>
                <AddIcon/>
                Add
            </Button>

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
                    <Grid container={true} alignItems="center" justify="center">
                        {/* <Grid item="item" xs={7}> */}
                        {this.generateForm()}
                        {/* <Grid item="item" xs={7}> */}
                        {/* </Grid> */}

                    </Grid>
                    <Grid container={true} alignItems="center" justify="center">

                        <code id="code">{JSON.stringify(this.state.obj)}</code>
                    </Grid>
                </DialogContent>
                {/* <List>
                    <ListItem button={true}>
                        <ListItemText primary="Phone ringtone" secondary="Titania"/>
                    </ListItem>
                    <Divider/>
                    <ListItem button={true}>
                        <ListItemText primary="Default notification ringtone" secondary="Tethys"/>
                    </ListItem>
                </List> */
                }
            </Dialog>

        </div>);
    }
}

AddButton.propTypes = {
    classes: PropTypes.object.isRequired,
    clickEvent: PropTypes.func.isRequired
};

export default withStyles(styles)(AddButton);
