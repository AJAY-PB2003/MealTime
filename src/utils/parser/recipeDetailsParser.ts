const recipeDetailsParser = item => {
  const ingredientsList = [];
  const instructionsList = [];

  item?.ingredients?.forEach((ingredient, index) => {
    ingredientsList.push({
      key: `${item?.name.replaceAll(' ', '')}_ing_${index}`.toLowerCase(),
      name: ingredient,
    });
  });
  item?.instructions?.forEach((instruction, index) => {
    instructionsList.push({
      key: `${item?.name.replaceAll(' ', '')}_ins_${index}`.toLowerCase(),
      name: instruction,
    });
  });

  return {
    id: item?.id,
    title: item?.name,
    imgUrl: item?.image,
    cookingTime: item?.cookTimeMinutes,
    servings: item?.servings,
    ingredients: ingredientsList,
    instructions: instructionsList,
  };
};

export {recipeDetailsParser};
