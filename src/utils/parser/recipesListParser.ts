const recipesListParser = apiResponse => {
  const recipesList = [];
  apiResponse.forEach(item => {
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
        ins_No: index + 1,
        name: instruction,
      });
    });
    recipesList.push({
      id: item?.id,
      title: item?.name,
      imgUrl: item?.image,
      preparationTime: item?.prepTimeMinutes,
      rating: item?.rating,
      servings: item?.servings,
      ingredients: ingredientsList,
      instructions: instructionsList,
      tags: item?.tags,
    });
  });
  return recipesList;
};

export {recipesListParser};
