import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native';
import Logo from '../assets/logo.png';
import { useState } from 'react';
import { verificaDados } from '../banco/sqLiteUser';
export default function App({navigation}) {
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    let id;
    const logar = async() => {
        const verifica = await verificaDados(email, senha);
        id = verifica.id;
        if(verifica) {
            navigation.navigate('Home', { id });
    
        } else {
            console.log("Dados errados cuzao");
        };
    }
 
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={Logo} style={styles.areaLogo}/>
                <Text style={{fontWeight: 'bold', fontSize: 25,marginTop: 10}}>Bem vindo novamente!</Text>
                <Text style={{width: 220, textAlign: 'center', fontSize: 15}}>Acesse sua conta para começar a controlar sua grana</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.input}>
                    <Text style={{fontSize: 17}}>Email</Text>
                    <TextInput
                    style={styles.areaDigita}
                    onChangeText={setEmail}
                    value={email}
                    placeholder='Digite seu email'
                    />
                </View>

                <View style={styles.input}>
                    <Text style={{fontSize: 17}}>Senha</Text>
                    <TextInput
                    style={styles.areaDigita}
                    onChangeText={setSenha}
                    value={senha}
                    placeholder='Digite sua senha'
                    />
                </View>
                <View style={{gap: 10}}>
                <Pressable style={styles.botao} onPress={() =>logar()}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Continuar</Text>
                </Pressable>
                <Text style={{width: 300, fontWeight: 'bold', fontSize: 13, color: 'gray'}}>Ao criar sua conta você concorda com nossos <Text style={{color:'green', fontWeight: 'bold'}}>Termos de Uso e Políticas de Privacidade</Text></Text>
                </View>
            </View>

            <View style={styles.footer}>
                <View style={styles.areaMeios}>
                    <View style={styles.outrosMeios}><Text>cu</Text></View>
                    <View style={styles.outrosMeios}><Text>cu</Text></View>
                    <View style={styles.outrosMeios}><Text>cu</Text></View>
                </View>
                <Pressable style={{marginBottom: 10}} onPress={() =>navigation.navigate('Cadastro')}>
                    <Text style={{color: 'green', fontWeight: 'bold', fontSize: 16}}>Criar conta</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
        flex: 1.3,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    areaLogo: {
        width: 120,
        height: 25.5,
        marginTop: 20,
    },
    body: {
        flex: 2.5,
        justifyContent: 'center',
        gap: 35,
        borderBottomWidth: 1,
        borderBottomColor: 'gray'
    },
    input: {
        width: 300,
        gap: 9
    },
    areaDigita: {
        gap: 15,
        width: 300,
        borderWidth: 1,
        padding: 20,
        borderRadius: 8,
        borderColor: '#C0C0C0'
    },
    botao: {
        width: 300,
        backgroundColor: '#C0C0C0',
        alignItems: 'center',
        paddingVertical: 20,
        borderRadius: 8,
        marginTop: 15
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        alignItems: 'center',
        width: 300,
    },
    areaMeios: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },
    outrosMeios: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#C0C0C0',
        padding: 24,
        paddingHorizontal: 27
    },

  });