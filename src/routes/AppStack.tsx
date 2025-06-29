import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTab from './AppTab';
import ClientCreateScreen from '../screens/ClientCreateScreen';
import SaleCreateScreen from '../screens/SaleCreateScreen';
import { propsNavigationStack } from '../interfaces/RoutesProps';

const { Navigator, Screen } =
  createNativeStackNavigator<propsNavigationStack>();

const AppStack: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="AppTab" component={AppTab} />
      <Screen name="ClientCreate" component={ClientCreateScreen} />
      <Screen name="SaleCreate" component={SaleCreateScreen} />
    </Navigator>
  );
};

export default AppStack;
