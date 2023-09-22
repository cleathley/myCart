import {ReactElement} from 'react';
import {View, ViewProps} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = ViewProps & {
  children: React.ReactNode;
};

export function CustomSafeAreaView({
  children,
  style,
  ...rest
}: Props): ReactElement {
  const insets = useSafeAreaInsets();

  return (
    <View
      {...rest}
      style={[
        {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',

          // Padding to handle safe areas
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style,
      ]}>
      {children}
    </View>
  );
}
