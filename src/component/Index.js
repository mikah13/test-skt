import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import ScrollableTabs from './ScrollableTabs';
import Loading from './Loading';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
        this.timer = null;
    }

    componentDidMount() {
        let url = 'https://api.github.com/repos/OpendataDeveloperNetwork/oden-schemas/contents/schemas';
        fetch(url).then(res => res.json()).then((result) => {
            this.timer = setTimeout(() => this.setState({isLoaded: true, items: result}), 700);
        }, (error) => {
            this.setState({isLoaded: true, error});
        })
    }

    render() {
        if (!this.state.isLoaded) {
            return (<Grid container={true} spacing={8} direction="column" alignItems="center" justify="center"><Loading/></Grid>)
        }
        return (<div>
            <Grid container={true} spacing={8} direction="column" alignItems="center" justify="center">
                <ScrollableTabs data={this.state.items}/>
            </Grid>
        </div>)
    }
}

export default Index;
