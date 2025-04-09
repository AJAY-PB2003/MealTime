import './gesture-handler';
import React, {useEffect, useState} from 'react';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import MyStack from './src/nav';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import toastConfig from './src/components/toastConfig';
import SelectMealPlanScreen from './src/screens/SelectMealPlanScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useColorScheme} from 'react-native';
import {COLOR_SCHEME} from './src/const';
import {HexCodes} from './src/const/colorHexCode';
import SplashScreen from './src/screens/SplashScreen';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: HexCodes.F58700,
    onPrimary: HexCodes.FFFFFF,
    primaryContainer: HexCodes.F58700,
    onPrimaryContainer: HexCodes._1A1A1A,
    primaryContainerFocused: HexCodes.FFE4C2,
    primaryContainerUnfocused: HexCodes.FFFFFF,
    primaryButton: HexCodes.F58700,
    onPrimaryButton: HexCodes._1A1A1A,
    primaryText: HexCodes._1A1A1A,
    primaryIconFocused: HexCodes.F58700,
    primaryIconUnfocused: HexCodes.E6E6E6,
    primaryShadow: HexCodes._666666,
    primaryIcon: HexCodes._999999,
    primaryError: HexCodes.E55B48,
    primaryBorder: HexCodes.CCCCCC,
    primaryBlurBackground: HexCodes._19191999,

    secondary: HexCodes._33995B,
    secondaryContainer: HexCodes.E6E6E6,
    onSecondaryContainerHeading: HexCodes._1A1A1A,
    onSecondaryContainerSubheading: HexCodes._666666,
    secondaryIconFocused: HexCodes._33995B,
    secondaryIconUnfocused: HexCodes.E6E6E6,
    secondaryShadow: HexCodes._433D370F,

    tertiary: HexCodes.FFFFFF,
    onTertiary: HexCodes._1A1A1A,
    tertiaryContainer: HexCodes.FFFFFF,
    onTertiaryContainer: HexCodes._1A1A1A,
    tertiaryIconFocused: HexCodes.F58700,
    tertiaryIconUnfocused: HexCodes.B3B3B3,
  },
};
const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: HexCodes.F58700,
    onPrimary: HexCodes.FFFFFF,
    primaryContainer: HexCodes.F58700,
    onPrimaryContainer: HexCodes._1A1A1A,
    primaryContainerFocused: HexCodes.FFE4C2,
    primaryContainerUnfocused: HexCodes.FFFFFF,
    primaryButton: HexCodes.F58700,
    onPrimaryButton: HexCodes._1A1A1A,
    primaryText: HexCodes._1A1A1A,
    primaryIconFocused: HexCodes.F58700,
    primaryIconUnfocused: HexCodes.E6E6E6,
    primaryShadow: HexCodes._666666,
    primaryIcon: HexCodes._999999,
    primaryError: HexCodes.E55B48,
    primaryBorder: HexCodes.CCCCCC,
    primaryBlurBackground: HexCodes._19191999,

    secondary: HexCodes._33995B,
    secondaryContainer: HexCodes.E6E6E6,
    onSecondaryContainerHeading: HexCodes._1A1A1A,
    onSecondaryContainerSubheading: HexCodes._666666,
    secondaryIconFocused: HexCodes._33995B,
    secondaryIconUnfocused: HexCodes.E6E6E6,
    secondaryShadow: HexCodes._433D370F,

    tertiary: HexCodes.FFFFFF,
    onTertiary: HexCodes._1A1A1A,
    tertiaryContainer: HexCodes.FFFFFF,
    onTertiaryContainer: HexCodes._1A1A1A,
    tertiaryIconFocused: HexCodes.F58700,
    tertiaryIconUnfocused: HexCodes.B3B3B3,
  },
};

function App(): React.JSX.Element {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  return (
    <GestureHandlerRootView>
      <PaperProvider
        theme={colorScheme === COLOR_SCHEME.DARK ? darkTheme : lightTheme}>
        <NavigationContainer>
          {showSplash ? <SplashScreen /> : <MyStack />}
        </NavigationContainer>
        <Toast config={toastConfig} visibilityTime={1000} />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

export default App;
