import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

/**
 * Class TableHeader. This contains title of every columns
 * @extends React
 */
class TableHeader extends React.Component {

    render() {
        const {onSelectAllClick, numSelected, rowCount, rows} = this.props;
        return (<TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox indeterminate={numSelected > 0 && numSelected < rowCount} checked={numSelected === rowCount} onChange={onSelectAllClick}/>
                </TableCell>
                {
                    rows.map(row => {
                        return (<TableCell key={row.id} numeric={row.numeric} padding={'default'}>
                            {row.label}
                        </TableCell>);
                    }, this)
                }
            </TableRow>
        </TableHead>);
    }
}

TableHeader.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired
};

export default TableHeader;
