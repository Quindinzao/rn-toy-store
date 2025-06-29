// External libraries
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type propsNavigationStack = {
  Login: undefined;
  Register: undefined;
  ClientCreate: undefined;
  SaleCreate: { email: string };
  AppTab: undefined;
};

export type propsStack = NativeStackNavigationProp<propsNavigationStack>;
export type propsSaleCreateStack = NativeStackScreenProps<
  propsNavigationStack,
  'SaleCreate'
>;
