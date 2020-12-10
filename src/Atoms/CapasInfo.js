import React, {useState} from 'react';
import DatePicker from './DatePicker';
import ButtonLotes from './ButtonLotes';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { uuid } from 'uuidv4';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin : '2px'
  },
  divStyles : {
    minWidth : 256,
    maxWidth : 256,
    margin: 5,
    padding: 10
  },
  paperStyles : {
    height : '100%',
    width: '100%',
    padding: 10,
    margin: 5
  },
  containerPaperStyles : {
    flexGrow : 1
  },
  buttonStyles : {
    width : '100%'
  },
  parentGrid : {
    border : 'solid 1px',
    marginBottom : 10
  },
  innerGrid : {
    flexGrow : 1
      }
}));


/**
 * Elemento que muestras la info de cada capa
 */
export default function CapasInfo(props) {
  const classes = useStyles();
  let infoDatePickerState =[];
  let frecuenciaDates = [];

  if(props.frecuencias !== null ){
    const frecuenciaEntries = Object.entries(props.frecuencias);
   frecuenciaEntries.forEach((el)=>{
    let frecuenciaAnual = el[1][1].frecuenciaAnual;
    let fechas = Object.values(el[1][1].fechas); 
    let numberFrecuencia = 0;
    for (frecuenciaAnual; frecuenciaAnual > 0; frecuenciaAnual--){

      numberFrecuencia ++;
      frecuenciaDates.push(<DatePicker key={uuid()} name={el[1][0]} numberFrecuencia={numberFrecuencia} 
        fecha={fechas[numberFrecuencia -1]}  />)
    }
    })
  } else {
    //  
  }
  return (
    <Paper className={classes.divStyles}>
<Grid container className={classes.root} justify='center' wrap='wrap' alignContent='center'>
{frecuenciaDates}
    <Typography variant="h5"  >
             {props.cultivo}
      </Typography> 
      <Paper className={classes.paperStyles} elevation={3} >
      <Grid container className={classes.containerPaperStyles} spacing={2} justify='center' alignContent='center'>
      <ButtonLotes lotes={props.lotes} />
        </Grid>
        </Paper>
</Grid>
    </Paper>
  );
}


