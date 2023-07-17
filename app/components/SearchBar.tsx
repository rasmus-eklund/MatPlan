// import { useState } from "react";
// import { useDebounce } from "usehooks-ts";
// import { FilterParams, Recipe, SearchRecipeParams } from "@/types";
// const handleSearch = ({ search, filter }: SearchRecipeParams) => {
//   return <></>;
// };
// const Recipes = () => {
//   const [display, setDisplay] = useState<Recipe | null>(null);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState<FilterParams>("name");
//   const debouncedSearch = useDebounce(search, 500);
//   const handleSelected = async (id: string) => {
//     const recipe = await getRecipeById(id);
//     setDisplay(recipe);
//   };
//   const query = handleSearch({ filter, search: debouncedSearch });
//   return (
//     <main className="recipe">
//       <h1 className="recipe__title">Lägg till maträtter</h1>
//       <form
//         className="recipe__form"
//         onSubmit={(e) => {
//           e.preventDefault();
//         }}
//       >
//         <label htmlFor="search">Sök</label>
//         <input
//           id="search"
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <label htmlFor="filter">Filter</label>
//         <select
//           name="filter"
//           id="filter"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value as FilterParams)}
//         >
//           <option value="name">Namn</option>
//           <option value="ingredients">Ingredient</option>
//           <option value="instruction">Instruktion</option>
//         </select>
//       </form>
//       <ul className="recipe__list">
//         {query.status === "loading" && <p>Loading...</p>}
//         {query.status === "error" && <p>Error...</p>}
//         {query.status === "success" &&
//           query.data.map((recipe) => (
//             <ItemRecipe
//               key={recipe.id}
//               selected={recipe.id === display?.id}
//               recipe={recipe}
//               callback={handleSelected}
//             />
//           ))}
//       </ul>
//       {display && (
//         <section>
//           <DisplayRecipe recipe={display} />
//           <span>
//             <button>Edit</button>
//             <button onClick={() => setDisplay(null)}>x</button>
//           </span>
//         </section>
//       )}
//     </main>
//   );
// };
// export default Recipes;
