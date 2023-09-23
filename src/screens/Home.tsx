import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, Card, Text} from 'react-native-paper';
import {CustomSafeAreaView} from '../components/CustomSafeAreaView';
import log from '../support/logger';
import ENV from '../../.env';
import {FlatList, StyleSheet, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootNavigationStackParamList} from '../@types/navigation';
import products from '../constants/products';
import {Product} from '../@types/product';
import formatCurrency from '../support/formatCurrency';

export default function HomeScreen(): ReactElement {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationStackParamList>>();

  const onPressTest = () => {
    navigation.navigate('Product', {product: null});
  };

  const Item = ({data}: {data: Product}) => (
    <Card
      mode="contained"
      style={styles.card}
      onPress={() => {
        // navigate to the product detals page
        navigation.navigate('Product', {product: data});
      }}>
      <Card.Cover source={{uri: data.heroImage}} />
      <Card.Content>
        <Text variant="titleMedium">{data.name}</Text>
        <Text variant="bodyMedium">
          {t('home.cardPrice', {price: formatCurrency(data.price)})}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <CustomSafeAreaView>
      <View style={styles.row}>
        <Text variant="headlineSmall">{t('home.title')}</Text>
      </View>
      <FlatList
        style={styles.faltList}
        data={products}
        renderItem={({item}) => <Item data={item} />}
        keyExtractor={(item: Product) => item.id}
      />
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  faltList: {
    width: '100%',
  },
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
