const WELCOME_SLIDE_Static_Data = {
  leftIconName: 'arrow-left',
  buttonTitle: 'Continue',
  pressableTitle: 'Skip',
  toastText: 'Last Screen',
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
  collectionTitle: 'Collections',
  collectionItemIcon: 'delete',
  addNewCollectionBtnTitle: 'Add New Collection',
  addNewCollectionBtnIcon: 'plus',
  buildMealPlanBtnTitle: 'Build Your Meal Plan',
};

const Select_Meal_Plan_Screen_StaticData = {
  favoriteIcon: 'heart',
  nonFavoriteIcon: 'heart-outline',
  headerLeftIcon: 'close',
  headerRightIcon: 'magnify',
  title: 'Build a meal plan',
  bSHeading: 'Build your first meal plan',
  bSSubHeading:
    "Add a few recipes to cook this week, and we'll build you an easy-to-shop grocery list.",
  bSButtonTitle: 'Got It!',
  errorText: 'Something Went Wrong',
  errorBtnText: 'Try Again',
};
const Meal_Details_Screen_Bottom_Sheet_Keys = {
  COOKING_MODE: 'cookingmode',
  NOTES: 'notes',
  FEEDBACK: 'feedback',
  ADD_TO_COLLECTIONS: 'addtocollection',
};
const Meal_Details_Screen_Static_Data = {
  tabNames: [
    {id: 'tab1', title: 'Ingredients'},
    {
      id: 'tab2',
      title: 'Instructions',
    },
  ],
  bottomSheetItems: [
    {
      key: Meal_Details_Screen_Bottom_Sheet_Keys.COOKING_MODE,
      img: require('.//assets//timerLogo.png'),
      title: 'Open Cooking Mode',
    },
    {
      key: Meal_Details_Screen_Bottom_Sheet_Keys.NOTES,
      img: require('.//assets//noteLogo.png'),
      title: 'Add Notes',
    },
    {
      key: Meal_Details_Screen_Bottom_Sheet_Keys.FEEDBACK,
      img: require('.//assets//feedbackLogo.png'),
      title: 'Feedback For The Chef',
    },
    {
      key: Meal_Details_Screen_Bottom_Sheet_Keys.ADD_TO_COLLECTIONS,
      img: require('.//assets//collectionLogo.png'),
      title: 'Add To Collections',
    },
  ],
  toastText: 'Already Provided Feedback',
  headerLeftIconName: 'arrow-left',
  headerRightIconName: 'dots-horizontal',
  favoriteIcon: 'heart',
  nonFavoriteIcon: 'heart-outline',
  leftButtonIcon: 'check-circle-outline',
  leftButtonTitle: 'Cooked?',
  rightButtonTitle: 'Start Cooking',
  feedbackContainerTitle: 'Feedback',
  feedbackEditIcon: 'note-edit-outline',
  notesContainerTitle: 'Notes',
};
const Sorting_Order_Names = {
  ASCENDING: 'Ascending',
  DESCENDING: 'Descending',
};

const Recipe_Search_Screen_Static_Data = {
  sortDropdownList: [
    {
      key: 'titleascending',
      text: 'Title Ascending',
      order: Sorting_Order_Names.ASCENDING,
      sortFilter: 'title',
    },
    {
      key: 'titledescending',
      text: 'Title Descending',
      order: Sorting_Order_Names.DESCENDING,
      sortFilter: 'title',
    },
    {
      key: 'ratingascending',
      text: 'Rating Ascending',
      order: Sorting_Order_Names.ASCENDING,
      sortFilter: 'rating',
    },
    {
      key: 'ratingdescending',
      text: 'Rating Descending',
      order: Sorting_Order_Names.DESCENDING,
      sortFilter: 'rating',
    },
    {
      key: 'preparationtimeascending',
      text: 'Preparation Time Ascending',
      order: Sorting_Order_Names.ASCENDING,
      sortFilter: 'preparationTime',
    },
    {
      key: 'preparationtimedescending',
      text: 'Preparation Time Descending',
      order: Sorting_Order_Names.DESCENDING,
      sortFilter: 'preparationTime',
    },
  ],
  searchBarPlaceholder: 'Search your favorite recipe here',
  initialDropdownValue: 'Sort By',
  dropdownIconName: 'chevron-down',
  favoriteIcon: 'heart',
  nonFavoriteIcon: 'heart-outline',
  emptyContainerText: 'No Items',
};

const Instructions_Screen_Static_Data = {
  bSHeading: 'Hands-free cooking',
  bSSubHeading:
    'Advance to the next instruction without touching your screen with icky fingers. Hold your hand over the top of your screen until it goes black, then remove.',
  bSButtonTitle: 'Continue',
  leftButtonIcon: 'format-list-bulleted',
  rightButtonTitle: 'Next',
  cookingIcon: 'clock-outline',
};
const Instruction_Confirm_Quit_Static_Data = {
  itemIconName: 'chevron-right',
  leaveBtnTitle: 'Leave Cooking Mode',
  continueBtnTitle: 'Continue Cooking',
};
const Favorite_Screen_Static_Data = {
  favoriteIcon: 'heart',
  heading: 'Favorites',
  emptyScreenText: 'No Favorites',
};

const Settings_Screen_Static_Data = {
  heading: 'Settings',
  profileUrl:
    'https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D',
  name: 'Akash Gupta',
  mobileNo: '9214535565',
  extraInfo: [
    {key: 'email', name: 'Email', value: 'akashgupta@gmail.com'},
    {key: 'gender', name: 'Gender', value: 'Male'},
    {key: 'dob', name: 'Date of Birth', value: '23 May, 1985'},
    {key: 'weight', name: 'Weight', value: '78 Kg'},
    {key: 'height', name: 'Height', value: "5'8"},
  ],
  buttonTitle: 'Eating Preferences',
  // optionsList: [
  //   {
  //     key: 'eatingpreferences',
  //     img: require('.//assets//eatingPreferencesLogo.png'),
  //     title: 'Eating Preferences',
  //   },
  //   {
  //     key: 'feedback',
  //     img: require('.//assets//feedbackLogo.png'),
  //     title: 'Feedbacks',
  //   },
  //   {
  //     key: 'notes',
  //     img: require('.//assets//noteLogo.png'),
  //     title: 'Notes',
  //   },
  // ],
};

const Add_New_Collection_Screen_Static_Data = {
  toastText: 'Name Field cannot be Empty',
  placeholder: 'Type Here',
  buttonTitle: 'Create Collection',
  title: 'Add a new Collection',
  subTitle: "Collection's Name",
};

const Collection_Items_Screen_Static_Data = {
  cardIconName: 'close-thick',
  emptyContainerText: 'No Items',
  emptyContainerBtnIcon: 'plus',
};

const Feedback_Screen_Static_Data = {
  starList: [
    {key: 'star1'},
    {key: 'star2'},
    {key: 'star3'},
    {key: 'star4'},
    {key: 'star5'},
  ],
  errorToastText: 'Please fill all the fields',
  successToastText: 'Feedback Received. Thanks!',
  headerTitle: 'Feedback',
  starBoxLabel: 'How was this recipe?',
  commentInputBoxLabel: 'Comments for the chef?',
  commentInputBoxPlaceholder: 'Amazing Dish',
  buttonTitle: 'Send',
};

const Notes_Screen_Static_Data = {
  successToastText: 'Note added successfully',
  errorToastText: 'Please write something',
  headerTitle: 'Notes',
  inputPlaceholder: 'Type your note here',
  leftBtnTitle: 'Cancel',
  rightBtnTitle: 'Save',
};

const Save_To_Collection_Screen_Static_Data = {
  errorToastText: 'Please Select atleast one collection',
  successToastText: 'Successfully Added',
  title: 'Select collections',
  subTitle: `Create your own collections for quick 
access to all your favorites. Add your first
collection to get started.`,
  collectionItemIcon: 'check',
  addCollectionBtnTitle: 'Add New Collection',
  addCollectionBtnIcon: 'plus',
  addItemBtnTitle: 'Add',
};

const Meal_Card_Static_Data = {
  subtitleContainerLeftIcon: 'clock-outline',
  subtitleContainerRightIcon: 'star',
};

const Eating_Preference_Screen_Static_Data = {
  headerTitle: 'Eating Preferences',
  dietText: 'Diet',
  allergiesText: 'Allergies',
  dislikesText: 'Dislikes',
  servingsText: 'Servings',
};

const SCREEN_NAMES = {
  WELCOME_SLIDE_SCREEN: 'WelcomeSlideScreen',
  SELECT_PREFERENCE_SCREEN: 'SelectPreferenceScreen',
  MEAL_PLAN_SCREEN: 'MealPlanScreen',
  FAVORITES_SCREEN: 'FavoritesScreen',
  SETTINGS_SCREEN: 'SettingsScreen',
  HOME_SCREEN: 'HomeScreen',
  COLLECTION_ITEMS_SCREEN: 'CollectionItemsScreen',
  SELECT_MEAL_PLAN_SCREEN: 'SelectMealPlanScreen',
  RECIPE_SEARCH_SCREEN: 'RecipeSearchScreen',
  MEAL_DETAILS_SCREEN: 'MealDetailsScreen',
  INSTRUCTIONS_SCREEN: 'InstructionsScreen',
  SAVE_TO_COLLECTION_SCREEN: 'SaveToCollectionScreen',
  ADD_NEW_COLLECTION_SCREEN: 'AddNewCollectionScreen',
  NOTES_SCREEN: 'NotesScreen',
  FEEDBACK_SCREEN: 'FeedbackScreen',
  EATING_PREFERNCES_SCREEN: 'EatingPreferencesScreen',
};

const BOTTOM_TAB = {
  MealPlanScreen: {
    name: SCREEN_NAMES.MEAL_PLAN_SCREEN,
    imgPath: require('./assets/fork.png'),
    label: 'Meal Plan',
  },
  // CollectionsScreen: {
  //   name: SCREEN_NAMES.COLLECTIONS_SCREEN,
  //   imgPath: require('./assets/basket.png'),
  //   label: 'Collections',
  // },
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
  Recipe_Search_Screen_Static_Data,
  Meal_Details_Screen_Bottom_Sheet_Keys,
  Meal_Details_Screen_Static_Data,
  Instructions_Screen_Static_Data,
  Instruction_Confirm_Quit_Static_Data,
  Favorite_Screen_Static_Data,
  Settings_Screen_Static_Data,
  Add_New_Collection_Screen_Static_Data,
  Collection_Items_Screen_Static_Data,
  Feedback_Screen_Static_Data,
  Notes_Screen_Static_Data,
  Save_To_Collection_Screen_Static_Data,
  Meal_Card_Static_Data,
  Eating_Preference_Screen_Static_Data,
  SCREEN_NAMES,
  BOTTOM_TAB,
  API_STATUS,
  recipeCategories,
  COLOR_SCHEME,
  Sorting_Order_Names,
};
