/*8. Given a list of products (name, category), add buttons like “All”, “Electronics”, “Clothes”
to filter and display accordingly.
 */
import { useState } from 'react';
const Question8 = () => {
  const products = [
    { name: 'Laptop', category: 'Electronics' },
    { name: 'Headphones', category: 'Electronics' },
    { name: 'T-Shirt', category: 'Clothes' },
    { name: 'Jeans', category: 'Clothes' },
    { name: 'Smartwatch', category: 'Electronics' },
  ];

  const [filteredCategory, setFilteredCategory] = useState('All');

  const filteredProducts =
    filteredCategory === 'All'
      ? products
      : products.filter((item) => item.category === filteredCategory);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Product Filter</h3>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        {/* <button type="button" class="btn btn-primary">
          Primary
        </button> */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setFilteredCategory('All')}
        >
          All
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => setFilteredCategory('Electronics')}
        >
          Electronics
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => setFilteredCategory('Clothes')}
        >
          Clothes
        </button>
      </div>

      <ul>
        {filteredProducts.map((product, index) => (
          <li key={index}>
            {product.name} - <strong>{product.category}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question8;
