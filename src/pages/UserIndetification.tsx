import React, {useState} from 'react'; 
import {
    SafeAreaView,
    StyleSheet,
    View, 
    Text, 
    TextInput, 
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard
} from 'react-native'; 
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../components/Button'; 

export function UserIndetification(){

    const nevigation = useNavigation(); 

    const [isFocused, setIsFocused] = useState(false); 
    const [isFilled, setIsFilled] = useState(false); //para ver se está preenchido
    const [name, setName] = useState<string>(); // para pegar o texto do usuário, vamos tipar como string

    function handleConfirmation(){
        nevigation.navigate('Confirmation')
    }

    function handleInputBlur(){
        setIsFocused(false); 
        setIsFilled(!!name) //verifica se tem conteúdo continua verde
    }   

    function handleInputFocus(){
        setIsFocused(true)
    }

    //identificar toda vez que o input mudar
    function handleInputChange(value: string){
        // !! transforam o value em um booleano
        //ou seja, se tem conteúdo é true se não tem é false
        setIsFilled(!!value)
        setName(value)
    }

    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height' /*serve para o teclado não cobrir as coisas*/}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    { isFilled ? '😁' : '😊' }
                                </Text>
                                <Text style={styles.title}>Como podemos {'\n'} chamar você?</Text>
                                <TextInput 
                                    style={[
                                        styles.input, 
                                        (isFocused || isFilled) && { borderBottomColor: colors.green} //ou é focus ou é preenchido, então deixe verde
                                    ]}
                                    placeholder= "Digite um nome"
                                    onBlur={handleInputBlur}
                                    onFocus={handleInputFocus}
                                    onChangeText={handleInputChange}
                                />
                            </View>
                            <View style={styles.footer}>
                                <Button 
                                    title ="Confirmar"
                                    onPress={handleConfirmation}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>     
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'space-around'
    }, 
    content: {
        flex: 1, 
        width: '100%', 
    }, 
    form: {
        flex: 1, 
        justifyContent: 'center', 
        paddingHorizontal: 54, 
        alignItems: 'center', 
    }, 
    header: {
        alignItems: 'center', 
    }, 
    emoji: {
        fontSize: 44, 
    }, 
    input: {
        borderBottomWidth: 2, 
        borderBottomColor: colors.gray, 
        color: colors.heading, 
        width: '100%', 
        fontSize: 18, 
        marginTop: 50, 
        padding: 10, 
        textAlign: 'center', 
    }, 
    title: {
        fontSize: 24,
        lineHeight: 32,  
        textAlign: 'center', 
        color: colors.heading, 
        fontFamily: fonts.heading,
        marginTop: 20
    }, 
    footer:{
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20

    }
})