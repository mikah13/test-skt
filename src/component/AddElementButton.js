import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

class AddElementButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            parents:this.props.parents,
        }
    }

    render(){
        return(
        <IconButton
        aria-label="Add"
        size="small"
        variant="fab"
        color="secondary"
        onClick={()=>{this.props.add(this.state.parents)}}
        >
        <AddIcon/>
        </IconButton>
        )
    }
}

export default AddElementButton
