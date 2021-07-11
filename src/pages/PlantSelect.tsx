import React, { useEffect, useState} from 'react'; 
import { View, Text, StyleSheet, FlatList} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import api from '../services/api';

import { Header } from '../components/Header';
import { EnviromentButton } from '../components/EnviromentButton';
import { PlantCard } from '../components/PlantCard';
import { Loading } from '../components/Loading';

interface EnviromentProps {
    key: string; 
    title: string;
}
interface PlantsProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string],
    frequency: {
      times: number;
      repeat_every: string;
    }
}


export function PlantSelect(){

    const [ enviroments, setEnviroments] = useState<EnviromentProps[]>([]); 
    const [ plants, setPlants] = useState<PlantsProps[]>([]); 
    //criar um estado auxiliar (filteredPlants) ao estado 'plants', porque o plants vai trazer todos os dados da API e o estado auxiliar 
    //vai fazer os filtros, não sendo necessário fazer novamente requisições a cada chamada do estado. 
    const [ filteredPlants, setFilteredPlants ] = useState<PlantsProps[]>([]); 
    const [enviormentSelected, setEnviormentSelected] = useState('all');
    const [loading, setLoagind] = useState(true); 

    

    function handleEnvirormentSelected(category: string){
        setEnviormentSelected(category);

        //quando clicar no filtro, vamos verificar se a categoria selecionada é 'Todos', 
        //porque se for, vamos retornar não deixando essa função prosseguir, 
        // e vamos armazenar no estado das categorias filtradas todas as categorias que haviam sido carregadas pela api. 
        if(category === 'all'){
            return setFilteredPlants(plants); 
        } 
        //caso contrario, vamos percorrer cada planta verificando se ela possuí a categoria que estamos filtrando.
        else{
            const filtered = plants.filter(plant => 
                plant.environments.includes(category)
            );

            setFilteredPlants(filtered);
        }
    }   

    useEffect(() => {
        async function fetchEnvirioment(){
            const { data } = await api
            .get('plants_environments?_sort=title&_order=asc'); //que é o nome das categorias que queremos no json
            setEnviroments([
                {
                    key: 'all', 
                    title: 'Todos',
                },
                ...data
            ]); 
        }
        fetchEnvirioment();
    }, [])

    useEffect(() => {
        async function fetchPlants(){
            const { data } = await api.get('plants?_sort=name&_order=asc'); //que é o nome das categorias que queremos no json
            setPlants(data); 
            setFilteredPlants(data); 
            setLoagind(false); 
        }
        fetchPlants();
    }, [])


    if(loading)
        return <Loading /> 
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>

                <Text style={styles.subtitle}>
                    Você quer colocar sua planta?
                </Text> 
            </View>

            <View>
                <FlatList 
                    data={enviroments}
                    renderItem={({item}) => (
                        <EnviromentButton 
                            title={item.title}
                            //o item.key é igual ao valor que esta no estado 'enviormentSelected'?
                            active={item.key === enviormentSelected}
                            onPress={() => handleEnvirormentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />  
            </View>

            <View style={styles.plants}>
                <FlatList 
                    data={filteredPlants} //passa os dados filtrados
                    renderItem={( {item} ) => (
                        <PlantCard data={item} />
                    )}
                    showsVerticalScrollIndicator={false} // remover scroll 
                    numColumns={2} //mostrar a lista em 2 colunas
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: colors.background,
    }, 
    header:{
        paddingHorizontal: 30,
    },
    title:{
        fontSize: 17, 
        color: colors.heading, 
        fontFamily: fonts.heading, 
        lineHeight: 20, 
        marginTop: 15, 
    },
    subtitle:{
        fontFamily: fonts.text, 
        fontSize: 17, 
        lineHeight: 20, 
        color: colors.heading,
    },
    enviromentList:{
        height: 40, 
        justifyContent: 'center', 
        paddingBottom: 5, 
        marginLeft: 32, 
        marginVertical: 32
    }, 
    plants:{
        flex: 1, 
        paddingHorizontal: 32, 
        justifyContent: 'center'
    }, 
})