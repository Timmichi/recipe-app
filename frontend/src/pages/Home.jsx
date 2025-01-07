// src/pages/Home.jsx
import { useState, useEffect } from "react";
import api from "../api";
import ItemForm from "../components/ItemForm";
import ItemList from "../components/ItemList";
import "../styles/Form.css";

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get("/items/");
      console.log(res.data);
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <div className="home-container">
      <ItemForm fetchItems={fetchItems} />
      <ItemList items={items} fetchItems={fetchItems} />
    </div>
  );
}

export default Home;
