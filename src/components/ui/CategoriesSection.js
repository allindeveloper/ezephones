import { makeStyles } from '@material-ui/core';
import React from 'react';
import { constants } from '../../core/utilities';

const useStyles = makeStyles((theme) => ({
    root:{
        backgroundColor:constants.colors.categoriesBg,
        minHeight:'40%',
        width:'30%'
    }
  }));

const CategoriesSection = ()=>{
    const categoriesSectionClasses = useStyles()
    return (
        <div className={categoriesSectionClasses.root}>

        </div>
    )
}

export default CategoriesSection