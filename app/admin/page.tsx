import { getIngredientCategories } from "../server-side/items";
import { getCategories, getSubcategories } from "../server-side/admin";
import ShowIngredients from "../components/admin/ShowIngredients";
import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";

const Admin = async () => {
  const session = await getServerSession(options);
  if (session?.user?.email !== "eklund.rasmus44@gmail.com") {
    return (
      <div className="bg-c3">
        <h1 className="text-3xl text-c5">Admin page</h1>
        <p className="text-c5">You are not an admin.</p>
      </div>
    );
  }
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
