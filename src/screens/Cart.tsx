import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Button, DataTable, Text} from 'react-native-paper';
import {CartItem} from '../@types/cart';
import {RootNavigationStackParamList} from '../@types/navigation';
import {CustomSafeAreaView} from '../components/CustomSafeAreaView';
import {useCart} from '../context/Cart';
import formatCurrency from '../support/formatCurrency';

export default function CartScreen(): ReactElement {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationStackParamList>>();
  const {cartState} = useCart();

  const getCartTotal = (): number => {
    return cartState.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  let cartTotal = formatCurrency(getCartTotal());

  return (
    <CustomSafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Text variant="headlineSmall">{t('cart.title')}</Text>
      </View>

      <View style={styles.row}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Item</DataTable.Title>
            <DataTable.Title numeric>Price</DataTable.Title>
          </DataTable.Header>

          {cartState.cartItems.length ? (
            <>
              {cartState.cartItems.map((item: CartItem) => (
                <DataTable.Row key={item.id}>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {formatCurrency(item.price)}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
              <DataTable.Row>
                <DataTable.Cell>Total:</DataTable.Cell>
                <DataTable.Cell numeric>{cartTotal}</DataTable.Cell>
              </DataTable.Row>
            </>
          ) : (
            <DataTable.Row>
              <DataTable.Cell>{t('cart.empty')}</DataTable.Cell>
            </DataTable.Row>
          )}
        </DataTable>
      </View>

      {cartState.cartItems.length ? (
        <View style={styles.row}>
          <Button
            icon="cart-arrow-right"
            mode="elevated"
            style={styles.button}
            onPress={() => {
              console.log('ouch');
            }}>
            {t('cart.checkout')}
          </Button>
        </View>
      ) : null}
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
