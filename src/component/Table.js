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
import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';
import AddButton from './AddButton';
import UploadButton from './UploadButton';
import Grid from '@material-ui/core/Grid';
import Loading from './Loading';
import Edit from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
let counter = 0;
let schema = [
    {
        field: 'name',
        type: 'string',
        required: true
    }, {
        field: 'latitude',
        type: 'string',
        required: true
    }, {
        field: 'longitude',
        type: 'string',
        required: true
    }, {
        field: 'phone',
        type: 'integer',
        required: false
    }, {
        field: 'artist',
        type: 'string',
        required: false
    }, {
        field: 'e-mail',
        type: 'email',
        required: false
    }
];
function createData(arg, schema) {
    let obj = {}
    schema.forEach((e, i) => {
        obj[e] = arg[i]
    })
    obj.id = ++counter;
    return obj;
}
function objToArray(obj) {
    let arr = [];
    for (let val in obj) {
        arr.push(val);
    }

    return arr;
}
function encode(schema) {
    return schema.split('_').map(a => a[0].toUpperCase() + a.substring(1)).join('%20') + '.json';
}

// DATA

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
    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            data: [
                // createData([
                //     'BCIT',
                //     123,
                //     123,
                //     '604-123-1234',
                //     'BCIT',
                //     'Open'
                // ]),  CHANGE DATA CREATED HERE
            ],
            page: 0,
            rowsPerPage: 5,
            items: {},
            isLoaded: false
        };
        this.timer = null;
    }
    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    componentDidMount() {
        let url = 'https://raw.githubusercontent.com/OpendataDeveloperNetwork/oden-schemas/master/schemas/' + encode(this.props.match.params.schema);
        fetch(url).then(res => res.json()).then((result) => {
            this.timer = setTimeout(() => this.setState({isLoaded: true, items: result}), 900);
        }, (error) => {
            this.setState({isLoaded: true, error});
        })
    }

    rows = _ => objToArray(this.state.items.properties).map((e, i) => {
        return {
            id: e,
            numeric: false,
            disablePadding: i === 0
                ? true
                : false,
            label: e.toUpperCase()
        }
    })
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
        return objToArray(this.state.items.properties).map((e, i) => {
            return this.generateTableCell(obj[e], i);
        })
    }
    handleAddButton = a => {

        let newData = this.state.data;
        a = JSON.parse(a);
        let arr = [];
        for (let val in a) {
            arr.push(a[val])
        }

        newData.push(createData(arr, objToArray(this.state.items.properties)))
        this.setState({data: newData})
    }
    handleUpload = a => {
        let data = JSON.parse(a);
        let newData = this.state.data;
        data.forEach(el => {
            el.id = ++counter;
            newData.push(el);
        })
        this.setState({data: newData})
    }

    download = () => {
        let downloadData = this.state.data.map(a => {
            delete a.id;
            return a;

        });
        function download(filename, text) {
            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }
        let text = JSON.stringify(downloadData);
        let filename = "data.json";
        download(filename, text);

    }
    render() {

        const {classes} = this.props;
        const {data, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        if (!this.state.isLoaded) {
            return (<Grid container={true} spacing={8} direction="column" alignItems="center" justify="center"><Loading/></Grid>)
        }
        return (<div>

            <Grid container={true} spacing={8} justify="space-between">
                <Grid item={true}>
                    <AddButton className="add-button" clickEvent={this.handleAddButton} schema={objToArray(this.state.items.properties)}/>
                </Grid>
                <Grid item={true}>
                    <UploadButton uploadFile={this.handleUpload}/>
                </Grid>
            </Grid>

            <Paper className={classes.root}>
                <TableToolbar numSelected={selected.length} schema={this.props.match.params.schema} delete={() => {
                        let newData = data.filter((a, b) => {
                            return selected.indexOf(a.id) === -1;
                        })
                        this.setState({data: newData, selected: []})
                    }} download={this.download}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <TableHeader numSelected={selected.length} onSelectAllClick={this.handleSelectAllClick} rowCount={data.length} rows={this.rows()}/>
                        <TableBody>
                            {
                                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (<TableRow hover={true} onClick={event => this.handleClick(event, n.id)} role="checkbox" aria-checked={isSelected} tabIndex={-1} key={n.id} selected={isSelected}>
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={isSelected}/>

                                        </TableCell>
                                        {/* <TableCell padding="checkbox">
                                            <Button><Edit/></Button>
                                        </TableCell> */}

                                        {this.generateTableData(n)}
                                    </TableRow>);
                                })
                            }
                            {
                                emptyRows > 0 && (<TableRow style={{
                                        height: 49 * emptyRows
                                    }}>
                                    <TableCell colSpan={Object.keys(this.state.items.properties).length + 1}/>
                                </TableRow>)
                            }
                        </TableBody>
                    </Table>
                </div>

                <CustomPagination component="div" className="tablePagination" count={data.length} rowsPerPage={rowsPerPage} page={page} backIconButtonProps={{
                        'aria-label' : 'Previous Page'
                    }} nextIconButtonProps={{
                        'aria-label' : 'Next Page'
                    }} onChangePage={this.handleChangePage} onChangeRowsPerPage={this.handleChangeRowsPerPage}/>

            </Paper>
        </div>);
    }
}
const CustomPagination = withStyles({
    actions: {
        marginLeft: 0
    }
})(TablePagination);

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);
