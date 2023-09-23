import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactElement, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, FlatList, Image, StyleSheet} from 'react-native';
import {Card, IconButton, Text} from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import {
  ProductScreenRouteProp,
  RootNavigationStackParamList,
} from '../@types/navigation';
import {ProductVariation} from '../@types/product';
import {CustomSafeAreaView} from '../components/CustomSafeAreaView';
import formatCurrency from '../support/formatCurrency';
import log from '../support/logger';

export default function ProductScreen(): ReactElement {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationStackParamList>>();
  const route = useRoute<ProductScreenRouteProp>();

  // get the product passed into from the navigation params
  const {product} = route.params;

  const screenWidth = Dimensions.get('window').width;

  // on load, set the screen title to be the product name
  useEffect(() => {
    navigation.setOptions({
      title: product.name,
      headerBackTitleVisible: false,
    });
  }, [navigation, product]);

  const Item = ({data}: {data: ProductVariation}) => (
    <Card
      mode="contained"
      style={styles.item}
      onPress={() => {
        log.warn('ouch');
      }}>
      <Card.Title
        title={t('product.variationTitle', {
          title: data.name,
          price: formatCurrency(data.price),
        })}
        titleVariant="titleLarge"
        right={props => <IconButton {...props} icon="cart-plus" />}
      />
    </Card>
  );

  return (
    <CustomSafeAreaView style={styles.container}>
      <Carousel
        loop
        width={screenWidth - 16}
        height={screenWidth / 2}
        autoPlay={true}
        data={product.images}
        scrollAnimationDuration={1000}
        renderItem={({index}) => (
          <Image
            source={{uri: product.images[index]}}
            resizeMode="cover"
            style={{width: screenWidth, height: screenWidth / 2}}
          />
        )}
      />
      <Card.Content style={styles.card}>
        <Text variant="titleMedium">{product.name}</Text>
        <Text variant="bodyMedium">{product.description}</Text>
      </Card.Content>

      <Text variant="headlineSmall" style={styles.variantHeading}>
        {t('product.entries')}
      </Text>
      <FlatList
        style={styles.faltList}
        data={product.variations}
        renderItem={({item}) => <Item data={item} />}
        keyExtractor={(item: ProductVariation) => item.id}
      />
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: '100%',
  },
  variantHeading: {
    paddingVertical: 8,
  },
  faltList: {
    width: '96%',
  },
  item: {
    marginBottom: 8,
  },
});