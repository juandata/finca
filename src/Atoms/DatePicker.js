import React, {useState, useEffect} from 'react';
import store from '../Redux/store';
import {lotesData} from '../Redux/actions';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
  },
  checkBoxStyles : {
    marginTop : 'auto'
  }
}));
const colors = {
  'abonos' : 'aliceblue',
  'venenos' : 'antiquewhite',
  'cosechas' :  'greenyellow'
}
const numDaysBetween = function(d1, d2) {
  const diff = Math.abs(d1.getTime() - d2.getTime());
  return diff / (1000 * 60 * 60 * 24);
};

export default function DatePicker(props) {
  const classes = useStyles();
  const [date, setDate] = useState(props.fecha);
  const [checked, setChecked] = useState(false);
  const [ocultar, setOcultar] = useState(false);
  useEffect(()=>{
    //did mount
const currentDate = new Date();
const datePickerDate = new Date(date);
const diff =numDaysBetween(currentDate, datePickerDate);
if(Date.parse(currentDate) > Date.parse(datePickerDate)){
  //si la fecha actual es mayor a la del picker la diferencia es
  //que faltan x cantidad de dias para llegar a la fecha actual
  //console.log('faltan ', diff, ' dias para la fecha actual');
 
} else {
 // console.log('faltan ', diff, 'cantidad de dias para alcanzar la fecha del picker')
//si no se ha llegado a la fecha, no se ha abonado o fumigado,
//entonces si faltan mas de 3 dias  no se debe colocar el checked
if(diff > 3  ){
  setOcultar(true)
} else {
  //estamos en los tres dias anteriores a la fecha, colocar el checked
  setOcultar(false);
}
}
 
  },[])

  useEffect(()=>{
    const name = props.name + props.numberFrecuencia;
    const currentDate = new Date();
  const datePickerDate = new Date(date);
  const diff =numDaysBetween(currentDate, datePickerDate);
  if(Date.parse(currentDate) > Date.parse(datePickerDate)){
    //si la fecha actual es mayor a la del picker la diferencia es
    //que faltan x cantidad de dias para llegar a la fecha actual
    //console.log('faltan ', diff, ' dias para la fecha actual');
    setOcultar(false)
  } else {
    //console.log('faltan ', diff, 'cantidad de dias para alcanzar la fecha del picker');
    if(diff > 3  ){
     setOcultar(true);
    } else {
      //estamos en los tres dias anteriores a la fecha, colocar el checked
      setOcultar(false)
    }
  }
    const data = {
      [name] : {
        checked : checked,
        date : date,
        id : props.name + ',' + props.numberFrecuencia
      }
     
    }
    store.dispatch(lotesData(data))

    
  
  },[date, checked])
  
  const handleChange = (ev) => {
    setChecked(ev.target.checked);
  };
  const dateChange = (ev)=>{
    setDate(ev.target.value);
  }
  return (
    <Grid style={{backgroundColor : colors[props.name]}}container direction='row' justify='center' alignContent='center'>
      <TextField
        id={props.name + ',' + props.numberFrecuencia}
        label={`Fecha ${props.numberFrecuencia} ${props.name}`}
        type="date"
        defaultValue={date}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={dateChange}
      />
      {ocultar ? null : 
      
       <Checkbox
       id={props.name + ',' + props.numberFrecuencia}
       className={classes.checkBoxStyles}
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      }
      </Grid>
  );
}
