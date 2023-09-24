import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'react-native-paper';
import {RootNavigationStackParamList} from '../@types/navigation';
import {CustomSafeAreaView} from '../components/CustomSafeAreaView';
import {StyleSheet} from 'react-native';

export default function CheckoutScreen(): ReactElement {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationStackParamList>>();

  return (
    <CustomSafeAreaView style={styles.container}>
      <Text variant="labelLarge">{t('checkout.title')}</Text>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    width: '90%',
  },
});
