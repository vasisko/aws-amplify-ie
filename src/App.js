import { useEffect, useState } from 'react';
import API from '@aws-amplify/api';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listRecipes } from './graphql/queries';
import { createRecipe as createRecipeMutation, deleteRecipe as deleteRecipeMutation } from './graphql/mutations';

const initialFormState = { name: '', category: '', description: '' };

function App() {
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
      const apiData = await API.graphql({ query: listRecipes });
      setRecipes(apiData.data.listRecipes.items);
      console.log('data', apiData.data.listRecipes.items)
  }
  async function createRecipe() {
    if(!formData.name || !formData.description) return;
    console.log(formData)
    await API.graphql({query: createRecipeMutation, variables: {input: formData} });
    //await API.graphql(graphqlOperation(createRecipeMutation, {input: formData}));
    setRecipes([ ...recipes, formData ]);
    setFormData(initialFormState);
    console.log('here 1: create')
  }

  async function deleteRecipe({id}) {
    const newRecipeArray = recipes.filter(recipe => recipe.id !== id);
    setRecipes(newRecipeArray);
    await API.graphql({query: deleteRecipeMutation, variables: {input: {id} }});

  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to the Amplify App Ex:<br />
          We now have Auth!
          And recipes in the making...
        </p>
        <input
          onChange={e => setFormData({ ...formData, 'name': e.target.value})}
          placeholder="Recipe Name"
          value={formData.name}
        />
        <input
        onChange={e => setFormData({ ...formData, 'category': e.target.value})}
        placeholder="Recipe Category"
        value={formData.category}
      />
        <input
          onChange={e => setFormData({ ...formData, 'description': e.target.value})}
          placeholder="Recipe Description"
          value={formData.description}
        />  
        <button onClick={createRecipe}>Create Recipe</button> 
        <div style={{marginBottom: 30 }}>
          <p>Recipe List</p>
          {
            recipes.map(recipe => (
              <div key={recipe.id || recipe.name} >
                <p> -------------------------- </p>
                <p>{recipe.name}: {recipe.category}</p>
                <p>{recipe.description}</p>
                <button onClick={() => deleteRecipe(recipe)}><i>delete recipe</i></button>
              </div>
            ))
          }
        </div> 

        <AmplifySignOut />
      </header>
    </div>
  );
}

export default withAuthenticator(App);
