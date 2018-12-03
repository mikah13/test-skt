import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import {lighten} from '@material-ui/core/styles/colorManipulator';
import DownloadIcon from '@material-ui/icons/Archive';
import UndoIcon from '@material-ui/icons/Undo';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
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
                        ? (
                            <Button onClick={() => {
                                    this.props.delete()
                                }}>
                                <DeleteIcon/>
                            </Button>
                        )
                        : (
                            <div style={{textAlign:"right"}}>

                            <Button aria-label="Download" onClick={() => {
                                    this.props.download()
                                }}  color="default">
                                Download <DownloadIcon />
                            </Button>
                            </div>

                    )
                }
            </div>
        </Toolbar>);
    }// <Button aria-label="Download" onClick={() => {
    //         this.props.undo()
    //     }}  color="default">
    //     Undo <UndoIcon />
    // </Button>
}
TableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    delete: PropTypes.func.isRequired,
    download: PropTypes.func.isRequired
};

export default withStyles(toolbarStyles)(TableToolbar);
