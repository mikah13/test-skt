import React, {Component} from 'react';
import 'babel-polyfill';
import Table from './component/Table';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Index from './component/Index';
import {Switch, Route, Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import OdenLogo from './images/Oden_Logo.svg';
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
                    <img alt="logo" src={OdenLogo}/></Link>

            </Grid>

            <Switch>
                <Route exact={true} path='/' component={Index}/>
                <Route path='/editor/:schema' component={Table}/>
            </Switch>

        </MuiThemeProvider>)
    }
}

export default App;
