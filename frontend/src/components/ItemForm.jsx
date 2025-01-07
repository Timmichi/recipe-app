import { useState } from "react";
import api from "../api";

function ItemForm({ fetchItems }) {
  const [item, setItem] = useState({
    name: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Creating item:", item);
      await api.post("/items/", item);
      fetchItems();
      setItem({ name: "" });
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>Create New Item</h2>
      <form className="form-container" onSubmit={onSubmit}>
        Name:
        <input
          className="form-input"
          type="text"
          name="name"
          value={item.name}
          onChange={handleChange}
        />
        <button className="form-button" type="submit">
          Create Item
        </button>
      </form>
    </div>
  );
}

export default ItemForm;
