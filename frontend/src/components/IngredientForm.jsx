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
  return (
    <div className="ingredient-form">
      {ingredients.map((ingredient, index) => (
        <div key={ingredient.id || index}>
          <h4>Ingredient {index + 1}</h4>
          <input
            className="form-input"
            value={ingredient.name}
            onChange={(e) => updateIngredient(index, 'name', e.target.value)}
            placeholder="Name"
            required
          />
          <input
            className="form-input"
            value={ingredient.quantity || ""}
            onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
            placeholder="Quantity"
            type="number"
            step="0.01"
          />
          <input
            className="form-input"
            value={ingredient.measurement}
            onChange={(e) => updateIngredient(index, 'measurement', e.target.value)}
            placeholder="Measurement"
          />
          <input
            className="form-input"
            value={ingredient.price || ""}
            onChange={(e) => updateIngredient(index, 'price', e.target.value)}
            placeholder="Price"
            type="number"
            step="0.01"
          />
          <button onClick={() => setIngredients(ingredients.filter((_, idx) => idx !== index))}>Remove Ingredient</button>
        </div>
      ))}
      <div>
        <button style={{ margin: "10px 0px" }} onClick={addIngredient}>Add Ingredient</button>
      </div>
    </div>
  );
}

export default IngredientForm;