import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import AppBarHeader from './Atoms/AppBarHeader';
import Capas from './Atoms/Capas';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '5px'
  },
  button: {
    margin: theme.spacing(1),
  },
  cardStyles: {
    flexGrow: 1,
    marginTop: '15px'
  }
}));

/**
 * Punto de entrada de la aplicación, renderiza toda la app. 
 */
function App() {
  const classes = useStyles();
  const [userTextInput, setUserTextInput] = useState('');
  const [translationSelected, setTranslationSelected] = useState('Español-Embera');
  const handleChange = (ev) => setUserTextInput(ev);
  const selectChanged = (ev) => setUserTextInput(ev);
  const simpleSelectHandleChange = (ev) => setTranslationSelected(ev);
  return (
    <div className="App">
      <header className="App-header">
        <AppBarHeader />
      </header>
      <section>
        <Grid container className={classes.root} spacing={2} justify='center' alignContent='center'>
          <Capas />
        </Grid>
      </section>
      <section>
        <Grid container className={classes.cardStyles} spacing={2} justify='center' alignContent='center'>
        </Grid>
      </section>
    </div>
  );
}

export default App;