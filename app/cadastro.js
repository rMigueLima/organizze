import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image, TextInput } from 'react-native';
import { create } from '../banco/sqLiteUser';
import Cadastro from '../assets/cadastroA.png';
import { useState } from 'react';
export default function App({navigation}) {
  const [id, setId] = useState();
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [telefone, setTelefone] = useState();
   const insertDados = async() => {
    const dados = {
      'nome':nome,
      'email':email,
      'senha':senha,
      'telefone':telefone,
      }
    
    const criar = await create(dados);
    console.log(criar);
    setId(criar);
    if(!criar) {

    } else {
      navigation.navigate('Login',{ id })
    }
    
    }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.imagem} source={Cadastro}/>
        <Text style={{fontWeight: 'bold', fontSize: 22}}>Crie sua conta como quiser</Text>
        <Text style={{color: 'gray', fontWeight: 'bold', width: 200, textAlign: 'center'}}>Crie sua conta para começar a controlar sua grana</Text>
        <View style={{marginTop: 20, gap: 15}}>
          <Pressable style={styles.botaos}>
            <Text style={{fontWeight: 'bold'}}>Registre-se com o Google</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.body}>

      <View style={styles.input}>
          <Text style={styles.span}>Seu nome</Text>
          <TextInput 
          style={styles.areaDigita}
          onChangeText={setNome}
          value={nome}
          />
      </View>

        <View style={styles.input}>
          <Text style={styles.span}>Seu email</Text>
          <TextInput 
          style={styles.areaDigita}
          onChangeText={setEmail}
          value={email}
          />
        </View>
        
        <View style={styles.inputs}>
          <View style={styles.input2}>
            <Text style={styles.span}>Sua senha</Text>
            <TextInput 
            style={styles.areaDigita}
            onChangeText={setSenha}
            value={senha}
            />
          </View>

        <View style={styles.input2}>
          <Text style={styles.span}>Seu Telefone</Text>
          <TextInput 
          style={styles.areaDigita}
          onChangeText={setTelefone}
          keyboardType='numeric'
          value={telefone}
          />
        </View>

        </View>
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.irLogin} onPress={() =>insertDados()}>
          <View style={{fontSize: 18}}><Text style={{color:'white'}}>Criar Conta</Text></View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={{width: 300, textAlign: 'center', fontSize: 14}}>Já tem uma conta? <Text style={{color: 'green', fontWeight: 'bold'}}>Fazer Login</Text></Text>
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingVertical: 30
  },
  imagem: {
    width: 200,
    height: 200
  },
  botaos: {
    borderWidth: 1,
    borderRadius: 8,
    width: 300,
    borderColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  body: {
    flex: 2,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 35
  },
  span: {
    fontWeight: 'bold',

  },
  input: {
    width: 300,
    gap: 10,
  },
  inputs: {
    width: 300,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input2: {
    width: 145,
    gap: 10,
  },
  areaDigita: {
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 8,
    padding: 15,
  },
  footer: {
    flex: 0.6,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 15,
    paddingVertical: 15
  },
  irLogin: {
    backgroundColor: '#32CD32',
    width: 300,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  }
});
