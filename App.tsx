import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import axios from 'axios';
import merge from 'deepmerge';
import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {StatusBar, useColorScheme} from 'react-native';
import {
  MD3DarkTheme as MaterialDarkTheme,
  MD3LightTheme as MaterialLightTheme,
  Provider as PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ENV from './.env';
import {RootNavigationStackParamList} from './src/@types/navigation';
import CustomCartButton from './src/components/navigation/CustomCartButton';
import {CartProvider} from './src/context/Cart';
import './src/i18n/i18n';

// import the screens
import CartScreen from './src/screens/Cart';
import CheckoutScreen from './src/screens/Checkout';
import HomeScreen from './src/screens/Home';
import ProductScreen from './src/screens/Product';
import SpashScreen from './src/screens/Splash';

// adapt the navigation themes from the paper themes
const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationLightTheme,
  reactNavigationDark: NavigationDarkTheme,
});
// and merge everything together
const availableThemes = {
  combinedLightTheme: merge(MaterialLightTheme, LightTheme),
  combinedDarkTheme: merge(MaterialDarkTheme, DarkTheme),
};

// set the defaults for axios (as we are working with json)
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = ENV.SERVER_TIMEOUT;

const Stack = createNativeStackNavigator();

function App(): ReactElement {
  const {t} = useTranslation();
  const navigationRef =
    useNavigationContainerRef<RootNavigationStackParamList>();

  // get the system colour scheme and use it as the default (if the user has
  // not overridden it within the app)
  const colorScheme = useColorScheme() ?? 'light';
  const [isThemeDark, setIsThemeDark] = React.useState(
    colorScheme === 'dark' ? true : false,
  );

  let currentTheme = isThemeDark
    ? availableThemes.combinedDarkTheme
    : availableThemes.combinedLightTheme;

  return (
    <PaperProvider theme={currentTheme}>
      <StatusBar
        backgroundColor={currentTheme.colors.card}
        barStyle={isThemeDark ? 'light-content' : 'dark-content'}
      />
      <CartProvider>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef} theme={currentTheme}>
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{
                headerRight: () => <CustomCartButton />,
              }}>
              <Stack.Screen
                name="Splash"
                component={SpashScreen}
                options={{
                  headerShown: false,
                  animation: 'none',
                }}
              />
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  title: t('home.screenTitle'),
                }}
              />
              <Stack.Screen
                name="Product"
                component={ProductScreen}
                options={{
                  title: '', // this is dynamically set
                }}
              />
              <Stack.Screen
                name="Cart"
                component={CartScreen}
                options={{
                  title: t('cart.screenTitle'),
                }}
              />
              <Stack.Screen
                name="Checkout"
                component={CheckoutScreen}
                options={{
                  title: t('checkout.screenTitle'),
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </CartProvider>
    </PaperProvider>
  );
}

export default App;
