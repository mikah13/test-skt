import React, {Component} from 'react';

import Table from './component/Table';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
            <div className="App">

                {/* <WithTheme /> */}
                {/* <header className="App-header">
                    <h1 className="App-title">Open Data Editor</h1>
                </header> */}
                <Table/>
                <Button onClick={this.changeTheme}>Hi</Button>
            </div>
        </MuiThemeProvider>)
    }
}

export default App;
