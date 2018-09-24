import React, {Component} from 'react';

import Table from './component/Table';


class App extends Component {
    render() {
        return (<div className="App">
            <header className="App-header">
                <h1 className="App-title">Open Data Editor</h1>
            </header>

            <Table />
        </div>)
    }
}

export default App;
