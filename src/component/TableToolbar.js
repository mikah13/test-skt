import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import FilterListIcon from '@material-ui/icons/FilterList';

/**
 * Style Setting for TableToolbar
 * @param  {[type]} theme [description]
 * @return {[type]}       [description]
 */
const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit
    },
    highlight: theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
        },
    spacer: {
        flex: '1 1 100%'
    },
    actions: {
        color: theme.palette.text.secondary
    },
    title: {
        flex: '0 0 auto'
    }
});

/**
 * Class TableToolbar. This contains SchemaTitle and Delete Button.
 * @extends React
 */
class TableToolbar extends React.Component {
    render() {
        const {numSelected, classes} = this.props;
        return (<Toolbar className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0
            })}>
            <div className={classes.title}>
                {
                    numSelected > 0
                        ? (<Typography color="inherit" variant="subheading">
                            {`${numSelected} `}
                            selected
                        </Typography>)
                        : (<Typography variant="title" id="tableTitle">
                            {this.props.schema.split('_').join(' ').toUpperCase()}
                        </Typography>)
                }
            </div>
            <div className={classes.spacer}/>
            <div className={classes.actions}>
                {
                    numSelected > 0
                        ? (<Tooltip title="Delete">
                            <IconButton aria-label="Delete">
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>)
                        : (<Tooltip title="Filter list">
                            <IconButton aria-label="Filter list">
                                <FilterListIcon/>
                            </IconButton>
                        </Tooltip>) // SET PROP AS OBJECT BASED ON DATA SCHEMA
                }
            </div>
        </Toolbar>);
    }
}
TableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired
};

export default withStyles(toolbarStyles)(TableToolbar);
