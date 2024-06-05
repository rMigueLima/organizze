import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { TextInput } from 'react-native-web';
import Cadastro from '../assets/cadastroA.png';
export default function App({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.imagem} source={Cadastro}/>
        <Text style={{fontWeight: 'bold', fontSize: 22}}>Crie sua conta como quiser</Text>
        <Text style={{color: 'gray', fontWeight: 'bold', width: 200, textAlign: 'center'}}>Crie sua conta para começar a controlar sua grana</Text>
        <View style={{marginTop: 20, gap: 15}}>
          <Pressable style={styles.botaos}>
            <Text style={{fontWeight: 'bold'}}>Registre-se com o Facebook</Text>
          </Pressable>
          <Pressable style={styles.botaos}>
            <Text style={{fontWeight: 'bold'}}>Registre-se com o Google</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.body}>

        <View style={styles.input}>
          <Text style={styles.span}>Seu email</Text>
          <TextInput style={styles.areaDigita}/>
        </View>
        
        <View style={styles.inputs}>
          <View style={styles.input2}>
            <Text style={styles.span}>Sua senha</Text>
            <TextInput style={styles.areaDigita}/>
          </View>

        <View style={styles.input2}>
          <Text style={styles.span}>Repetir senha</Text>
          <TextInput style={styles.areaDigita}/>
        </View>

        </View>
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.irLogin} onPress={() => navigation.navigate('Login')}>
          <View style={{ color: 'white', fontSize: 18}}>Começar a usar</View>
        </Pressable>
      </View>
      <StatusBar style="auto" />
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
    flex: 2.5,
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
    borderRadius: 6,
    width: 300,
    borderColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  body: {
    flex: 1,
    paddingVertical: 15,
    gap: 15
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
    borderRadius: 6,
    padding: 9,
  },
  footer: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  irLogin: {
    backgroundColor: '#32CD32',
    width: 300,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center'
  }
});
