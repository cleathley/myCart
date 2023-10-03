import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axios from 'axios';
import React, {ReactElement, useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Keyboard, StyleSheet, View} from 'react-native';
import {Button, HelperText, Text, TextInput} from 'react-native-paper';
import ENV from '../../.env';
import {RootNavigationStackParamList} from '../@types/navigation';
import {CustomSafeAreaView} from '../components/CustomSafeAreaView';
import CustomOkDialog from '../components/dialog/CustomOkDialog';
import {useCart} from '../context/Cart';
import formatCurrency from '../support/formatCurrency';
import log from '../support/logger';

type CheckoutForm = {
  creditCardName: string;
  creditCardNumber: string;
};

export default function CheckoutScreen(): ReactElement {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationStackParamList>>();
  const cart = useCart();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<CheckoutForm>();

  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  const [showErrorDialog, setShowErrorDialog] = React.useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] =
    React.useState(false);
  const [dialogContent, setDialogContent] = React.useState('');

  const cartTotal = formatCurrency(cart.getCartTotal());

  const onSubmit: SubmitHandler<CheckoutForm> = async formData => {
    // dismiss any keyboard inputs left open
    Keyboard.dismiss();

    setDisableSubmitButton(true);

    const paymentSubmission = {
      creditCardName: formData.creditCardName,
      creditCardNumber: formData.creditCardNumber,
      cartItems: cart.cartState.cartItems,
      paymentAmount: cart.getCartTotal(),
    };

    axios
      // build up the post request and fire it off
      .post(ENV.API_SERVICE_URL + ENV.API_ENDPOINT_PAYMENT, paymentSubmission)
      .then(response => {
        if (response.data.success !== true) {
          setDialogContent(t('checkout.failedDialog'));
          setShowErrorDialog(true);
        } else {
          setDialogContent(
            t('checkout.successDialog', {
              total: cartTotal,
              receipt: response.data.receiptNumber,
            }),
          );
          setShowConfirmationDialog(true);
        }
      })
      .catch(error => {
        // handle error
        log.error(error);
      })
      .finally(() => {
        // when all done, re-enable to the button
        setDisableSubmitButton(false);
      });
  };

  return (
    <CustomSafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Text variant="bodyLarge">{t('checkout.title')}</Text>
      </View>

      <>
        <Controller
          name="creditCardName"
          control={control}
          rules={{
            required: t('checkout.validationCreditCardName'),
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label={t('checkout.creditCardName')}
              mode="outlined"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              maxLength={60}
              autoCapitalize="none"
              error={errors.creditCardName as unknown as boolean}
              style={styles.textInput}
            />
          )}
        />
        {errors.creditCardName && (
          <HelperText type="error" style={styles.textInputError}>
            {errors.creditCardName.message}
          </HelperText>
        )}
      </>

      <>
        <Controller
          name="creditCardNumber"
          control={control}
          rules={{
            required: t('checkout.validationCreditCardNumber'),
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label={t('checkout.creditCardNumber')}
              mode="outlined"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              maxLength={60}
              autoCapitalize="none"
              error={errors.creditCardNumber as unknown as boolean}
              style={styles.textInput}
            />
          )}
        />
        {errors.creditCardNumber && (
          <HelperText type="error" style={styles.textInputError}>
            {errors.creditCardNumber.message}
          </HelperText>
        )}
      </>

      <Button
        mode="contained"
        disabled={disableSubmitButton}
        loading={disableSubmitButton}
        style={styles.button}
        onPress={handleSubmit(onSubmit, Keyboard.dismiss)}>
        {t('checkout.submitButton', {total: cartTotal})}
      </Button>

      <CustomOkDialog
        visible={showErrorDialog}
        content={dialogContent}
        onDismiss={() => setShowErrorDialog(false)}
      />
      <CustomOkDialog
        visible={showConfirmationDialog}
        title={t('checkout.successDialogTitle')}
        content={dialogContent}
        onDismiss={() => {
          // clear the cart and return back to the homescreen (top of the stack)
          cart.clearCart();
          navigation.popToTop();
        }}
      />
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
  textInput: {
    width: '90%',
    marginBottom: 16,
  },
  textInputError: {
    width: '90%',
    marginTop: -16,
    marginBottom: 16,
  },
  button: {
    width: '90%',
  },
});
