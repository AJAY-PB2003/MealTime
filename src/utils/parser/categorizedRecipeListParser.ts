import {recipeCategories} from '../../const';

const categorizedRecipeListParser = recipesList => {
  // console.log('Inside parser');
  const categorizedRecipeList = [];
  recipeCategories.forEach(category => {
    const categoryList = recipesList?.filter(item =>
      item.tags.includes(category.name),
    );
    // console.log(categoryList);
    // categorizedRecipeList[category.name] = categoryList;
    categorizedRecipeList.push({
      key: category.key,
      title: category.name,
      data: categoryList,
    });
  });
  // console.log(categorizedRecipeList);
  return categorizedRecipeList;
};

export {categorizedRecipeListParser};
