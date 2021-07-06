import React from 'react';
import AppLoading from 'expo-app-loading'; 
import {
  useFonts, 
  Jost_400Regular, 
  Jost_600SemiBold
} from '@expo-google-fonts/jost'; 

import Routes from './src/routes';


export default function App() {

  const [ fontsLoaded ] = useFonts({
    Jost_400Regular, 
    Jost_600SemiBold
}); 

// Para se as fontes não serem carregadas a tela pear vai continuar aparecendo, até que tudo seja carregado
if (!fontsLoaded){
  return <AppLoading />
}

  return (
    <Routes/>
  );
}