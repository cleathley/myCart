import {RouteProp} from '@react-navigation/native';
import {Product} from './product';

export type RootNavigationStackParamList = {
  // individual screens
  Splash: undefined;
  Home: undefined;
  Product: {product: Product};
};

// export the individual screen props (built from the above list)
export type ProductScreenRouteProp = RouteProp<
  RootNavigationStackParamList,
  'Product'
>;
