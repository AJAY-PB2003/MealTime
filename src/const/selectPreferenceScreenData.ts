const selectPreferenceSlideDataList = [
  {
    key: 'pickYourDiet',
    title: 'Pick Your Diet',
    preferenceName: 'Diet',
    viewType: 'List',
    skipable: false,
    itemArr: [
      {text: 'Classic', key: 'classic'},
      {text: 'Low Carb', key: 'lowCarb'},
      {text: 'Keto', key: 'keto'},
      {text: 'Flexitarian', key: 'flexitarian'},
      {text: 'Paleo', key: 'paleo'},
      {text: 'Vegetarian', key: 'vegetarian'},
      {text: 'Pescetarian', key: 'pescetarian'},
      {text: 'Vegan', key: 'vegan'},
    ],
  },
  {
    key: 'anyAllergies',
    title: 'Any Allergies?',
    preferenceName: 'Allergies',
    viewType: 'Chip',
    skipable: true,
    itemArr: [
      {text: 'Gluten', key: 'gluten'},
      {text: 'Mustard', key: 'mustard'},
      {text: 'Nightshade', key: 'nightshade'},
      {text: 'Peanut', key: 'peanut'},
      {text: 'Soy', key: 'soy'},
      {text: 'Seasame', key: 'seasame'},
      {text: 'Sulfite', key: 'sulfite'},
      {text: 'Tree Nut', key: 'treeNut'},
    ],
  },
  {
    key: 'howAboutDislikes?',
    title: 'How about Dislikes?',
    preferenceName: 'Dislikes',
    viewType: 'Chip',
    skipable: true,
    itemArr: [
      {text: 'Avocado', key: 'avocado'},
      {text: 'Beets', key: 'beets'},
      {text: 'Bell Peppers', key: 'bellPeppers'},
      {text: 'Brussels Sprouts', key: 'brusselsSprouts'},
      {text: 'Cauliflower', key: 'cauliflower'},
      {text: 'Eggplant', key: 'eggplant'},
      {text: 'Mushrooms', key: 'mushrooms'},
      {text: 'Olives', key: 'olives'},
      {text: 'Quinoa', key: 'quinoa'},
      {text: 'Tofu', key: 'tofu'},
      {text: 'Turnips', key: 'turnips'},
    ],
  },
  {
    key: 'howManyServingsPerMeal?',
    title: 'How Many servings per meal?',
    preferenceName: 'Servings',
    viewType: 'List',
    skipable: false,
    itemArr: [
      {
        key: 'twoServings',
        text: '2 Servings',
        subText: 'for two, or one with leftovers',
      },
      {
        key: 'fourServings',
        text: '4 servings',
        subText: 'for four, or two-three with leftovers',
      },
      {
        key: 'sixServings',
        text: '6 servings',
        subText: 'for a family of 5+',
      },
    ],
  },
  {
    key: 'setAWeeklyReminder',
    title: 'Set a weekly reminder',
    preferenceName: 'Reminder',
    preferenceSubCategory: [
      {key: 'time', text: 'Time'},
      {key: 'days', text: 'Days'},
    ],
    viewType: 'Dropdown',
    itemArr: [
      {
        key: 'timeList',
        values: Array.from({length: 24}, (_, i) => {
          const hour = i % 12 === 0 ? 12 : i % 12; // Convert to 12-hour format
          const period = i < 12 ? 'AM' : 'PM'; // Determine AM/PM
          return {
            key: `at${hour}${period}`,
            text: `at ${hour}:00 ${period}`,
          };
        }),
        // values: [
        //   {key: 'atTenAM', text: 'at 10:00 AM'},
        //   {key: 'atElevenAM', text: 'at 11:00 AM'},
        //   {key: 'atTwelveAM', text: 'at 12:00 AM'},
        // ],
      },
      {
        key: 'daysList',
        values: [
          {key: 'onSundays', text: 'on Sundays'},
          {key: 'onMondays', text: 'on Mondays'},
          {key: 'onTuesdays', text: 'on Tuesdays'},
          {key: 'onWednesdays', text: 'on Wednesdays'},
          {key: 'onThursdays', text: 'on Thursdays'},
          {key: 'onFridays', text: 'on Fridays'},
          {key: 'onSaturdays', text: 'on Saturdays'},
        ],
      },
    ],
  },
];

export {selectPreferenceSlideDataList};
