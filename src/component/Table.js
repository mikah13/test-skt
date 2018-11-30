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
import Add from './Add';
import UploadButton from './UploadButton';
import Grid from '@material-ui/core/Grid';
import Loading from './Loading';
import Edit from './Edit';
import json_data from '../schemas/Public Art';
import Message from './Message';

let counter = 0;


/**
 * Convert arg based on schem to obj type that work with the table
 * @param  {[type]} arg    [description]
 * @param  {[type]} schema [description]
 * @return {[type]}        [description]
 */
function createData(data, schema, len) {
    let object = schema;
    for(let prop in object){
        object[prop].value = data[prop];
    }
    let newData = {
        id: len,
        properties:object
    }
    return newData;
}

/**
 * Turn an object to an array of data
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function objToArray(obj) {
    let arr = [];
    for (let val in obj) {
        arr.push(val);
    }
    return arr;
}

// function toPropArray(obj){
//     let arr = [];
//     for (let val in obj) {
//         arr.push(obj[val]);
//     }
//     return arr;
// }
/**
 * Encode URL
 * @param  {[type]} schema [description]
 * @return {[type]}        [description]
 */
function encode(schema) {
    return schema.split('_').map(a => a[0].toUpperCase() + a.substring(1)).join('%20') + '.json';
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

/**
 * Class Table
 * @extends React
 */
class EnhancedTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: [],
            data: [
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
            this.timer = setTimeout(() => this.setState({isLoaded: true, items: json_data.items}), 900);
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

    generateTableCell = (a, b,c) => {
        let prop = a.properties[b];
        if(prop.type!=="array" && prop.type!=="object"){
            return <TableCell numeric={false} key={c}>{this.state.data[a.id].properties[b].value}</TableCell>
        }
        return <TableCell numeric={false} key={c}>
        {
            //<Edit clickEvent={this.save} schema={this.state.items} data={a} />
        }
        </TableCell>
    };

    generateTableData = obj => {
        return objToArray(obj.properties).map((e, i) => {
            return this.generateTableCell(obj, e, i);
        })
    }
    delete =  _=> {
        let newData = this.state.data.filter((a, b) => {
            return this.state.selected.indexOf(a.id) === -1;
        })
        newData.forEach((el,idx)=>{
            el.id = idx;
        })
        console.log(this.state.data);
        console.log(newData);
        this.setState({data: newData, selected: []})

    }
    add = a => {

        let newData = this.state.data;
        let copy = JSON.parse(JSON.stringify(this.state.items.properties))
        let len = newData.length;
        newData.push(createData(a, copy, len))
        this.setState({data: newData})

    }

    save = a => {
        let newData = this.state.data;
        newData.forEach(el=>{
            if(el.id === a.id){
                for(let prop in a.properties){
                    el.properties[prop].value = a.properties[prop];
                }
            }
        })

        this.setState({data: newData})
    }

    upload = a => {
        let data = JSON.parse(a);
        let copy = JSON.parse(JSON.stringify(this.state.items.properties))
        let newData = this.state.data;
        let len = newData.length;
        data.forEach(el => {
            newData.push(createData(el,copy,len))
            len++;
        })
        this.setState({data: newData})
    }

    download = () => {
        let data= JSON.parse(JSON.stringify(this.state.data));
        let downloadData = data.map(a => {
             a = a.properties;
            for(let prop in a){

                a[prop] = a[prop].value;
            }
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
        let text = JSON.stringify(downloadData,null,'\t');
        let filename = "data.json";
        download(filename, text);

    }

    render() {
        console.log(this.state.data);
        const {classes} = this.props;
        const {data, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        if (!this.state.isLoaded) {
            return (<Grid container={true} spacing={8} direction="column" alignItems="center" justify="center"><Loading/></Grid>)
        }
        return (<div>

            <Grid container={true} spacing={8} justify="space-between">
                <Grid item={true}>
                    <Add className="add-button" clickEvent={this.add} schema={this.state.items}/>
                </Grid>
                <Grid item={true}>
                    <UploadButton uploadFile={this.upload}/>
                </Grid>
            </Grid>

            <Paper className={classes.root}>
                <TableToolbar numSelected={selected.length} schema={this.props.match.params.schema} delete={() => {
                        this.delete()
                    }} download={this.download}/>

                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <TableHeader numSelected={selected.length} onSelectAllClick={this.handleSelectAllClick} rowCount={data.length} rows={this.rows()}/>
                        <TableBody>
                            {
                                data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (<TableRow hover={true} role="checkbox" aria-checked={isSelected} tabIndex={-1} key={n.id} selected={isSelected}>
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={isSelected} onClick={event => this.handleClick(event, n.id)}/>
                                        </TableCell>
                                        <TableCell padding="checkbox">
                                        <Edit clickEvent={this.save} schema={this.state.items} data={n}/>

                                        </TableCell>

                                        {this.generateTableData(n)}
                                    </TableRow>);
                                })
                            }
                            {
                                emptyRows > 0 && (<TableRow style={{
                                        height: 49 * emptyRows
                                    }}>
                                    <TableCell colSpan={Object.keys(this.state.items.properties).length + 2}/>
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
            <Message/>
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
