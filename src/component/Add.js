import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';

import AddElementButton from './AddElementButton'
import DeleteElementButton from './DeleteElementButton'
/**
 * Set Style for the Button
 * @type {Object}
 */
const styles = {
    appBar: {
        position: 'relative'
    },
    flex: {
        flex: 1
    }
};
const margin = {
    margin: '0 0 0 0 '
}

/**
 * Transition for opening the modal
 * @param       {[type]} props [description]
 * @constructor
 */
function Transition(props) {
    return <Slide direction="up" {...props}/>;
}
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

function renderArray(arr){
    let result = [];
    let type =arr.items.type ;
    if(isNumber(type)){
        // result.push(renderNumber())
    }
    if(isString(type)){
        // result.push(renderString())
    }
    if(isObject(type)){

    }
    if(isArray(type)){
        // result.push(renderObject(arr.items));
    }
    return result;
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

function renderMessage(object, required){
    let obj = render(JSON.parse(JSON.stringify(object)))
    for(let prop in obj){
        if(required.indexOf(prop)!==-1 && (isNumber(object[prop]) || isString(object[prop]))){
            obj[prop] = 'Required value. ';
        }
    }
    return obj;
}
/**
 * Class Add
 * @extends React
 */
class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            schema: function(schema){
                let arr = [];
                for(let prop in schema){
                    schema[prop].title = prop;
                    arr.push(schema[prop])
                }
                return arr;
            }(this.props.schema.properties),
            data:
                render(this.props.schema)
            ,
            message:
                renderMessage(this.props.schema, this.props.schema.required)

        };
    }
    addArrayElement = parents =>{

        let schema = this.props.schema.properties;
        let data = this.state.data;
        let cur = data;
        if(parents.length>0){
            parents.forEach(el=>{
                cur = cur[el]
                schema = schema[el]
            })
        }
        let newElement = render(schema.items)
        cur.push(newElement);

        let message = this.state.message;
        let curM = message;
        if(parents.length>0){
            parents.forEach(el=>{
                curM = curM[el]
                //schema = schema[el]
            })
        }
        let newElementM = render(schema.items)
        curM.push(newElementM);
        this.setState({data:data, message:message})
    }
    deleteArrayElement = parents =>{
        let data = this.state.data;
        let cur = data;
        if(parents.length>0){
            for(let i = 0 ; i < parents.length - 1; i++){
                cur = cur[parents[i]]
            }
        }
        let index = parents[parents.length - 1];
        cur.splice(index, 1);


        //test
        let message = this.state.message;
        let curM = message;
        if(parents.length>0){
            for(let i = 0 ; i < parents.length - 1; i++){
                curM = curM[parents[i]]
            }
        }
        let indexM = parents[parents.length - 1];
        curM.splice(indexM, 1);
        this.setState({data:data, message:message})

    }
    /**
     * Click event will open the modal.
     * @return {[function]} Set open state to true
     */
    handleClickOpen = () => {
        this.setState({open: true});
    };

    /**
     * Close event will close the modal.
     * @return {[function]} Set open state to false
     */
    handleClose = () => {
        this.setState({
            open: false,
            data: renderObject(this.props.schema.properties),
            message: renderMessage(this.props.schema, this.props.schema.required)
        });

    };

    /**
     * [handleAdd description]
     * @param  {[type]} a [description]
     * @return {[type]}   [description]
     */
    handleAdd = _ => {
        let sendData = this.state.data;
        let sendMessage = this.state.message;
        this.props.clickEvent(sendData, sendMessage);
        this.setState({
            open: false,
            data: renderObject(this.props.schema.properties),
            message: renderMessage(this.props.schema, this.props.schema.required)
        });
    }

    /**
     * Live Update feature
     * @param  {[type]} e
     * @return {[function]}  Live update of input data
     */
    handleInputChange = (e,a,parents) => {
        // e has example, data type and the title of the field
        // let example = a.example;
        let value = e.target.value;
        let required = e.target.required;
        let prop = a.title;
        let type = a.type;
        let minimum = a.minimum;
        let maximum = a.maximum;
        let pattern = a.pattern;



        // TODO: HANDLE VALIDATION HERE
        // ONLY FOR STRING- NUMBER AND integer
        // FOR STRING USE PATTERN IF NEEDED
        // FOR NUMBER USE MAX MIN IF NEEDED
        // DON'T FORGET REQUIRED

        let helperText = " ";

        // integer
        if (type === "integer") {
            if (!value.match(/^[+-]?\d+$/) && value!=="") {
                helperText = helperText + "Should be an integer. ";
            }
        }

        // number
        if (type === "number") {
            if (!value.match(/^[+-]?\d+(\.\d+)?$/) && value!=="") {
                helperText = helperText + "Should be a number. ";
            }
        }

        // min and max
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

        //For required
        if (required){
            if (value === ""){
                helperText = helperText + "Required value. ";
            }
        }

        // pattern
        if(typeof pattern !== 'undefined'){
            if (!value.match(pattern) && value!=="") {
                helperText = helperText + "Invalid value. ";
            }
        }

        let newData = this.state.data;
        let target = newData
        if(parents.length>0){
            parents.forEach(x => {
                target = target[x];
            })
        }
        target[prop] = value;
        this.setState({data: newData})

        let newMessage = this.state.message;
        let t = newMessage;
        if(parents.length>0){
            parents.forEach(x => {
                t = t[x];
            })
        }
        t[prop] = helperText;
        this.setState({message: newMessage})
    }

    generateTextField = (a,idx,s, parents) =>{
        let margin = (parents.length*100) + "px";
        let prop = a.title;
        let data = this.state.data;
        let desc = a.example?'E.g: ' + a.example:'';
        if(parents.length > 0){
            parents.forEach(x => {
                data = data[x];
            })
        }
        let value = data[prop];

        let message = this.state.message;
        if(parents.length > 0){
            parents.forEach(x => {
                message = message[x];
            })
        }
        console.log('state message',message);
        let helperText = message[prop];
        console.log('message',parents);
        if(helperText === "" && this.props.schema.required.indexOf(prop) !== -1){
            helperText = "Required value. ";
        }
        return <div style={{paddingLeft: margin}}>
                <TextField
                placeholder = {desc}
                error = {helperText.trim() === ""?false:true}
                key={`tf-${idx}`}
                id={prop}
                required={this.props.schema.required.indexOf(prop) !== -1?true:false}
                label={prop}
                type=""
                value = {value}
                helperText = {helperText} //test
                margin="normal"
                style={{
                width: '50%',
                marginLeft: '25%'
            }} onChange={(e)=>this.handleInputChange(e,a, parents)
        }/>     </div>
    }

     generateObject = (a,idx,s, parents) =>{
        let propArray = [];
        for(let prop in a.properties){
            a.properties[prop].title = prop;
            propArray.push(a.properties[prop])
        }

        let newParents = parents.slice();
        newParents.push(a.title);
        let isChildrenOfArray =  isNaN(newParents[newParents.length-1]) === false;
        return propArray.map((b, i) => {
            if( i === 0){
                return  <div key={`objDiv-${i}`}><div key={`textFieldObjDiv-${i}`} style={{paddingLeft: (parents.length*100) + "px"}}><TextField
                    key={`textFieldObj-${i}`}
                    InputProps={{
                        readOnly: true,
                    }}
                        margin="normal" style={{
                        width: '70px',
                        marginLeft: '25%'
                    }}   defaultValue={a.title}/>{isChildrenOfArray?<DeleteElementButton parents={newParents} delete ={(p)=>{this.deleteArrayElement(p)}}/>:null} </div>{this.generateInput(b, i, a, newParents)}</div>
            }

            return this.generateInput(b, i, a, newParents);
        })


     }
     generateArray = (a,idx,s,parents)=>{
                 let propArray = [];
                 let data = this.state.data;
                 if(parents.length>0){
                     parents.forEach(el=>{
                         data = data[el]
                     })
                 }
                 if(data[a.title].length === 1 ){
                     a.items.title = "0"
                     propArray.push(a.items)
                 }
                 else{
                     for(let i = 0; i < data[a.title].length ; i++){
                         let newObj = JSON.parse(JSON.stringify(a.items));
                         newObj.title = i.toString();
                         a.items.title = i.toString();
                         propArray.push(newObj)
                     }
                 }

                 let newParents = parents.slice();
                 newParents.push(a.title);
                 if(propArray.length === 0){
                     return <div style={{paddingLeft: (parents.length*100) + "px"}}><TextField

                              defaultValue={a.title}
                        InputProps={{
                            readOnly: true,
                        }}
                             margin="normal" style={{
                             width: '70px',
                             marginLeft: '25%'
                         }} /> <AddElementButton parents={newParents} add={(p)=>{this.addArrayElement(p)}}/></div>
                 }
                 return propArray.map((b, i) => {
                     if( i === 0){
                         return  <div key={`objDiv-${i}`}><div key={`textFieldArrayDiv-${i}`} style={{paddingLeft: (parents.length*100) + "px"}}><TextField
                                 key={`textFieldArray-${i}`}
                                  defaultValue={a.title}
                            InputProps={{
                                readOnly: true,
                            }}
                                 margin="normal" style={{
                                 width: '70px',
                                 marginLeft: '25%'
                             }} /> <AddElementButton parents={newParents} add={(p)=>{this.addArrayElement(p)}}/></div>{this.generateInput(b, i, a, newParents)}</div>
                     }

                     return this.generateInput(b, i, a, newParents);
                 })

     }
     generateField = (a,idx,s, parents) =>{
         if(isString(a.type) || isNumber(a.type)){
             return this.generateTextField(a,idx,s, parents);
         }
         if(isObject(a.type)){
            return this.generateObject(a,idx,s, parents);
         }
         if(isArray(a.type)){
            return this.generateArray(a,idx,s, parents);
         }
     }

    // generateComplexField = (a,i,s)=>{
    //
    // }
    /**
     * Generate input rows and labels for every single field
     * @param  {[type]} a item label
     * @param  {[type]} i index
     * @return {[Grid]}  Grid item
     */
    generateInput = (a, idx, s, parents) => {
        return <Grid item={true} lg={12} xs={12} key={`gi-${idx}`}>
            {this.generateField(a,idx,s,parents)}
                </Grid>
    }

    /**
     * Generate the entire form
     * @param  {[type]} _ [description]
     * @return {[type]}   [description]
     */
    generateForm = _ => {
        return this.state.schema.map((a, idx) => {
            return this.generateInput(a, idx, this.props.schema, []);
        })
    }

    /**
     * Render main function
     * @return {[type]} [description]
     */
    render() {
        const {classes} = this.props;
        return (<div style={margin}>

                <Button variant="contained" color="primary" aria-label="Add" className={classes.button} onClick={this.handleClickOpen}>
                    <AddIcon/>
                    Add
                </Button>

            <Dialog fullScreen={true} open={this.state.open} onClose={this.handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            New Entry
                        </Typography>
                        <Button color="inherit" onClick={this.handleAdd}>
                            Add
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent>



                    {this.generateForm()}


                </DialogContent>
            </Dialog>

        </div>);
    }
}


Add.propTypes = {
    classes: PropTypes.object.isRequired,
    clickEvent: PropTypes.func.isRequired
};

/**
 * Export Add Button. End of the class
 */
export default withStyles(styles)(Add);
