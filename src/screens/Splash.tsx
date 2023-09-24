import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactElement, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import ENV from '../../.env';
import {RootNavigationStackParamList} from '../@types/navigation';
import {CustomSafeAreaView} from '../components/CustomSafeAreaView';

export default function SplashScreen(): ReactElement {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationStackParamList>>();

  // move to the home screen once the spash screen timeout has expired (yucky)
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, ENV.SPLASH_SCREEN_TIMEOUT);
  }, []);

  return (
    <CustomSafeAreaView>
      <Image
        style={styles.splashLogo}
        resizeMode="contain"
        source={require('../../assets/images/ninja-transparent-512.png')}
      />
      <Text variant="headlineLarge">{t('app.name')}</Text>
      <ActivityIndicator />
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  splashLogo: {
    height: 300,
    alignSelf: 'center',
  },
});
