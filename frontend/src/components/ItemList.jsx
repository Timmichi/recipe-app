import api from "../api";

function ItemList({ items, fetchItems }) {
  const deleteItem = async (id) => {
    try {
      await api.delete(`/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="item-list">
      <h2>Item List</h2>
      {items.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
