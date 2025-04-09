import {createStackNavigator} from '@react-navigation/stack';
import WelcomeSlideScreen from '../screens/WelcomeSlideScreen';
import SelectPreferenceScreen from '../screens/SelectPreferenceScreen';
import {BOTTOM_TAB, SCREEN_NAMES} from '../const';
import MealPlanScreen from '../screens/MealPlanScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from '../components/MyTabBar';
import CollectionsScreen from '../screens/CollectionItemsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SelectMealPlanScreen from '../screens/SelectMealPlanScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import InstructionsScreen from '../screens/InstructionsScreen';
import AddNewCollectionScreen from '../screens/AddNewCollectionScreen';
import SaveToCollectionScreen from '../screens/SaveToCollectionScreen';
import NotesScreen from '../screens/NotesScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import CollectionItemsScreen from '../screens/CollectionItemsScreen';
import RecipeSearchScreen from '../screens/RecipeSearchScreen';
import EatingPreferencesScreen from '../screens/EatingPreferencesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const onTabPress = ({navigation, route, isFocused}) => {
  // console.log('onTabPressed');
  const event = navigation.emit({
    type: 'tabPress',
    target: route.key,
    canPreventDefault: true,
  });

  if (!isFocused && !event.defaultPrevented) {
    navigation.navigate(route.name, route.params);
  }
};

const TabBar = ({navigation, state, descriptors}) => (
  <MyTabBar
    navigation={navigation}
    state={state}
    descriptors={descriptors}
    onTabPress={onTabPress}
  />
);

const HomeScreen = () => {
  return (
    <Tab.Navigator
      tabBar={TabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name={SCREEN_NAMES.MEAL_PLAN_SCREEN}
        component={MealPlanScreen}
        options={{
          tabBarLabel: BOTTOM_TAB[SCREEN_NAMES.MEAL_PLAN_SCREEN].label,
          tabBarBadgeStyle: {
            backgroundColor: 'blue',
          },
        }}
      />
      {/* <Tab.Screen
        name={SCREEN_NAMES.COLLECTIONS_SCREEN}
        component={CollectionsScreen}
        options={{
          tabBarLabel: BOTTOM_TAB[SCREEN_NAMES.COLLECTIONS_SCREEN].label,
        }}
      /> */}
      <Tab.Screen
        name={SCREEN_NAMES.FAVORITES_SCREEN}
        component={FavoritesScreen}
        options={{
          tabBarLabel: BOTTOM_TAB[SCREEN_NAMES.FAVORITES_SCREEN].label,
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.SETTINGS_SCREEN}
        component={SettingsScreen}
        options={{
          tabBarLabel: BOTTOM_TAB[SCREEN_NAMES.SETTINGS_SCREEN].label,
        }}
      />
    </Tab.Navigator>
  );
};

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAMES.WELCOME_SLIDE_SCREEN}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={SCREEN_NAMES.WELCOME_SLIDE_SCREEN}
        component={WelcomeSlideScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.SELECT_PREFERENCE_SCREEN}
        component={SelectPreferenceScreen}
      />
      <Stack.Screen name={SCREEN_NAMES.HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen
        name={SCREEN_NAMES.COLLECTION_ITEMS_SCREEN}
        component={CollectionItemsScreen}
      />

      <Stack.Screen
        name={SCREEN_NAMES.SELECT_MEAL_PLAN_SCREEN}
        component={SelectMealPlanScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.RECIPE_SEARCH_SCREEN}
        component={RecipeSearchScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.MEAL_DETAILS_SCREEN}
        component={MealDetailsScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.INSTRUCTIONS_SCREEN}
        component={InstructionsScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.SAVE_TO_COLLECTION_SCREEN}
        component={SaveToCollectionScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.ADD_NEW_COLLECTION_SCREEN}
        component={AddNewCollectionScreen}
      />
      <Stack.Screen name={SCREEN_NAMES.NOTES_SCREEN} component={NotesScreen} />
      <Stack.Screen
        name={SCREEN_NAMES.FEEDBACK_SCREEN}
        component={FeedbackScreen}
      />
      <Stack.Screen
        name={SCREEN_NAMES.EATING_PREFERNCES_SCREEN}
        component={EatingPreferencesScreen}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
