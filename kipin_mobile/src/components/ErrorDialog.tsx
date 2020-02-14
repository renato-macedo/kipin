import React from 'react';
import {Portal, Dialog, Button, Paragraph} from 'react-native-paper';

export default function ErrorDialog({visible, onDismiss, message}: any) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
