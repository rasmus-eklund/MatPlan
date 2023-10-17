import {
  Category,
  IngredientCat,
  IngredientFilter,
  Subcategory,
} from "@/types";

const debouncer = () => {
  let id: NodeJS.Timeout;
  const debounce = (cb: () => void) => {
    clearTimeout(id);
    id = setTimeout(() => {
      cb();
    }, 1000);
  };
  return debounce;
};
export const debounce = debouncer();

export const filterIngredients = (
  { search, category, subcategory, asc }: IngredientFilter,
  ings: IngredientCat[],
) => {
  const filteredIngredients = ings.filter((i) => {
    const searchMatch = !search || i.name.includes(search.toLowerCase());
    const categoryMatch = category === -1 || i.categoryId === category;
    const subcategoryMatch =
      subcategory === -1 || i.subcategoryId === subcategory;
    return searchMatch && categoryMatch && subcategoryMatch;
  });

  return filteredIngredients.sort((a, b) => {
    if (asc) {
      return a.name.localeCompare(b.name, "sv-SE");
    } else {
      return b.name.localeCompare(a.name, "sv-SE");
    }
  });
};

export const getIngCatSub = (
  ing: IngredientCat,
  categories: Category[],
  subcategories: Subcategory[],
) => {
  const category = categories.find((cat) => cat.id === ing.categoryId)!;
  const subcategory = subcategories.find(
    (sub) => sub.id === ing.subcategoryId,
  )!;
  return {
    name: ing.name,
    category: category.name,
    subcategory: subcategory.name,
  };
};
