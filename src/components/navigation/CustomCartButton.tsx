import {useNavigation} from '@react-navigation/native';
import React, {ReactElement} from 'react';
import {StyleSheet} from 'react-native';
import {Badge, IconButton} from 'react-native-paper';
import log from '../../support/logger';
import {useCart} from '../../context/Cart';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootNavigationStackParamList} from '../../@types/navigation';

function CustomCartButton(): ReactElement {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationStackParamList>>();
  const cart = useCart();

  return (
    <>
      <IconButton
        icon={cart.getCartCount() ? 'cart' : 'cart-outline'}
        size={24}
        onPress={() => {
          navigation.navigate('Cart');
        }}
      />
      {cart.getCartCount() ? (
        <Badge style={styles.headerCartBadge}>{cart.getCartCount()}</Badge>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  headerCartBadge: {
    position: 'absolute',
    top: 2,
    right: 0,
  },
});

export default CustomCartButton;
