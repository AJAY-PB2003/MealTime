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

const SCREEN_NAMES = {
  WELCOME_SLIDE_SCREEN: 'WelcomeSlideScreen',
  SELECT_PREFERENCE_SCREEN: 'SelectPreferenceScreen',
  MEAL_PLAN_SCREEN: 'MealPlanScreen',
};

export {
  WELCOME_SLIDE_Static_Data,
  Select_Preference_Static_Data,
  Meal_Plan_Screen_Static_Data,
  SCREEN_NAMES,
};
