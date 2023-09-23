import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import merge from 'deepmerge';
import React, {ReactElement} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {
  Badge,
  IconButton,
  MD3DarkTheme as MaterialDarkTheme,
  MD3LightTheme as MaterialLightTheme,
  Provider as PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootNavigationStackParamList} from './src/@types/navigation';
import './src/i18n/i18n';
import log from './src/support/logger';

// import the screens
import HomeScreen from './src/screens/Home';
import ProductScreen from './src/screens/Product';
import SpashScreen from './src/screens/Splash';
import {useTranslation} from 'react-i18next';

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
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef} theme={currentTheme}>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerRight: () => (
                <>
                  <IconButton
                    icon="cart"
                    onPress={() => log.warn('@todo: goto cart screen')}
                  />
                  <Badge style={{position: 'absolute', top: 4, right: -4}}>
                    3
                  </Badge>
                </>
              ),
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
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;
