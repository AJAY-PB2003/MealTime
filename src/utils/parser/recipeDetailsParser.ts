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
      ins_No: index + 1,
      name: instruction,
    });
  });

  return {
    id: item?.id,
    title: item?.name,
    imgUrl: item?.image,
    preparationTime: item?.prepTimeMinutes,
    servings: item?.servings,
    rating: item?.rating,
    ingredients: ingredientsList,
    instructions: instructionsList,
    tags: item?.tags,
  };
};

export {recipeDetailsParser};
