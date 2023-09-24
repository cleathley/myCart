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
  const {cartState} = useCart();

  return (
    <>
      <IconButton
        icon={cartState.cartItems.length ? 'cart' : 'cart-outline'}
        size={24}
        onPress={() => {
          navigation.navigate('Cart');
        }}
      />
      {cartState.cartItems.length ? (
        <Badge style={styles.headerCartBadge}>
          {cartState.cartItems.length}
        </Badge>
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
