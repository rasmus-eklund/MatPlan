import SearchBar from "./SearchBar";

const page = () => {
  // search bar or add recipe form
  // list of recipes

  // const handleAddRecipe = async () => {
  //   setSearch('');
  //   const data = await getRecipeByName(search);
  //   setRecipeResult(data);
  // };

  return (
    <main className="p-4 bg-2 flex flex-col gap-4">
      <SearchBar />
    </main>
  );
};

export default page;

//  {addRecipe && (
//   <>
//     <AddRecipeForm callback={handleAddRecipe} />
//     <button onClick={() => setAddRecipe(false)}>Tillbaka till sök</button>
//   </>
// )}
