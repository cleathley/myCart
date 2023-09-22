import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'react-native-paper';
import {CustomSafeAreaView} from '../components/CustomSafeAreaView';

export default function HomeScreen(): ReactElement {
  const {t} = useTranslation();

  return (
    <CustomSafeAreaView>
      <Text variant="bodyLarge">{t('home.title')}</Text>
    </CustomSafeAreaView>
  );
}
