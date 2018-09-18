import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import OutputTableHead from './OutputTableHead';
import OutputTableToolbar from './OutputTableToolbar';
import AddButton from './AddButton';
import UploadButton from './UploadButton';
let counter = 0;
let schema = [
    'name',
    'latitude',
    'longtitude',
    'phone',
    'artist',
    'status'
];
let dataObj = []
// CREATE DATA BASE ON SCHEMA
function createData(...arg) {
    let obj = {}
    schema.forEach((e, i) => {
        obj[e] = arg[i]
    })
    obj.id = ++counter;
    dataObj.push(obj);
    return obj;
}
// DATA

const rows = schema.map((e, i) => {
    return {
        id: e,
        numeric: false,
        disablePadding: i === 0
            ? true
            : false,
        label: e.toUpperCase()
    }
})
function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0)
            return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3
    },
    table: {
        minWidth: 1020
    },
    tableWrapper: {
        overflowX: 'auto'
    }
});

class EnhancedTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: schema[0],
        selected: [],
        data: [
            createData('BCIT', 123, 123, '604-123-1234', 'BCIT', 'Open'), // CHANGE DATA CREATED HERE
            createData('SFU', 123, 123, '604-123-1234', 'SFU', 'Open'),
            createData('UBC', 123, 123, '604-123-1234', 'UBC', 'Closed'),
            createData('Douglas', 123, 123, '604-123-1234', 'Douglas', 'Open'),
            createData('Langara', 123, 123, '604-123-1234', 'Langara', 'Closed')
        ],
        page: 0,
        rowsPerPage: 5
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({
                selected: state.data.map(n => n.id)
            }));
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1),);
        }

        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    generateTableCell = (a, b) => {
        return <TableCell numeric={false} key={b}>{a}</TableCell>
    };
    generateTableData = obj => {
        return schema.map((e, i) => {
            return this.generateTableCell(obj[e], i);
        })
        // console.log(n);
        // for(let val in n){
        //
        // }
    }
    handleAddButton = a => {
        console.log(a);
        let newData = this.state.data;
        newData.push(createData('UVIC', 123, 123, '604-123-1234', 'UVIC', 'Closed'))
        this.setState({data: newData})
    }
    render() {
        const {classes} = this.props;
        const {
            data,
            order,
            orderBy,
            selected,
            rowsPerPage,
            page
        } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (<div>
            <UploadButton/>
            <Paper className={classes.root}>
                <OutputTableToolbar numSelected={selected.length}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <OutputTableHead numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={this.handleSelectAllClick} onRequestSort={this.handleRequestSort} rowCount={data.length} rows={rows}/>
                        <TableBody>
                            {
                                stableSort(data, getSorting(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                    const isSelected = this.isSelected(n.id);

                                    return (<TableRow hover={true} onClick={event => this.handleClick(event, n.id)} role="checkbox" aria-checked={isSelected} tabIndex={-1} key={n.id} selected={isSelected}>
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={isSelected}/>
                                        </TableCell>
                                        {this.generateTableData(n)}
                                    </TableRow>);
                                })
                            }
                            {
                                emptyRows > 0 && (<TableRow style={{
                                        height: 49 * emptyRows
                                    }}>
                                    <TableCell colSpan={6}/>
                                </TableRow>)
                            }
                        </TableBody>
                    </Table>
                </div>

                <TablePagination component="div" count={data.length} rowsPerPage={rowsPerPage} page={page} backIconButtonProps={{
                        'aria-label' : 'Previous Page'
                    }} nextIconButtonProps={{
                        'aria-label' : 'Next Page'
                    }} onChangePage={this.handleChangePage} onChangeRowsPerPage={this.handleChangeRowsPerPage}/>

            </Paper>
            <AddButton clickEvent={this.handleAddButton} schema={schema}/></div>);
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);
