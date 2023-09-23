import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {RootNavigationStackParamList} from '../@types/navigation';
import {Product} from '../@types/product';
import {CustomSafeAreaView} from '../components/CustomSafeAreaView';
import products from '../constants/products';
import formatCurrency from '../support/formatCurrency';

export default function HomeScreen(): ReactElement {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationStackParamList>>();

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
