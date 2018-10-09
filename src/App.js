import React, {Component} from 'react';

import Table from './component/Table';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Index from './component/Index';
import {Switch, Route, Link, Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import OdenLogo from './images/Oden_Logo.svg';
import Footer from './component/Footer';
import Container from 'muicss/lib/react/container';
const theme1 = createMuiTheme({
    palette: {
        type: 'light'
    }
});
const theme2 = createMuiTheme({
    palette: {
        type: 'dark'
    }
});

class App extends Component {
    constructor(props) {
        super(props);
    }
    changeTheme = _ => {
        this.setState({
            theme: this.state.theme === theme1
                ? theme2
                : theme1
        })
    }

    render() {
        return (<MuiThemeProvider theme={theme1}>

            <Grid container={true} justify="center">
                <Link to="/" className="logo">
                    <img src={OdenLogo}/></Link>

            </Grid>

            <Switch>
                <Route exact={true} path='/' component={Index}/>
                <Route path='/editor/:schema' component={Table}/>
            </Switch>

            

        </MuiThemeProvider>)
    }
}

export default App;
