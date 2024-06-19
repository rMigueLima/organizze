import { createStackNavigator } from "@react-navigation/stack";
import Cadastro from './app/cadastro';
import { NavigationContainer } from '@react-navigation/native';
import Login from './app/login';
import Home from './app/home';
import EditPerfil from './app/editPerfil';
import Historico from './app/historico';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cadastro" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Cadastro" component={Cadastro}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name ="Home" component={Home}/>
        <Stack.Screen name ="EditPerfil" component={EditPerfil}/>
        <Stack.Screen name ="Historico" component={Historico}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
