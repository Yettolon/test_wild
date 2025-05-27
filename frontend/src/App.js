import React, { useState } from "react";
import axios from "axios";
import ProductList from "./components/ProductList";
import "./App.module.scss";

const App = () => {
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [pages, setPages] = useState(4);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (Number(minPrice) > Number(maxPrice)) {
      alert("Минимальная цена не может быть больше максимальной");
      return;
    }

    if (!pages || Number(pages) < 1 || Number(pages) > 100) {
      alert("Количество страниц должно быть от 1 до 100");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/products", {
        params: {
          min_price: minPrice,
          max_price: maxPrice,
          pages,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Поиск товаров Wildberries</h1>

      <div className="filter-form">
        <label>Цена от: </label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <label>до: </label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <label>Количество страниц для парсинга: </label>
        <input
          type="number"
          min="1"
          max="100"
          value={pages}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setPages(value === "" ? "" : Math.max(1, Math.min(100, Number(value))));
            }
          }}
        />

        <button onClick={handleSearch}>Поиск</button>
      </div>

      {loading ? <p>Загрузка...</p> : <ProductList products={products} />}
    </div>
  );
};

export default App;