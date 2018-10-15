import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    input: {
        display: 'none'
    }
});

const btnStyle = {
    margin: ' 0 5px 0 0 '
};

const FILE_TYPE = ['json'];
const UPLOAD_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 18 18"><path d="M13 14c0 2.21-1.79 4-4 4s-4-1.79-4-4V3c0-1.66 1.34-3 3-3s3 1.34 3 3v9c0 1.1-.9 2-2 2s-2-.9-2-2V4h1v8c0 .55.45 1 1 1s1-.45 1-1V3c0-1.1-.9-2-2-2s-2 .9-2 2v11c0 1.66 1.34 3 3 3s3-1.34 3-3V4h1v10z"/></svg>'

class UploadButton extends Component {
    changeEvent = evt => {
        let file = evt.target.files[0];
        let file_type = file.name.split('.')[1];
        if (FILE_TYPE.indexOf(file_type) !== -1) {
            let reader = new FileReader();
            reader.onload = (a => {
                return e => {
                    document.getElementById('input-file-button').style.display = 'inline-block';
                    document.getElementById('input-file-name').innerHTML = UPLOAD_ICON + a.name;
                    let data = e.currentTarget.result;
                    this.props.uploadFile(data);
                };
            })(file);
            reader.readAsText(file);
        } else {
            alert('FILE TYPE NOT SUPPORTED');
        }
    }
    render() {
        const {classes} = this.props;
        return (<div>
            <input className={classes.input} id="contained-button-file" multiple="multiple" type="file" onChange={this.changeEvent}/>
            <span>
                <label htmlFor="contained-button-file">
                        <Tooltip title="Upload">
                    <Button variant="contained" color="default" component="span" className={classes.button}>
                        <span style={btnStyle}>Upload</span>
                        <CloudUploadIcon className={classes.rightIcon}/>
                    </Button>
                </Tooltip>
                </label>
                <Button id="input-file-button">
                    <span id="input-file-name"></span>
                </Button>
            </span>

        </div>);
    }
}

UploadButton.propTypes = {
    classes: PropTypes.object.isRequired,
    uploadFile: PropTypes.func.isRequired
};

export default withStyles(styles)(UploadButton);
