import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class DeleteElementButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parents: this.props.parents
    }
  }

  render() {
    return (<IconButton aria-label="Add" size="small" variant="fab" color="secondary" onClick={() => {
        this.props.delete(this.state.parents)
      }}>
      <DeleteIcon/>
    </IconButton>)
  }
}

export default DeleteElementButton
