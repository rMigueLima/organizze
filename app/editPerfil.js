import { View, Text, Image, StyleSheet, Pressable, TextInput, ActivityIndicator } from 'react-native';
import UserImg from '../assets/user.jpg';
import { useState, useEffect } from 'react';
import { selectById } from '../banco/sqLiteUser';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

export default function Home({navigation}) {
  const route = useRoute();
  const id = route.params;
    const [load, setLoad] = useState(false);
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [read, setRead] = useState(true);

    const pega = async() => {
      const tudo = await selectById(id.idC);
      console.log(tudo);
      setNome(tudo.nome)
      setEmail(tudo.email)
      setSenha(tudo.senha)
    }

    function editarInput() {
      setRead(false);
      if(read == false) {
        setRead(true)
      }
    }
    useEffect(() =>{
      pega()
        setTimeout(() => {
          setLoad(false)
        }, 1000);
      });

      if(load) {
        return <ActivityIndicator
        style={styles.loading}
        size="large"
        color="#32CD32"
        />
      }

    return (
        <View style={styles.container}> 
        <View style={styles.header}>
            <Pressable onPress={()=> navigation.navigate('Home')}>
                <Text style={styles.textHeader}>Voltar</Text>
            </Pressable>
            <Text style={styles.textHeader1}>Editar Perfil</Text>
            <Pressable>
                <Text style={styles.textHeader}>Salvar</Text>
            </Pressable>
        </View>
        <View style={styles.body}>
            <View style={styles.areaImg}>
                <Image source={UserImg} style={styles.img}/>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{ nome }</Text>
            </View>
            <View style={styles.areaInput}>
                <View style={styles.input}>
                    <Text style={styles.label}>Nome</Text>
                    <View style={{flexDirection: 'row', paddingHorizontal: 10, gap: 10, alignItems: 'center'}}>
                        <Ionicons name='person-circle-outline' size={35}/>
                    <TextInput
                    style={styles.areaDigita}
                    placeholder='Nome'
                    onChangeText={nome=>setNome(nome)}
                    value={nome}
                    readOnly={read}
                    />
                     <Pressable onPress={()=> editarInput()}>
                        <Ionicons style={{paddingLeft: 5}} name='pencil-sharp' size={25}/>
                     </Pressable>
                    </View>
                </View>
                <View style={styles.input}>
                    <Text style={styles.label}>Email</Text>
                    <View style={{flexDirection: 'row', paddingHorizontal: 12, gap: 13, alignItems: 'center'}}>
                        <Ionicons name='logo-mastodon' size={30}/>
                    <TextInput
                    style={styles.areaDigita}
                    placeholder='Email'
                    onChangeText={email=>setEmail(email)}
                    value={email}
                    readOnly={read}
                    />
                    <Pressable onPress={()=> editarInput()}>
                      <Ionicons style={{paddingLeft: 2}} name='pencil-sharp' size={25}/>
                     </Pressable>
                    </View>
                </View>
                <View style={styles.input}>
                    <Text style={styles.label}>Senha</Text>
                    <View style={{flexDirection: 'row', paddingHorizontal: 13, gap: 12, alignItems: 'center'}}>
                    <Ionicons name='lock-closed' size={30}/>
                    <TextInput
                    style={styles.areaDigita}
                    placeholder='Senha'
                    onChangeText={senha=>setSenha(senha)}
                    value={senha}
                    readOnly={read}
                    />
                    <Pressable onPress={()=> editarInput()}>
                     <Ionicons style={{paddingLeft: 3}} name='pencil-sharp' size={25}/>
                     </Pressable>
                    </View>
                </View>
            </View>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 30,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: '#808080'
      },
      textHeader: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
      },
      textHeader1: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 19,
        paddingBottom: 10,
      },
      body: {
        flex: 7
      },
      areaImg: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        padding: 20,
      },
      img: {
        width: 200,
        height: 200,
        borderRadius: 150,
        borderWidth: 2,
        borderColor: 'black'
      },
      areaInput: {
        paddingVertical: 15,
        gap: 15,
        borderTopColor:'#C0C0C0',
        borderTopWidth: 1,
      },
      label: {
        fontWeight: 'bold',
        fontSize: 17,
        paddingHorizontal: 10,
      },
      input: {
        gap: 10,
        justifyContent: 'center',
        paddingVertical: 20,
      },
      areaDigita: {
        padding: 15,
        width: 280,
        backgroundColor: '#F8F8FF',
        borderRadius: 20,
      }

});