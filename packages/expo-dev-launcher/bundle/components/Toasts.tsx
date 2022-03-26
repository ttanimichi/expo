import { View, Text } from 'expo-dev-client-components';
import * as React from 'react';

function ErrorToast({ children }) {
  return (
    <View mx="medium">
      <View bg="error" padding="medium" rounded="medium" border="error">
        <Text color="error" weight="medium">
          {children}
        </Text>
      </View>
    </View>
  );
}

export const Toast = {
  Error: ErrorToast,
};
