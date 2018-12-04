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
import IconButton from '@material-ui/core/IconButton';
import Warning from '@material-ui/icons/Error';

function isNumber(type){
    return type === "number" || type==="integer"
}
function isString(type){
    return type==="string";
}
function isArray(type){
    return type==="array";
}
function isObject(type){
    return type === "object";
}

function renderNumber(a){
    return "";
}
function renderString(a){
    return "";
}

function renderArray(arr,curData){
    let result = [];
    let type =arr.items.type ;
    if(isNumber(type)){
        curData.forEach(e=>{e = renderNumber()})
    }
    if(isString(type)){
        curData.forEach(e=>{e = renderString()})
    }
    if(isObject(type)){
        curData.forEach(e=>{e = renderObject(arr.items.properties)})

    }
    if(isArray(type)){
            curData.forEach(e=>{e = renderObject(arr.items)})

    }
    return curData

}


function renderObject(obj){
    let object = {}
    for(let prop in obj){
        let type = obj[prop].type;
        if(isNumber(type)){
            object[prop] = renderNumber(obj[prop]);
        }
        if(isString(type)){
            object[prop] = renderString(obj[prop]);
        }
        if(isObject(type)){
            object[prop]= renderObject(obj[prop].properties)
        }
        if(isArray(type)){
            object[prop] = renderArray(obj[prop])
        }
    }
    return object;
}

function render(object){

    if(isNumber(object.type)){
        return renderNumber(object)
    }
    if(isString(object.type)){
        return renderString(object)
    }
    if(isObject(object.type)){
        return renderObject(object.properties)
    }
    if(isArray(object.type)){
        return renderArray(object)
    }
}


/**
 * Convert arg based on schem to obj type that work with the table
 * @param  {[type]} arg    [description]
 * @param  {[type]} schema [description]
 * @return {[type]}        [description]
 */
function createData(data, schema, len, err) {
    let object = JSON.parse(JSON.stringify(schema));
    for(let prop in object){
        object[prop].value = data[prop];
    }
    let newData = {
        id: len,
        properties:object,
        error: err,
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
            isLoaded: false,
            previousData:[[]]
        };
        this.timer = null;

    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    componentDidMount() {
        let url = 'https://raw.githubusercontent.com/OpendataDeveloperNetwork/oden-schemas/master/schemas/' + encode(this.props.match.params.schema);
        fetch(url).then(res => res.json()).then((result) => {
            console.log(json_data);
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
        let error = this.state.data[a.id].error[b];
        if(prop.type!=="array" && prop.type!=="object"){

            return <TableCell numeric={false} key={c} style={{color:error.trim()!== '' ? 'red':''}}>{this.state.data[a.id].properties[b].value} { error.trim()!== '' ? <Warning/>:''}</TableCell>
        }
        if(prop.type==="array"){
            return <TableCell numeric={false} key={c}>{ "Array of "  + this.state.data[a.id].properties[b].value.length  + " element(s)"}</TableCell>
        }
        return <TableCell numeric={false} key={c}>{ "Object Type: " + this.state.data[a.id].properties[b].title}</TableCell>


    };

    generateTableData = obj => {
        return objToArray(obj.properties).map((e, i) => {
            return this.generateTableCell(obj, e, i);
        })
    }
    archive = _=>{

        let oldData = JSON.parse(JSON.stringify(this.state.data));
        let prevData = JSON.parse(JSON.stringify(this.state.previousData));
        prevData.push(oldData);
        this.setState({
            previousData:prevData
        })

    }
    undo = _=>{
        let oldData;
        if(this.state.previousData.length > 0){
            this.state.previousData.pop();
            if(this.state.previousData.length === 0){
                oldData = [[]];
                this.setState({data:oldData})
            }
            else{
                oldData = this.state.previousData[this.state.previousData.length-1];
                    this.setState({data:oldData})
            }

        }

    }

    delete =  _=> {
        this.archive();
        let newData = this.state.data.filter((a, b) => {
            return this.state.selected.indexOf(a.id) === -1;
        })
        newData.forEach((el,idx)=>{
            el.id = idx;
        })

        this.setState({data: newData, selected: []})

    }
    add = (a,b) => {


        let error = b;
        let newData = this.state.data;

        let copy = JSON.parse(JSON.stringify(this.state.items.properties))
        let len = newData.length;
        newData.push(createData(a, copy, len, error))
        this.archive();
        this.setState({data: newData})

    }

    save = (a,b) => {
        this.archive();
        let newData = this.state.data;
        let error = b;
        newData.forEach(el=>{
            if(el.id === a.id){
                console.log(a.id);
                for(let prop in a.properties){
                    el.properties[prop].value = a.properties[prop];
                }
                el.error = error;
            }
        })
        this.setState({data: newData})
    }

    upload = a => {
        this.archive();
        let file = JSON.parse(a);
        let schemaName = this.props.match.params.schema;
        // if(schema === file.schema){
            let data = file.data;
            let schema = this.state.items;
            let copy = JSON.parse(JSON.stringify(this.state.items.properties))
            let newData = this.state.data;
            for(let i = 0 ; i < data.length; i++){

                let len = newData.length;
                let error = this.validate(JSON.parse(JSON.stringify(data[i])), schema);
                console.log('upload data', data[i]);
                newData.push(createData(data[i], copy, len, error))
            }

            this.setState({data: newData})


    }
    validate = (data, schema)=>{
        let newData = data;
        for(let prop in data){
            let type = schema.properties[prop].type;
            if(type==='number' || type==='integer' || type==='string'){
                let value = data[prop];
                let required = schema.required.indexOf(prop) !== -1;
                let type = schema.properties[prop].type;
                let minimum = schema.properties[prop].minimum;
                let maximum = schema.properties[prop].maximum;
                let pattern = schema.properties[prop].pattern;
                let helperText = "";
                if (type === "integer") {
                    if (!value.match(/^[+-]?\d+$/) && value!=="") {
                        helperText = helperText + "Should be an integer. ";
                    }
                }
                if (type === "number") {
                    if (!value.match(/^[+-]?\d+(\.\d+)?$/) && value!=="") {
                        helperText = helperText + "Should be a number. ";
                    }
                }
                if(typeof minimum !== 'undefined' && value!==""){
                    if(value < minimum){
                        helperText = helperText + "Should not be less than " + minimum + ". ";
                    }
                }
                if(typeof maximum !== 'undefined' && value!==""){
                    if(value > maximum){
                        helperText = helperText + "Should not be greater than " + maximum + ". ";
                    }
                }
                if (required){
                    if (value === ""){
                        helperText = helperText + "Required value. ";
                    }
                }

                newData[prop] = helperText;
            }
            else if(type ==='array'){
                newData[prop] = renderArray(schema.properties[prop],data[prop])
            }
            else if(type==='object'){
                newData[prop] = renderObject(schema.properties[prop].properties)
            }
        }
        return newData;
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
        downloadData = {
            schema:this.props.match.params.schema,
            data:downloadData
        }
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
                    }} download={this.download} undo={this.undo}/>

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
