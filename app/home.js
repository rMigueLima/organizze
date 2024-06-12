import { View, Text, Image, StyleSheet, Pressable, Modal, ActivityIndicator} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { all, selectById, allDespesa, createDespesa } from '../banco/sqLiteUser';
import { createConta } from '../banco/sqLiteUser';
import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import UserImg from '../assets/user.jpg';
import Sino from '../assets/alarm.png';
import Carteira from '../assets/carteira.png';
import Casa from '../assets/casa.png';
import Add from '../assets/add.png';
import Historic from '../assets/historic.png';
import { TextInput } from 'react-native-gesture-handler';
export default function Home({navigation}) {
    const route = useRoute();
    const id = route.params;
    const [dateComponentEnable, setDateComponentEnable] = useState(false);
    const [load, setLoad] = useState(true);
    const [enableModal, setEnableModal] = useState(false);
    const [enableModalC, setEnableModalC] = useState(false);
    const [despesa, setDespesa] = useState();
    const [idC, setIdC] = useState();
    const [nomeUser, setNomeUser] = useState();
    const [descricao, setDescricao] = useState();
    const [saldoConta, setSaldoConta] = useState(0);
    const [nomeConta, setNomeConta] = useState();

    const pega = async() => {
        const pegaDado = await selectById(id.id);
        setNomeUser(pegaDado.nome);
        setNomeConta(pegaDado.nomeConta);
        if(pegaDado.saldoConta === null) {
          setSaldoConta(0)
        } else {
          setSaldoConta(pegaDado.saldoConta)
        }
        await setIdC(pegaDado.id);
        console.log(idC);        
        console.log(pegaDado);
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
      const criaConta = async() => {
        const dadosConta = {
          'saldo':parseFloat(saldoConta),
          'idUser':idC,
        }
        console.log(dadosConta);
        const contaCriada = await createConta(dadosConta);
        console.log("R$"+ contaCriada.saldo+" depositado(s)");
        
      }
      const criaDespesa = async() => {

        const dadosDespesa = {
          'desc': descricao,
          'valorDespesa':parseInt(despesa),
          'data':data,
          'idUser':idC
        }
        console.log(dadosDespesa);
        // const despesa = await createDespesa(dadosDespesa);
        // console.log(despesa);
      }

      const todaDespesa = async() => {
        const allD = await allDespesa();
        console.log(allD);
      }

      state = {
        data: ''
      }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.pt1Header}>
                    <Pressable onPress={() => navigation.navigate('EditPerfil', { idC })}>
                        <Image source={UserImg} style={styles.imgUser}/>
                    </Pressable>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{fontSize: 18, color: 'white'}}>Bom Dia,</Text>
                        <View>
                            <Text style={{fontWeight: 'bold', fontSize: 22,color: 'white'}}>{ nomeUser }</Text>
                        </View>
                    </View>
                </View>
                <View style={{width: 100, justifyContent: 'center', alignItems: 'center'}}>
                    <Pressable style={styles.botao}>
                        <Image source={Sino} style={styles.btnSino}/>
                    </Pressable>
                </View>
            </View>
            <View style={styles.body}>
            </View>
            <View style={styles.areaSaldo}>
                <View style={styles.saldo}>
                    <Text style={{fontSize: 15}}>Saldo geral</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>R$ { saldoConta }</Text>
                </View>
                <View style={styles.minhasContas}>
                    <View>
                        <Text style={{fontWeight: 'bold', fontSize: 17}}>Minhas Contas</Text>
                    </View>
                    <View>
                        <View style={styles.contaDesc}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Image source={Carteira} style={styles.imgCarteira}/>
                                <Text style={{fontWeight: 'bold', marginRight: 10}}>{ nomeConta }</Text>
                                <Text>{ saldoConta } R$</Text>
                            </View>
                        </View>
                    </View>
                    <Pressable style={styles.trocaSaldo} onPress={()=>setEnableModalC(true)}>
                            <Text style={{color: '#228B22', fontWeight: 'bold',fontSize: 16}}>Alterar saldo</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.footer}>
                <Pressable onPress={navigation.navigate('Home')}><Image style={styles.icons} source={Casa}/></Pressable>
                <Pressable onPress={()=>setEnableModal(true)} style={styles.iconsA}><Image style={styles.icons2} source={Add}/></Pressable>
                <Pressable onPress={navigation.navigate('Home')}><Image style={styles.icons} source={Historic}/></Pressable>
            </View>

            <Modal
            animationType="slide"
            visible={enableModal}
            transparent={true}
            >
            <View style={styles.modalDespesa}>
                <View style={styles.areaValor}>
                    <Text style={{fontSize: 35, fontWeight: 'bold', color: 'white'}}>R$</Text>
                    <TextInput
                    style={styles.valorDespesa}
                    value={despesa}
                    placeholder='0,00'
                    onChangeText={setDespesa}
                    keyboardType='numeric'
                    />
                </View>
                <View style={styles.descs}>
                    <View style={styles.input}>
                        <Text style={styles.label}>Descrição</Text>
                        <View style={styles.areaInput}>
                        <Ionicons name='pencil-outline' size={25}/>
                        <TextInput
                        style={styles.areaDigita}
                        onChangeText={setDescricao}
                        value={descricao}
                        placeholder='Adicione a descrição'
                        />
                        </View>
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.label}>Pago com</Text>
                        <View style={styles.areaInput}>
                        <Ionicons name='wallet-outline' size={25}/>
                        <TextInput
                        style={styles.areaDigita}
                        onChangeText={setNomeConta}
                        value={nomeConta}
                        readOnly={true}
                        placeholder='Conta Inicial'
                        />
                        </View>
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.label}>Data</Text>
                        <View style={styles.areaInput}>
                          <Pressable onPress={()=>setDateComponentEnable(true)}>
                            <Ionicons name='duplicate-sharp' size={25}/>
                          </Pressable>
                        <TextInput
                        style={styles.areaDigita}
                        value={this.state.data}
                        readOnly={true}
                        placeholder='Hoje'
                        />
                        </View>
                    </View>

                </View>
            </View>
            <Pressable style={styles.confirmarDespesa} onPress={()=> criaDespesa()}>
                <Ionicons name='checkmark' size={45}/>
            </Pressable>
            <Pressable style={styles.fechaModal} onPress={()=> setEnableModal(false)}>
                <Ionicons name='close' size={20}/>
            </Pressable>
        </Modal>

        <Modal
        style={styles.addSaldoModal}
        transparent={true}
        visible={enableModalC}
        animationType='slide'
        >
          <View style={{flex: 1, backgroundColor: 'rgba(28,28,28, 0.7)'}}>
          <View style={styles.areaModal}>
            <View style={{backgroundColor: 'white', padding: 25, borderRadius:150}}>
              <Ionicons name='wallet' size={25}/>
            </View>
              <Text style={{fontWeight: 'bold', color: '#A9A9A9', fontSize: 18}}>Conta Inicial</Text>
              <Text style={{fontWeight: 'bold', color: 'gray', fontSize: 15}}>Defina o novo saldo da sua conta</Text>
              <View style={styles.areaInputC}>
                <View style={styles.inputC}>
                    <Text style={{color: 'gray', fontSize: 16}}>R$</Text>
                    <TextInput
                    style={styles.areaDigitaC}
                    value={saldoConta}
                    onChangeText={setSaldoConta}
                    placeholder='0,00'
                    keyboardType='numeric'
                    />
                </View>
              </View>
              <Pressable style={styles.confirmarDespesaC} onPress={()=> criaConta()}>
                <Ionicons name='checkmark' size={35}/>
              </Pressable>
              <Pressable style={styles.fechaModalC} onPress={()=> setEnableModalC(false)}>
                <Ionicons name='close' size={20}/>
              </Pressable>
          </View>
        </View>
        </Modal>

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
      dateComponent:{
        width: 350,
        position: 'absolute'
      },
      header: {
        paddingTop: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        backgroundColor: '#32CD32'
      },
      pt1Header: {
        width: 250,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        paddingStart: 20, 
        gap: 20
      },
      imgUser: {
        width: 80,
        height: 80,
        borderRadius: 150,
        borderWidth: 2,
        borderColor: 'white',
      },
      btnSino: {
        width: 25,
        height: 25,
        
      },
      botao: {
        width: 100, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#008000',
        width: 50,
        padding: 13,
        borderRadius: 15
      },
      body: {
        flex: 2,
        backgroundColor: '#F5F5F5'
      },
      areaSaldo: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 30,
        gap: 40,
        position: 'absolute',
        top: '23%',
        left: 20,
        width: 350,
        alignItems: 'center',
        justifyContent: 'center',
      },
      saldo: {
        width: 300,
        borderStartColor: '#32CD32',
        borderStartWidth:5,
        padding: 10,
        borderRadius: 2
      },
      minhasContas: {
        borderTopColor: 'gray',
        paddingVertical: 20,
        borderTopWidth: 1,
        width: 300,
      },
      contaDesc: {
        paddingTop: 20,
        width: 300,
        padding: 10
      },
      imgCarteira : {
        width: 25,
        height: 25,
      },
      trocaSaldo: {
        borderColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#98FB98',
        padding: 10,
        borderRadius: 5,
        marginTop: 30,
      },    
      footer: {
        flex: 0.4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
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
      modalDespesa: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        marginTop: 70,
        backgroundColor: 'transparent'
      },
      areaValor: {
        backgroundColor: 'gray',
        flex: 0.3,
        width: '100%',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      },
      valorDespesa: {
        fontSize: 45,
        color: 'white',
        width: '80%',
      },
      descs: {
        width: '100%',
        backgroundColor: '#4F4F4F',
        flex: 1,
        paddingVertical: 20,
      },
      input: {
        gap: 10,
        borderBottomWidth: 1,
        padding: 15,
        borderColor: '#363636'
      },
      label: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white'
      },
      areaInput: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        gap: 15,
        flexDirection: 'row',
        color: 'white'
      },
      areaDigita: {
        width: '100%',
        padding: 15,
        color: 'white',
        fontWeight: 'bold'
      },
      confirmarDespesa: {
        backgroundColor: '#98FB98',
        padding: 30,
        position: 'absolute',
        borderRadius: 150,
        top: '80%',
        left: '36.5%'
      },
      confirmarDespesaC: {
        backgroundColor: '#98FB98',
        padding: 15,
        position: 'absolute',
        borderRadius: 150,
        top: '106%',
        left: '40%'
      },
      fechaModal: {
        backgroundColor: '#FF6347',
        padding: 10,
        position: 'absolute',
        borderRadius: 150,
        top: '6%',
        left: '45%'
      },
      fechaModalC: {
        backgroundColor: '#FF6347',
        padding: 10,
        position: 'absolute',
        borderRadius: 150,
        top: '5%',
        left: '83%'
      },
      addSaldoModal: {
        backgroundColor: 'gray',
        flex: 1,
      },
      areaModal: {
        backgroundColor: '#1C1C1C',
        position: 'absolute',
        top: '15%',
        left: '7.5%',
        width: 330,
        height: 400,
        paddingVertical: 30,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20
      },
      areaInputC: {
        borderWidth: 1,
        borderColor: 'white',
        width: '75%',
        padding: 15,
        borderRadius: 12,

      },
      inputC: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        gap: 5,
      },
      areaDigitaC: {
        fontSize: 22,
        width: '90%',
        color: 'white'
      }

});