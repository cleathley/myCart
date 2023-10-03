import {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import {ViewProps} from 'react-native';
import {Button, Dialog, Portal, Text} from 'react-native-paper';

type Props = {
  visible: boolean;
  title?: string;
  content: string;
  onDismiss(): void;
};

function CustomOkDialog({
  visible,
  title,
  content,
  onDismiss,
}: Props): ReactElement {
  const {t} = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} dismissable={false}>
        {title ? <Dialog.Title>{title}</Dialog.Title> : null}
        <Dialog.Content>
          <Text variant="bodyMedium">{content}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>{t('alert.OK')}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default CustomOkDialog;
