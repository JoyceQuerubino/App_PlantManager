import React, { useEffect, useState} from 'react'; 
import { View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

    const nevigation = useNavigation(); 

    const [ enviroments, setEnviroments] = useState<EnviromentProps[]>([]); 
    const [ plants, setPlants] = useState<PlantsProps[]>([]); 
    //criar um estado auxiliar (filteredPlants) ao estado 'plants', porque o plants vai trazer todos os dados da API e o estado auxiliar 
    //vai fazer os filtros, não sendo necessário fazer novamente requisições a cada chamada do estado. 
    const [ filteredPlants, setFilteredPlants ] = useState<PlantsProps[]>([]); 
    const [enviormentSelected, setEnviormentSelected] = useState('all');
    const [loading, setLoaging] = useState(true); 


    //estados para paginação
    //Cuida da página que estará com a paginação
    const [page, setPage] = useState(1); 
    //estado para ver se tem mais coisas para carregar
    const [LoadingMore, setLoadingMore] = useState(false); 


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

    //Função para carregar os cards da api
    async function fetchPlants(){
        const { data } = await api
        .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        // Se não tiver nada para carregar, traga o setLoading, 
        //porque significa que tudo já carregou. 
        if(!data)
            return setLoaging(true);

        //se a página for maior que 1, vou pegar o valor antigo e adicionar com o que esta chegando de novo
        //e juntar tudo no estado
        if(page > 1){
            setPlants(oldValue => [...oldValue, ...data]);
            setFilteredPlants(oldValue => [...oldValue, ...data]);
        }else{
            setPlants(data); 
            setFilteredPlants(data); 
        }
        setLoaging(false); //A animação de carregando principal
        setLoadingMore(false); //A animação mostrando que tem mais carregando
    }

    //função da páginação
    //Quando o usuário chegar ao final da rolagem, chame mais dados
    function handleFetchMore(distance:number){
        if(distance < 1)
            return; 
        setLoadingMore(true); 
        setPage(oldValue => oldValue + 1); //vai virar página 2
        fetchPlants();//chama a funçãoq ue carrega os dados da api
    }

    //Selecionar o card e ir para a paǵina dele
    //os dados são chamados pela 'PlantsProps' e adicionados no parametro 'plant', 
    //Assim quando chamarmos a página 'PlantSave' os dados ta,bém serão passados. 
    function handlePlantSelect(plant: PlantsProps){
        nevigation.navigate('PlantSave', { plant });
    };

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
                    keyExtractor={(item) => String(item.key)}
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
                    keyExtractor={(item) => String(item.id)}
                    renderItem={( {item} ) => (
                        <PlantCard 
                            data={item} 
                            onPress={() => handlePlantSelect(item)} //passamos o item que esta selecionado
                        />
                    )}
                    showsVerticalScrollIndicator={false} // remover scroll 
                    numColumns={2} //mostrar a lista em 2 colunas
                    onEndReachedThreshold={0.1} //quando o usuário chegar a 10% do final da tela faça o 'onEndReach'
                    onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd) }
                    ListFooterComponent={
                        //aparecer só quando o LoadingMore for verdadeiro
                        LoadingMore ?
                        <ActivityIndicator color={colors.green}/>
                        : <></> //quando não tiver mais nada, carregue i disfragmente que é nada. 
                    }
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