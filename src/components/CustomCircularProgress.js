import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { constants } from '../core/utilities';

const useStyles = makeStyles((theme) => ({
  colorPrimary:{
    color:constants.colors.primaryBlue
  }
}));


const CustomCircularProgress =() => {
  const classes = useStyles()
  return (
      <CircularProgress classes={{colorPrimary:classes.colorPrimary}} />
  );
}

export default CustomCircularProgress;
