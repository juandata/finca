import React, {useState, useEffect} from 'react';
import CapasInfo from './CapasInfo';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { uuid } from 'uuidv4';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: 10
    },
    textFieldStyles: {
        margin: 5
    },
    buttonStyles : {
        marginTop : 5
    }
}));

const fincaInfo = {
        nombre : 'El Socorro',
        nm: {
            mas : 1680,
            menos : 1720
        },
        hectareas: 12,
        ph: {'Mínimo'  : 5.5, 'Máximo' : 6.5},
        correccionPh:
        {
            frecuenciaAnual: 1,
            precio: 900000,
            tipo : 'caldolimta'
        },
      
    cultivos: {
        ['Café']: {
            lotes : 4,
            frecuencias : {
                abonos: {
                    frecuenciaAnual: 2,
                    fechas : ['2020-02-02', '2020-08-18'],
                    tipos: ['urea', 'dap', 'potacio kcl']
                },
                venenos: {
                    frecuenciaAnual: 2,
                    fechas : ['2020-06-26', '2020-12-28'],
                    venenoPara: 'roya',
                    plagas: ['broca', 'hongo roya mancha de hierro']
                },
               /*
                cosechas: {
                    frecuenciaAnual : 4,
                    fechas : ['2020-03-15', '2020-04-15', '2020-09-15', '2020-11-30'],
                }*/
            },
            variedades: ['castilla rosario', 'castilla naranjal', 'cenicafe 1', 'san bernardo',
            'catimor', 'supremo'
        ],
        },
        ['Plátano']: {

        },
        Aguacate: {

        },
        Pasto: {

        }
    },
    egresos: {
        primerSemestre: {
            manoDeObra: 23815000,
            insumos: 8224000,
            alimentos: 3387000,
            serviciosPublicos: 0
        }
    },
    ingresos: {
        primerSemestre: {
            cafe: 50490000,
            platano: 5660000,
            acuacate: 6600000,
            pasto: {
                animales: 4,
                costoAnimal: 1700000
            }
        }
    },

}
/**
 * Elemento que distribuye las capas 
 */
export default function Capas() {
    const classes = useStyles();
    const [infoFinca, setInfoFinca] = useState({...fincaInfo});
    const [cultivos, setCultivos] = useState(Object.keys(infoFinca.cultivos).toString());
    const [newInfo, setNewInfo] = useState(false);
   const [cultivosArray, setCultivosArray] = useState([]);
    const handleCultivosChange = (event) => {
        setCultivos(event.target.value);
      };
      const handleButtonClick = ()=>{
        setNewInfo(true);
      }
    
    return (
        <div className={classes.root}>
            <Grid container className={classes.root} direction='column' justify='center' alignContent='center'>

                <Typography variant="h5" component="h2">
                  1.  Información de la Finca
      </Typography>

            </Grid>
            <Grid container className={classes.root} justify='center' alignContent='center'>

                <TextField className={classes.textFieldStyles} size='small' id="outlined-basic" label="Nombre" value={infoFinca.nombre } onChange={(ev)=>setInfoFinca({...infoFinca, nombre : ev.target.value})}variant="outlined" />
                <TextField className={classes.textFieldStyles} size='small' id="outlined-basic" label="Hectareas" value={infoFinca.hectareas } onChange={(ev)=>setInfoFinca({...infoFinca, hectareas : ev.target.value})}variant="outlined" type='number' />
                <TextField className={classes.textFieldStyles} size='small' id="outlined-basic" label="Nm >" value={infoFinca.nm.mas } onChange={(ev)=>{
                    let newValue = {...infoFinca};
                    infoFinca.nm.mas = ev.target.value;
                    setInfoFinca({...newValue});
                }}variant="outlined" type='number' />
                <TextField className={classes.textFieldStyles} size='small' id="outlined-basic" label="Nm <" value={infoFinca.nm.menos } onChange={(ev)=>{
                    let newValue = {...infoFinca};
                    infoFinca.nm.menos = ev.target.value;
                    setInfoFinca({...newValue});
                }}variant="outlined" type='number' />

            </Grid>
         <Grid container direction='column' justify='center' alignContent='center'>
                        <Typography variant="h5" component="h2" align='center'>
                            PH
                         </Typography>

                        <Grid container justify='center'  alignContent='center'>
                            <Grid container justify='center' direction='column' alignContent='center'>
                                <Typography variant="subtitle1" component="h2" align='center'>
                                    Rango PH
      </Typography>
                                <Grid container justify='center' alignContent='center'>
                                    <TextField className={classes.textFieldStyles} size='small' id="outlined-basic" label="Minimo" 
                                    value={infoFinca.ph['Mínimo'] }
                                     onChange={(ev)=>{
                                            let newValue = {...infoFinca};
                                            newValue.ph['Mínimo'] = ev.target.value;
                                            setInfoFinca({...newValue})
                                    }} variant="outlined" type='number' />
                                    <TextField className={classes.textFieldStyles} size='small' id="outlined-basic" label="Máximo"
                                     value={infoFinca.ph['Máximo'] } 
                                    onChange={(ev)=>{
                                        let newValue = {...infoFinca};
                                        newValue.ph['Máximo'] = ev.target.value;
                                        setInfoFinca({...newValue})
                                    }}variant="outlined" type='number' />

                                </Grid>

                            </Grid>
                            <Grid container justify='center' direction='column' alignContent='center'>
                                <Typography variant="subtitle1" component="h2" align='center'>
                                    Corrección PH
      </Typography>
                                <Grid container justify='center' alignContent='center'>
                                    <TextField className={classes.textFieldStyles} size='small' id="outlined-basic" label="Frecuencia al año" value={infoFinca.correccionPh.frecuenciaAnual } 
                                    onChange={(ev)=>{
                                        let newValue = {...infoFinca};
                                        newValue.correccionPh.frecuenciaAnual = ev.target.value;
                                        setInfoFinca({...newValue})
                                    }} variant="outlined" type='number' />
                                    <TextField className={classes.textFieldStyles} size='small' id="outlined-basic" label="Costo Correccion PH" value={infoFinca.correccionPh.precio } 
                                    onChange={(ev)=>{
                                        let newValue = {...infoFinca};
                                        newValue.correccionPh.costoCorreccion = ev.target.value;
                                        setInfoFinca({...newValue})
                                    }} variant="outlined" type='number' />
                                     <TextField className={classes.textFieldStyles} size='small' id="outlined-basic" label="Tipo" value={infoFinca.correccionPh.tipo } 
                                    onChange={(ev)=>{
                                        let newValue = {...infoFinca};
                                        newValue.correccionPh.tipo = ev.target.value;
                                        setInfoFinca({...newValue})
                                    }} variant="outlined"  />


                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid container direction='column' justify='center' alignContent='center'>
                        <Typography variant="h5" component="h2" align='center'>
                            Cultivos
                         </Typography>

                        <Grid container justify='center'  alignContent='center'>
                            <Grid container justify='center' direction='column' alignContent='center'>
                                <Typography variant="subtitle1" component="h2" align='center'>
                                    Añada los cultivos separados por comas
      </Typography>
                                <Grid container justify='center' alignContent='center'>
                                    <TextField value={cultivos} onChange={handleCultivosChange} className={classes.textFieldStyles} size='small' id="outlined-basic" label="Cultivos" variant="outlined" />
                 
                                </Grid>

                            </Grid>
                         

                        </Grid>
                    </Grid>

            
                    <Grid container className={classes.root} justify='center' alignContent='center'>

                    <Button className={classes.buttonStyles} variant="contained" color="primary" onClick={handleButtonClick}>
  Añadir Información
</Button>
</Grid>
            <Grid container className={classes.root} direction='column' justify='center' alignContent='center'>

                <Typography variant="h6" component="h2">
                    Capas
      </Typography>
  

            </Grid>
            <Grid container className={classes.root} spacing={2} wrap='wrap' justify='center' alignContent='center'>
                {newInfo ? cultivos.split(',').map((el) => {
                     return (
                        <CapasInfo  key={uuid()} cultivo={el} frecuencias={null} />
                    )
                }) : 
                Object.entries(infoFinca.cultivos).map((el)=>{
                    return(
                        <CapasInfo key={uuid()} lotes={el[1].lotes} cultivo={el[0]} frecuencias={ Object.keys(el[1]).length > 0 ? Object.entries(el[1].frecuencias) : null} />
                    )
                })
            }
            </Grid>
        </div>
    );
}
