import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { allDespesa } from '../banco/sqLiteUser';
import Casa from '../assets/casa.png';
import Add from '../assets/add.png';
import Historic from '../assets/historic.png';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Historico({navigation}) {
    const route = useRoute();
    const id = route.params;
    const [load, setLoad] = useState(true);
    const [idDespesa, setIdDespesa] = useState({});
    const [data, setData] = useState({});
    const [desc, setDesc] = useState({});
    const [valor, setValor] = useState({});
     const pegaDespesa = async() =>{
         const pegar = await allDespesa(id.idC);
         console.log(pegar.length);
          for(var i=0;i<pegar.length;i++) {
            console.log(pegar[i]);
          }
     }
    useEffect(() =>{
        pegaDespesa()
        setTimeout(() => {
            setLoad(false)
        }, 500); 
      });

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 20, color: 'white'}}>Fluxo de Caixa</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.tempo}>
                    <View style={styles.borda}><Text style={{color: 'white', fontWeight: 'bold'}}>Todo Tempo</Text></View>
                </View>
            </View>
            <View style={styles.footer}>
                <Pressable onPress={()=>navigation.navigate('Home')}><Image style={styles.icons} source={Casa}/></Pressable>
                <Pressable onPress={()=>navigation.navigate('Home')} style={styles.iconsA}><Image style={styles.icons2} source={Add}/></Pressable>
                <Pressable onPress={()=>navigation.navigate('Historico')}><Image style={styles.icons} source={Historic}/></Pressable>
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      
    container: {
        flex: 1,
        backgroundColor: '#d3d3d3',
      },
    header: {
        flex: 0.5,
        width: '100%',
        backgroundColor: '#32CD32',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tempo: {
        borderColor: '#C0C0C0',
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A9A9A9'
    },
    borda: {
        borderWidth: 1,
        borderColor: '#C0C0C0',
        padding: 15,
        paddingHorizontal: 30,
        backgroundColor: 'gray',
        borderRadius: 25
    },
    body: {
        flex: 3,
        width: '100%',
        borderWidth: 1,
        borderColor: '#C0C0C0'
    },
    footer: {
        flex: 0.4,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        backgroundColor: 'white'
    },
    icons: {
        width: 30,
        height: 30,
      },
      icons2: {
        width: 25,
        height: 25,
      },
      iconsA: {
        padding: 10,
        backgroundColor: '#98FB98',
        borderRadius: 30,
        paddingHorizontal: 40,
      },
    
})