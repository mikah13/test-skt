import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
class Index extends Component {
    render() {

        return (<div>
            {/* <Grid container={true} justify="center">
                <img className="logo" src={OdenLogo}/>
            </Grid> */
            }

            <Grid container={true} justify="center">
                <h1>WELCOME TO MAINPAGE</h1>
            </Grid>
        </div>)
    }
}

export default Index;
