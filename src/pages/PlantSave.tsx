import React from 'react'; 
import {
    Alert, 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    ScrollView, 
    Platform, 
    TouchableOpacity,
} from 'react-native'; 

import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';

import waterDrop from '../assets/waterdrop.png';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function PlantSave(){
    return(
        <View style={styles.container}>
            <View style={styles.plantInfo}> 
                <SvgFromUri 
                    uri=""
                    width={150}
                    height={150}
                />
                
                <Text style={styles.plantName}>
                    Nome da planta
                </Text>
                <Text style={styles.plantAbout}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis rem sint quis quis quam dolorem cum aspernatur tempora?  
                </Text>
            </View>

            <View style={styles.controller}>
                <View style={styles.tipContain}>
                    <Image 
                        source={waterDrop}
                        style={styles.tipImage}
                    />
                    <Text style={styles.tipText}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                    </Text>
                </View>

                <Text style={styles.alertLabel}>
                    Escolha o melhor horário para ser lembrado:
                </Text>

                <Button 
                    title="Cadastrar planta"
                    onPress={() => {}} //onpress que não faz nada
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'space-between', 
        backgroundColor: colors.shape,
    }, 
    plantInfo:{
        flex: 1,
        paddingHorizontal: 30, 
        paddingVertical: 50, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: colors.shape, 

    },
    controller:{
        backgroundColor: colors.white, 
        paddingHorizontal: 20, 
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20, 
    }, 
    plantName:{
        fontFamily: fonts.heading,
        fontSize: 24, 
        color: colors.heading, 
        marginTop: 15,
    }, 
    plantAbout:{
        textAlign: 'center', 
        fontFamily: fonts.text, 
        color: colors.heading, 
        fontSize: 17, 
        marginTop: 10,
    }, 
    tipContain:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: colors.blue_light, 
        padding: 20, 
        borderRadius: 20, 

        //para ele subir em cima da parte branca
        position: 'relative', 
        bottom: 60, 
    },
    tipImage:{
        width: 50, 
        height: 50, 
    }, 
    tipText:{
        flex: 1, 
        marginLeft: 20, 
        fontFamily: fonts.text, 
        color: colors.blue, 
        fontSize: 17, 
        textAlign: 'justify', 
    }, 
    alertLabel:{
        textAlign: 'center', 
        fontFamily: fonts.complement, 
        color: colors.heading, 
        fontSize: 12, 
        marginBottom: 5, 
    }
});