import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
function TabContainer(props) {
  return (<Typography component="div" style={{
      padding: 8 * 3
    }}>
    {props.children}
  </Typography>);
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '90%',
    backgroundColor: theme.palette.background.paper
  }
});

/**
 * Make a Scrollable Tabs to display Schemas using Alphabetical order.
 * @extends React
 */
class ScrollableTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };

  }
  handleChange = (event, value) => {
    this.setState({value});
  };

  generateTabs = _ => {
    return Array(26).fill('').map((a, b) => {
      return <Tab key={`tab-${b}`} label={String.fromCharCode(b + 65).toUpperCase()}/>;
    })

  }
  generateItems = value => {
    return this.props.data.map((item, i) => {
      return value === (item.name[0].charCodeAt(0) - 65) && <TabContainer key={`tabContainer-${i}`}>
        <Button href={`/editor/${item.name.split('.json')[0].split(' ').join('_').toLowerCase()}`} target="_blank">
          <ListItem button={false}>
            <ListItemIcon>
              <StarIcon/>
            </ListItemIcon>
            <ListItemText inset={true} primary={item.name.split('.json')[0]}/>
          </ListItem>
        </Button>

      </TabContainer>
    })

  }
  render() {
    const {classes} = this.props;
    const {value} = this.state;

    return (<div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={this.handleChange} scrollable={true} scrollButtons="off">
          {this.generateTabs()}
        </Tabs>
      </AppBar>
      {this.generateItems(value)}
    </div>);
  }
}

ScrollableTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScrollableTabs);
