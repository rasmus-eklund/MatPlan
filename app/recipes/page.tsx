import SearchBar from './SearchBar';

const page = () => {
  // search bar or add recipe form
  // list of recipes

  // const handleAddRecipe = async () => {
  //   setSearch('');
  //   const data = await getRecipeByName(search);
  //   setRecipeResult(data);
  // };

  return (
    <main>
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
