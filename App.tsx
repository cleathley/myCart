import React, {ReactElement} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
  useNavigationContainerRef,
} from '@react-navigation/native';
import merge from 'deepmerge';
import {
  MD3DarkTheme as MaterialDarkTheme,
  MD3LightTheme as MaterialLightTheme,
  Provider as PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';
import ENV from './.env';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import './src/i18n/i18n';

// import the screens
import SpashScreen from './src/screens/Splash';
import HomeScreen from './src/screens/Home';
import {RootNavigationStackParamList} from './src/@types/navigation';

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
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
              name="Splash"
              component={SpashScreen}
              options={{
                headerShown: false,
                animation: 'none',
              }}
            />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;
