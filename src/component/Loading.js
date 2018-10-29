import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2
    }
});

/**
 * Loading class that creates loading animation
 * @param       {[type]} props [description]
 * @constructor
 */
function Loading(props) {
    const {classes} = props;
    return (<div>
        <CircularProgress className={classes.progress} size={50}/>
    </div>);
}

Loading.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
