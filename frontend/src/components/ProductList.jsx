import React, { useState } from "react";
import styles from "./ProductList.module.scss";

const ProductList = ({ products }) => {
  const [page, setPage] = useState(1);
  const perPage = 100;

  if (!products.length) return <p>Нет товаров для отображения</p>;

  const totalPages = Math.ceil(products.length / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const currentProducts = products.slice(start, end);

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className={styles.container}>
      <h2>Найдено товаров: {products.length}</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Название</th>
            <th>Цена (₽)</th>
            <th>Ссылка</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((p, i) => (
            <tr key={i}>
              <td>{start + i + 1}</td>
              <td>{p.name}</td>
              <td>{p.min_price ? `${p.min_price} ₽` : "—"}</td>
              <td>
                <a href={p.link} target="_blank" rel="noopener noreferrer">
                  Открыть
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button onClick={handlePrev} disabled={page === 1}>
          ⬅ Назад
        </button>
        <span>
          Страница {page} из {totalPages}
        </span>
        <button onClick={handleNext} disabled={page === totalPages}>
          Вперёд ➡
        </button>
      </div>
    </div>
  );
};

export default ProductList;
