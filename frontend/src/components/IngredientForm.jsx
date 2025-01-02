function IngredientForm({ ingredients, setIngredients }) {
  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: '', quantity: '', measurement: '', price: '' }
    ]);
  };

  const updateIngredient = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value
    };
    setIngredients(updatedIngredients);
  };
  console.log(ingredients);
  return (
    <div className="ingredient-form">
      {ingredients.map((ingredient, index) => (
        <div key={ingredient.id || index} className="ingredient-row">
          <h4>Ingredient {index + 1}</h4>
          <input
            value={ingredient.name}
            onChange={(e) => updateIngredient(index, 'name', e.target.value)}
            placeholder="Name"
          />
          <input
            value={ingredient.quantity}
            onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
            placeholder="Quantity"
          />
          <input
            value={ingredient.measurement}
            onChange={(e) => updateIngredient(index, 'measurement', e.target.value)}
            placeholder="Measurement"
          />
          <input
            value={ingredient.price || ""}
            onChange={(e) => updateIngredient(index, 'price', e.target.value)}
            placeholder="Price"
            type="number"
            step="0.01"
          />
        </div>
      ))}
      <button onClick={addIngredient}>Add Ingredient</button>
    </div>
  );
}

export default IngredientForm;