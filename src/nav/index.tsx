import {createStackNavigator} from '@react-navigation/stack';
import WelcomeSlideScreen from '../screens/WelcomeSlideScreen';
import SelectPreferenceScreen from '../screens/SelectPreferenceScreen';
import {SCREEN_NAMES} from '../const';
import MealPlanScreen from '../screens/MealPlanScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      // initialRouteName={SCREEN_NAMES.MEAL_PLAN_SCREEN}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={SCREEN_NAMES.WELCOME_SLIDE_SCREEN}
        component={WelcomeSlideScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.SELECT_PREFERENCE_SCREEN}
        component={SelectPreferenceScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.MEAL_PLAN_SCREEN}
        component={MealPlanScreen}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
