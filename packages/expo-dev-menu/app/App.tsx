import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AppProviders } from './components/AppProviders';
import { Main } from './components/Main';
import { AppInfo, DevSettings } from './native-modules/DevMenu';

type DevMenuInitialProps = {
  appInfo: AppInfo;
  devSettings: DevSettings;
};

export function App({ devSettings, appInfo }: DevMenuInitialProps) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProviders appInfo={appInfo} devSettings={devSettings}>
        <Main />
      </AppProviders>
    </GestureHandlerRootView>
  );
}
