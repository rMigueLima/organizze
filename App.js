import { createStackNavigator } from "@react-navigation/stack";
import Cadastro from './app/cadastro';
import { NavigationContainer } from '@react-navigation/native';
import Login from './app/login';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cadastro" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Cadastro" component={Cadastro}/>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}