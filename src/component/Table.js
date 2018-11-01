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
import EditButton from './EditButton';
import json_data from '../schemas/Public Art';

let counter = 0;


/**
 * Convert arg based on schem to obj type that work with the table
 * @param  {[type]} arg    [description]
 * @param  {[type]} schema [description]
 * @return {[type]}        [description]
 */
function createData(arg, schema) {
    console.log(arg);
    console.log(schema);
    let obj = {}
    schema.forEach((e, i) => {
        obj[e] = arg[i]
    })
    obj.id = ++counter;
    return obj;
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
function toPropArray(obj){
    let arr = [];
    for (let val in obj) {
        arr.push(obj[val]);
    }
    return arr;
}
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
                {   "id":1,
                "properties": {
                    "TitleOfWork": {
                        "type": "string",
                        "example": "Pump House Mural"
                        ,"value":"MEO MEO"
                    },
                    "Latitude": {
                        "type": "number",
                        "minimum": -90,
                        "maximum": 90,
                        "value":123
                    },
                    "Longitude": {
                        "type": "number",
                        "minimum": -180,
                        "maximum": 180
                    },
                    "Description": {
                        "description": "The description for a piece of public art",
                        "type": "string"
                        ,"value":"MEO MEO"
                    },
                    "ArtType": {
                        "description": "The type of art, eg painting, sculpture",
                        "type": "string"
                    },
                    "Dimensions": {
                        "description": "Physical dimensions of the public art pieces",
                        "type": "string"
                    },
                    "Medium": {
                        "description": "The art medium used for the art piece",
                        "type": "string"
                    },
                    "InstallDate": {
                        "description": "The date the public art piece was installed",
                        "type": "string",
                        "format": "date-time"
                    },
                    "StreetAddress": {
                        "type": "string",
                        "example": "123 West Rd"
                    },
                    "Unit": {
                        "type": "string",
                        "example": "Unit 500"
                    },
                    "City": {
                        "type": "string",
                        "example": "New Westminster"
                    },
                    "Province": {
                        "type": "string",
                        "example": "BC"
                    },
                    "PostalCode": {
                        "type": "string",
                        "example": "5V6 3E8"
                    },
                    "PhoneNumber": {
                        "type": "integer",
                        "pattern": "^[0-9]+$",
                        "example": 1234567891
                    },
                    "Description": {
                        "type": "string",
                        "example": "\"Puzzled,\" (2013) by artist Steve Hornung brightens the side of an otherwise drab pump house. The mural features a boy with a slingshot, three moose, and interlocking puzzle pieces."
                    },
                    "SiteName": {
                        "description": "The name of the site where the public art piece is located",
                        "type": "string"
                    },
                    "Status": {
                        "description": "Status of the public art piece",
                        "type": "string",
                        "example": "In place"
                    },
                    "Ownership": {
                        "description": "The owner of the public art piece",
                        "type": "string"
                    },
                    "Images": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "URL": {
                                    "type": "string",
                                    "example": "https://www.toronto.ca/wp-content/uploads/2017/08/9602-bergeron2.jpg"
                                },
                                "photoCredit": {
                                    "type": "string",
                                }
                            }
                        }
                    },
                    "Artist": {
                        "type": "object",
                        "properties": {
                            "FirstName": {
                                "description": "The artist's first name.",
                                "type": "string"
                            },
                            "LastName": {
                                "description": "The artist's last name.",
                                "type": "string"
                            },
                            "Country": {
                                "description": "The artist's country of residence.",
                                "type": "string"
                            },
                            "Email": {
                                "description": "The artist's email address.",
                                "type": "string",
                                "pattern": "^@$"
                            },
                            "Website": {
                                "description": "The URL for the artist's website.",
                                "type": "string"
                            }
                        }
                    }
                },
                }
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

    generateTableCell = (a, b,c ,d) => {
        let prop = a[b];
        console.log(this.state.items);
        if(prop.type=="string" || prop.type=="number")
            return <TableCell numeric={false} key={c}>{prop.value}</TableCell>
        else
            return <EditButton clickEvent={this.save} schema={objToArray(this.state.items.properties)} data={d} />
    };

    generateTableData = obj => {
        console.log(obj);

        return objToArray(obj.properties).map((e, i) => {

            return this.generateTableCell(obj.properties, e,  i,obj);
        })
    }

    add = a => {

        let newData = this.state.data;
        a = JSON.parse(a);
        let arr = [];
        for (let val in a) {
            arr.push(a[val])
        }
        newData.push(createData(arr, objToArray(this.state.items.properties)))
        this.setState({data: newData})
    }

    save = a => {
        let newData = this.state.data;
        newData = newData.map(b => {
            if (b.id === a.id) {
                return a;
            }
            return b;
        })
        this.setState({data: newData})
    }

    upload = a => {
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
                    <AddButton className="add-button" clickEvent={this.add} schema={objToArray(this.state.items.properties)}/>
                </Grid>
                <Grid item={true}>
                    <UploadButton uploadFile={this.upload}/>
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
                                    return (<TableRow hover={true} role="checkbox" aria-checked={isSelected} tabIndex={-1} key={n.id} selected={isSelected}>
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={isSelected} onClick={event => this.handleClick(event, n.id)}/>
                                        </TableCell>
                                        <TableCell padding="checkbox">
                                            <EditButton clickEvent={this.save} schema={objToArray(this.state.items.properties)} data={n}/>
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
