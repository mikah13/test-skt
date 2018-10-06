import React, {Component} from 'react';

import Table from './component/Table';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
    state = {
        theme: theme2
    }
    changeTheme = _ => {
        this.setState({
            theme: this.state.theme === theme1
                ? theme2
                : theme1
        })
    }
    render() {

        return (<MuiThemeProvider theme={this.state.theme}>

            {/* <WithTheme /> */}
            {/* <header className="App-header">
                    <h1 className="App-title">Open Data Editor</h1>
                </header> */
            }
            {/* <Table/>
         */
            }
            <Grid container={true} justify="center">
                <Link to="/" className="logo">
                    <img src={OdenLogo}/></Link>
            </Grid>
            <Button onClick={this.changeTheme}>CHANGE THEME</Button>

            <Switch>
                <Route exact={true} path='/' component={Index}/>
                <Route path='/editor' component={Table}/>

            </Switch>

        </MuiThemeProvider>)
    }
}

export default App;
