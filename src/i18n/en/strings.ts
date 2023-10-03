export const strings = {
  // App specific
  app: {
    name: 'Ninja Lottery',
    loading: 'Loading...',
  },

  alert: {
    OK: 'OK',
  },

  home: {
    screenTitle: 'Ninja Lottery',
    title: 'Play your favourate game',
    cardPrice: 'Starting from {{price}} per game.',
    runTest: 'Debug',
  },

  product: {
    // no screen title as this is dynamically generated from the product name
    entries: 'Available Entries..',
    variationTitle: '{{title}} - {{price}}',
    cartName: '{{product}} ({{variation}})',
  },

  cart: {
    screenTitle: 'Cart Checkout',
    title: 'Your cart contents',
    empty: 'You have no items in your cart.',
    checkout: 'Checkout and Pay',
  },

  checkout: {
    screenTitle: 'Checkout & Payment',
    title: 'Please enter your payment information',
    creditCardName: 'Name on Credit Card',
    creditCardNumber: 'Credit Card Number',
    submitButton: 'Process Payment of {{total}}',

    validationCreditCardName: 'Please enter in the name on the credit card.',
    validationCreditCardNumber: 'Please enter in your credit card number.',

    successDialogTitle: 'Payment Successful',
    successDialog:
      'Your payment of {{total}}\nwas successfully processed.\n\nYour receipt is {{receipt}}.',
    failedDialog: 'There was a problem processing your payment.',
  },
};
