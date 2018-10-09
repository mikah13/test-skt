import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';
import {Link} from 'react-router-dom';
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
            this.timer = setTimeout(() => this.setState({isLoaded: true, items: result}), 800);
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
