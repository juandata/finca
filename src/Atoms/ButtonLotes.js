import React, {useState} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { uuid } from 'uuidv4';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   
    buttonStyles : {
      width : '100%'
    },
    parentGrid : {
      marginBottom : 10
    },
    innerGrid : {
      flexGrow : 1
        },
    paperStyles : {
      marginBottom : 10
    }
  }));

  const numDaysBetween = function(d1, d2) {
    const diff = Math.abs(d1.getTime() - d2.getTime());
    return diff / (1000 * 60 * 60 * 24);
  };
  
  
const ButtonLotes = (props)=>{
    const classes = useStyles();
    let lotes = props.lotes;
    let lotesDivision = [];
    let dynamicBackgroundColorAbono = 'gray';
    let dynamicBackgroundColorVenenos = 'gray';
    //revisar si el checkbox dice true o null, si es asi colocar el fondo verde
    const lotesInfoLength = Object.keys(props.lotesInfo)
    if(props.lotes === undefined || lotesInfoLength.length === 0){return null} else {
        const abonosChecked1 = props.lotesInfo.abonos1.checked ;
        const abonosChecked2 = props.lotesInfo.abonos2.checked;
       // const infoDatePickerAbono1 = props.lotesInfo.abonos1.id.split(',');
       // const infoDatePickerAbono2 = props.lotesInfo.abonos2.id.split(',');
        const selectedDateAbono1 = new Date(Date.parse(props.lotesInfo.abonos1.date)).toUTCString(); 
        const selectedDateAbono2 = new Date(Date.parse(props.lotesInfo.abonos2.date)).toUTCString(); 
        
        const venenosChecked1 = props.lotesInfo.venenos1.checked ;
        const venenosChecked2 = props.lotesInfo.venenos2.checked;
       // const infoDatePickerVenenos1 = props.lotesInfo.venenos1.id.split(',');
       // const infoDatePickerVenenos2 = props.lotesInfo.venenos2.id.split(',');
        const selectedDateVenenos1 = new Date(Date.parse(props.lotesInfo.venenos1.date)).toUTCString(); 
        const selectedDateVenenos2 = new Date(Date.parse(props.lotesInfo.venenos2.date)).toUTCString(); 
        
        //asignar color abonos
        const currentDate = new Date();
        const datePickerDateAbono1 = new Date(selectedDateAbono1);
        const datePickerDateAbono2 = new Date(selectedDateAbono2);
        const diffAbono1 =numDaysBetween(currentDate, datePickerDateAbono1);
        const diffAbono2 =numDaysBetween(currentDate, datePickerDateAbono2);

        //ABONO1
        if(currentDate < datePickerDateAbono1){
            //la fecha actual es inferior a la fecha del abono1
           // console.log('fecha actual inferior a fecha abono1');
            //si la fecha de abono 1 esta a tres dias de la fecha actual, establecer color amarillo si checked es false
            if(diffAbono1 < 3 && !abonosChecked1){
                dynamicBackgroundColorAbono = 'yellow'
            } else {
                 //la diferencia es mayor a 3 dias, el color debe ser verde si abono2 es true ya que se ignora abono1checked
                 if(abonosChecked2){
                    dynamicBackgroundColorAbono = 'green'
                } 
            }

        } else {
           // console.log('fecha actual es mayor a fecha abono1');
            //si la fecha actual es mayor a la del abono1 el estado de abono1 debe ser true, de lo contario no se abono y el color debe ser rojo
            if(!abonosChecked1)
            dynamicBackgroundColorAbono = 'red'
        }

        //ABONO2
        if(currentDate < datePickerDateAbono2){
            //la fecha actual es inferior a la fecha del abono2
           // console.log('fecha actual inferior a fecha abono2');
            //si la fecha de abono 2 esta a tres dias de la fecha actual, establecer color amarillo si checked es false
            if(diffAbono2 < 3 && !abonosChecked2){
                dynamicBackgroundColorAbono = 'yellow'
            } else {
                //la diferencia es mayor a 3 dias, el color debe ser verde si abono1 es true ya que se ignora abono2checked
                if(abonosChecked1){
                    dynamicBackgroundColorAbono = 'green'
                } 
            }

        } else {
            //console.log('fecha actual es mayor a fecha abono2');
            //si la fecha actual es mayor a la del abono2 el estado de abono2 debe ser true, de lo contario no se abono y el color debe ser rojo
            if(!abonosChecked2)
            dynamicBackgroundColorAbono = 'red'
        }

        //Sin importar las fechas, si los dos estados de los abonos son true, el color debe ser  verde
        if(abonosChecked1 && abonosChecked2){
             dynamicBackgroundColorAbono = 'green';
        }
        //FIN COMPARADOR ABONOS

         //asignar color venenos
         const currentDateVenenos = new Date();
         const datePickerDateVeneno1 = new Date(selectedDateVenenos1);
         const datePickerDateVeneno2 = new Date(selectedDateVenenos2);
         const diffVeneno1 =numDaysBetween(currentDateVenenos, datePickerDateVeneno1);
         const diffVeneno2 =numDaysBetween(currentDateVenenos, datePickerDateVeneno2);
 
         //VENENO1
         if(currentDateVenenos < datePickerDateVeneno1){
             //la fecha actual es inferior a la fecha del veneno1
             //si la fecha de veneno 1 esta a tres dias de la fecha actual, establecer color amarillo si checked es false
             if(diffVeneno1 < 3 && !venenosChecked1){
                 dynamicBackgroundColorVenenos = 'yellow'
             } else {
                  //la diferencia es mayor a 3 dias, el color debe ser verde si veneno2 es true ya que se ignora veneno1checked
                  if(venenosChecked2){
                     dynamicBackgroundColorVenenos = 'green'
                 } 
             }
 
         } else {
             //si la fecha actual es mayor a la del veneno1 el estado de veneno1 debe ser true, de lo contario no se fumigo y el color debe ser rojo
             if(!venenosChecked1)
             dynamicBackgroundColorVenenos = 'red'
         }
 
         //VENENO2
         if(currentDateVenenos < datePickerDateVeneno2){
             if(diffVeneno2 < 3 && !venenosChecked2){
                 dynamicBackgroundColorVenenos = 'yellow'
             } else {
                 if(venenosChecked1){
                     dynamicBackgroundColorVenenos = 'green'
                 } 
             }
 
         } else {
              if(!venenosChecked2)
             dynamicBackgroundColorVenenos = 'red'
         }
 
         //Sin importar las fechas, si los dos estados de los venenos son true, el color debe ser  verde
         if(venenosChecked1 && venenosChecked2){
              dynamicBackgroundColorVenenos = 'green';
         }

        
      const abonoButton =  
      <Button style={{backgroundColor : dynamicBackgroundColorAbono}} variant="contained" className={classes.buttonStyles}>
              <Typography variant="subtitle2" >
            Abonos
          </Typography>
          </Button>;
    const venenosButton =  
    <Button style={{backgroundColor : dynamicBackgroundColorVenenos}} variant="contained" className={classes.buttonStyles}>
    <Typography variant="subtitle2" >
    Venenos
  </Typography>
</Button>;
    
      let index = 0;
      for(lotes; lotes > 0; lotes--){
        index++;
        //revisar la fecha de abono numero 
        //si el estado del checker es true o null el boton debe ser verde
        lotesDivision.push(
          <Grid key={uuid()} container  justify='center' alignContent='center'>
            <Paper className={classes.paperStyles}>
            <Grid container  justify='center' alignContent='center' className={classes.parentGrid}>
            <Typography variant="body1" >
            Lote {index}
      
          </Typography> 
            <Grid container  direction='row' justify='center' alignContent='center'>
            <Grid item   className={classes.innerGrid}>
            {//revisar si el checker es true o null
                        abonoButton
            }
            {/*<Button variant="contained" className={classes.buttonStyles}>
              <Typography variant="subtitle2" >
            Abonos
          </Typography>
          </Button>*/}
            
            </Grid>
            <Grid item    className={classes.innerGrid}>
          {venenosButton}
             </Grid> 
             </Grid>
            </Grid>
            </Paper>
            </Grid>
      
        )
            
      } 
      return lotesDivision;
    }
 
  }

  function mapStateToProps(state) { 
    return {
       lotesInfo : state.setLotesData
    };
  };
  export default connect(mapStateToProps)(ButtonLotes)
  

