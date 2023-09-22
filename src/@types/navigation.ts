import {RouteProp} from '@react-navigation/native';

export type RootNavigationStackParamList = {
  // individual screens
  Browser: {title: string; url: string};
  Home: undefined;
  Splash: undefined;
};

// export the individual screen props (built from the above list)
export type BrowserScreenRouteProp = RouteProp<
  RootNavigationStackParamList,
  'Browser'
>;
