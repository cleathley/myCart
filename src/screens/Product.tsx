import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'react-native-paper';
import {CustomSafeAreaView} from '../components/CustomSafeAreaView';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ProductScreenRouteProp,
  RootNavigationStackParamList,
} from '../@types/navigation';

export default function ProductScreen(): ReactElement {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationStackParamList>>();
  const route = useRoute<ProductScreenRouteProp>();

  return (
    <CustomSafeAreaView>
      <Text variant="bodyLarge">{t('product.title')}</Text>
    </CustomSafeAreaView>
  );
}
