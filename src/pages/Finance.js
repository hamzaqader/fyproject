import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Navbar from '../comp2/navbar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

function Finance() {

 
 

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className='home'>

      <center><h1 style={{color:"white"}}>FINANCE</h1></center>

      


      <center>  <button className="decbut"  >ADD FINANCE</button>
    <button className="decbut">UPDATE FINANCE</button></center>
``
<div className={classes.root} style={{textAlign:"center",width:"100%"}}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <table class="table" style={{color:"white",marginLeft:"100px",marginTop:"80px",backgroundColor:"black",boxShadow:"2px 3px 4px white"}}>
        <thead>
          <tr style={{fontWeight:"bold"}}>
            <th scope="col">S.NO</th>
            <th scope="col">BREED NAME</th>
            <th scope="col">QUANTITY (kg)</th>
            <th scope="col">DATE OF PURCHASE</th>
            <th scope="col">BREED COST (Rs)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>ABC</td>
            <td>40</td>
            <td>20-06-2021</td>
            <td>4000</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>IJK</td>
            <td>80</td>
            <td>20-06-2021</td>
            <td>4050</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>XYZ</td>
            <td>60</td>
            <td>20-06-2021</td>
            <td>6540</td>
          </tr>
        </tbody>
      </table>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <table class="table" style={{color:"white",marginLeft:"100px",marginTop:"80px",backgroundColor:"black",boxShadow:"2px 3px 4px white"}}>
        <thead>
          <tr style={{fontWeight:"bold"}}>
            <th scope="col">S.NO</th>
            <th scope="col">BREED NAME</th>
            <th scope="col">QUANTITY (kg)</th>
            <th scope="col">DATE OF PURCHASE</th>
            <th scope="col">BREED COST (Rs)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>ABC</td>
            <td>40</td>
            <td>20-06-2021</td>
            <td>4000</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>IJK</td>
            <td>80</td>
            <td>20-06-2021</td>
            <td>4050</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>XYZ</td>
            <td>60</td>
            <td>20-06-2021</td>
            <td>6540</td>
          </tr>
        </tbody>
      </table>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <table class="table" style={{color:"white",marginLeft:"100px",marginTop:"80px",backgroundColor:"black",boxShadow:"2px 3px 4px white"}}>
        <thead>
          <tr style={{fontWeight:"bold"}}>
            <th scope="col">S.NO</th>
            <th scope="col">BREED NAME</th>
            <th scope="col">QUANTITY (kg)</th>
            <th scope="col">DATE OF PURCHASE</th>
            <th scope="col">BREED COST (Rs)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>ABC</td>
            <td>40</td>
            <td>20-06-2021</td>
            <td>4000</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>IJK</td>
            <td>80</td>
            <td>20-06-2021</td>
            <td>4050</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>XYZ</td>
            <td>60</td>
            <td>20-06-2021</td>
            <td>6540</td>
          </tr>
        </tbody>
      </table>
        </TabPanel>
      </SwipeableViews>
    </div>
   


    </div>
  );
}

export default Finance;