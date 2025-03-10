import * as React from 'react';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import MyStack from './src/nav';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import toastConfig from './src/components/toastConfig';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F58700',
    onPrimary: '#FFFFFF',
    primaryContainer: '#F58700',
    onPrimaryContainer: '#1A1A1A',
    primaryContainerFocused: '#FFE4C2',
    primaryContainerUnfocused: '#FFFFFF',
    primaryButton: '#F58700',
    onPrimaryButton: '#1A1A1A',
    primaryText: '#1A1A1A',
    primaryIconFocused: '#F58700',
    primaryIconUnfocused: '#E6E6E6',
    primaryShadow: '#666666',

    secondary: '#33995B',
    secondaryContainer: '#E6E6E6',
    onSecondaryContainerHeading: '#1A1A1A',
    onSecondaryContainerSubheading: '#666666',
    secondaryIconFocused: '#33995B',
    secondaryIconUnfocused: '#E6E6E6',

    tertiary: '#FFFFFF',
    onTertiary: '#1A1A1A',
    tertiaryContainer: '#FFFFFF',
    onTertiaryContainer: '#1A1A1A',
  },
};

function App(): React.JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </PaperProvider>
  );
}

export default App;
