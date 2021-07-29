import Slider from '@material-ui/core/Slider';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  slider: {
    color: 'white'
  },
  thumb:{
    // height: 24,
    // width: 24,
    // marginTop: -10,
    backgroundColor: 'white',
   
},
rootSlider:{
  color: '#2D7EE5',
  // backgroundColor:'transparent'
}
});

function valuetext(value) {
  return `$${value}`;
}
function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );
}
const AirbnbSlider = withStyles({
  root: {
    color: '#3a8589',
    height: 3,
    padding: '13px 0',
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    marginTop: -12,
    marginLeft: -13,
    boxShadow: '#ebebeb 0 2px 2px',
    '&:focus, &:hover, &$active': {
      boxShadow: '#ccc 0 2px 3px 1px',
    },
    '& .bar': {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  track: {
    height: 3,
  },
  rail: {
    color: '#d8d8d8',
    opacity: 1,
    height: 3,
  },
})(Slider);
const CustomRangeSlider = ({value,handleChange,rangeStep,minRange, maxRange}) => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <AirbnbSlider
        value={value}
        step={rangeStep}
        ThumbComponent={AirbnbThumbComponent}
        min={minRange}
        max={maxRange}
        valueLabelFormat={valuetext}
        onChange={handleChange}
      //   classes={{
      //     root:classes.rootSlider,
      //     track:classes.slider,
      //     thumb:classes.thumb
      // }}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        color="white"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
export default CustomRangeSlider
