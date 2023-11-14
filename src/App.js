import React from 'react';
import Calculator from './Calculator';
import { AppContext, AppProvider } from './AppContext';

const App = () =>{
    return(
        <AppProvider>
          <Calculator />
        </AppProvider>
    )
}

export default App;
