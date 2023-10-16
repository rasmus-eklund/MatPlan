import { getIngredientCategories } from "../server-side/items";
import { getCategories, getSubcategories } from "../server-side/admin";
import ShowIngredients from "../components/admin/ShowIngredients";

const Admin = async () => {
  const ingredients = await getIngredientCategories();
  const categories = await getCategories();
  const subcategories = await getSubcategories();

  return (
    <ShowIngredients
      ingredients={ingredients}
      categories={categories}
      subcategories={subcategories}
    />
  );
};

export default Admin;
