import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
const styles = {
    root: {
        width: "1vw",
        bottom: 0,
        position: "absolute"
    }
};

class Footer extends React.Component {
    state = {
        value: 'recents'
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        return (<BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>

                <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />}/>
                <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />}/>
                <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />}/>
                <BottomNavigationAction label="Folder" value="folder" icon={<Icon> folder</Icon>}/>


        </BottomNavigation>);
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
