import { Grid, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import appleshowcase from '../../assets/images/appleshowcase.png'
import CategoriesSection from '../../components/ui/CategoriesSection'
import useCommonStyles from '../../core/commonStyles'
import styles from './home.module.css'
const useStyles = makeStyles((theme) => ({
    mainHeader: {
        fontSize:'34pt'
        
    },
    leftDiv:{
        
    },
    rightDiv:{

    },
    topContainer:{
        marginTop:'30px'
    }
  }));

const Home = () =>{

    const commonStyles = useCommonStyles()
    const homeClasses =  useStyles()
    return(
        <div className={styles?.root}>
                <Grid container spacing={4} className={homeClasses.topContainer}>
                    <Grid item xs={12} md={7}>
                        <div className={homeClasses.leftDiv}><h1 className={clsx(commonStyles.textWhite,homeClasses.mainHeader)}>
                            SHOP OUR LATEST <br/>AVAILABLE STOCK HERE
                        </h1>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div>
                        <img src={appleshowcase} width="100%" alt="Apple show case"/>
                        </div>
                    </Grid>
                </Grid>
                <CategoriesSection />
        </div>
    )
}
export default Home