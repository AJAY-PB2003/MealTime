const WELCOME_SLIDE_Static_Data = {
  leftIconName: 'arrow-left',
  buttonTitle: 'Continue',
  pressableTitle: 'Skip',
};

const Select_Preference_Static_Data = {
  leftIconName: 'arrow-left',
  buttonTitle: 'Continue',
  pressableTitle: 'Skip',
  viewTypeNames: {
    LIST: 'List',
    CHIP: 'Chip',
    DROPDOWN: 'Dropdown',
  },
  reminderText: 'Remind me to make a meal plan',
  alert: {
    title: '"Mealtime" Would Like To Send You Notifications',
    message:
      'Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.',
    rightButtonName: 'Allow',
    leftButtonName: "Don't Allow",
  },
  dropdown: {
    initialDropdownValue: 'Select an option',
    iconName: 'chevron-down',
    dropdownHeaderIconName: 'close',
  },
};

const Meal_Plan_Screen_Static_Data = {
  heading: 'Your personalized meal plan',
  subheading:
    'Plan your meals for the entire week in minutes. Build your first meal plan to get started!',
  buttonTitle: 'Build Your First Meal Plan',
};

const Select_Meal_Plan_Screen_StaticData = {
  favoriteIcon: 'heart',
  nonFavoriteIcon: 'plus',
  headerLeftIcon: 'close',
  headerRightIcon: 'magnify',
  title: 'Build a meal plan',
  bSHeading: 'Build your first meal plan',
  bSSubHeading:
    "Add a few recipes to cook this week, and we'll build you an easy-to-shop grocery list.",
  bSButtonTitle: 'Got It!',
};

const Meal_Details_Screen_Static_Data = {
  tabNames: [
    {id: 'tab1', title: 'Ingredients'},
    {
      id: 'tab2',
      title: 'Instructions',
    },
  ],
};

const SCREEN_NAMES = {
  WELCOME_SLIDE_SCREEN: 'WelcomeSlideScreen',
  SELECT_PREFERENCE_SCREEN: 'SelectPreferenceScreen',
  MEAL_PLAN_SCREEN: 'MealPlanScreen',
  COLLECTIONS_SCREEN: 'CollectionsScreen',
  FAVORITES_SCREEN: 'FavoritesScreen',
  SETTINGS_SCREEN: 'SettingsScreen',
  HOME_SCREEN: 'HomeScreen',
  SELECT_MEAL_PLAN_SCREEN: 'SelectMealPlanScreen',
  MEAL_DETAILS_SCREEN: 'MealDetailsScreen',
};

const BOTTOM_TAB = {
  MealPlanScreen: {
    name: SCREEN_NAMES.MEAL_PLAN_SCREEN,
    imgPath: require('./assets/fork.png'),
    label: 'Meal Plan',
  },
  CollectionsScreen: {
    name: SCREEN_NAMES.COLLECTIONS_SCREEN,
    imgPath: require('./assets/basket.png'),
    label: 'Collections',
  },
  FavoritesScreen: {
    name: SCREEN_NAMES.FAVORITES_SCREEN,
    imgPath: require('./assets/heart.png'),
    label: 'Favorites',
  },
  SettingsScreen: {
    name: SCREEN_NAMES.SETTINGS_SCREEN,
    imgPath: require('./assets/settings.png'),
    label: 'Settings',
  },
};
const API_STATUS = {
  PENDING: 'pending',
  SUCCEEDED: 'succeeded',
  ERROR: 'error',
};

const recipeCategories = [
  {key: 'indian', name: 'Indian'},
  {key: 'italian', name: 'Italian'},
  {key: 'pakistani', name: 'Pakistani'},
  {key: 'japanese', name: 'Japanese'},
  {key: 'spanish', name: 'Mexican'},
];

const COLOR_SCHEME = {
  LIGHT: 'light',
  DARK: 'dark',
};

export {
  WELCOME_SLIDE_Static_Data,
  Select_Preference_Static_Data,
  Meal_Plan_Screen_Static_Data,
  Select_Meal_Plan_Screen_StaticData,
  Meal_Details_Screen_Static_Data,
  SCREEN_NAMES,
  BOTTOM_TAB,
  API_STATUS,
  recipeCategories,
  COLOR_SCHEME,
};
