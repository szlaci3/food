import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setQuery, setSort, setPage, setFilters } from '../features/catalogUI/catalogUISlice';
import { fetchProducts } from '../features/products/productsSlice';

export default function CatalogPage() {
  const dispatch = useAppDispatch();
  const { query, sort, currentPage, filters } = useAppSelector((state) => state.catalogUI);
  const { entities, results, loading, error } = useAppSelector((state) => state.products);
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    // We stringify filters purely for dependency array safety
    dispatch(fetchProducts({ query, sort, currentPage, filters }));
  }, [dispatch, query, sort, currentPage, JSON.stringify(filters)]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Catalog Page</h1>
      
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="search" style={{ marginRight: '8px' }}>Search:</label>
        <div style={{ display: 'inline-flex', gap: '8px' }}>
          <input 
            id="search"
            type="text" 
            value={localQuery} 
            onChange={(e) => setLocalQuery(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && dispatch(setQuery(localQuery))}
            placeholder="Search items..."
          />
          <button onClick={() => dispatch(setQuery(localQuery))}>Search</button>
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="sort" style={{ marginRight: '8px' }}>Sort by:</label>
        <select 
          id="sort"
          value={sort} 
          onChange={(e) => dispatch(setSort(e.target.value))}
        >
          <option value="relevance">Relevance</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <button 
          onClick={() => dispatch(setPage(Math.max(1, currentPage - 1)))}
          disabled={currentPage === 1}
          style={{ marginRight: '8px' }}
        >
          Previous Page
        </button>
        <span>Page {currentPage}</span>
        <button 
          onClick={() => dispatch(setPage(currentPage + 1))}
          style={{ marginLeft: '8px' }}
        >
          Next Page
        </button>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <p>Active Filters: {JSON.stringify(filters)}</p>
        <button 
          onClick={() => {
            const newFilters = { ...filters };
            if (newFilters.category?.includes('dairy')) {
              delete newFilters.category;
            } else {
              newFilters.category = ['dairy'];
            }
            dispatch(setFilters(newFilters));
          }}
        >
          Toggle 'Dairy' Filter
        </button>
      </div>

      <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #eee' }} />

      <h2>Products</h2>
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && !error && results.length === 0 && <p>No products found.</p>}
      {!loading && !error && results.length > 0 && (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {results.map((id) => {
            const product = entities[id];
            if (!product) return null;
            return (
              <li key={product.id} style={{ padding: '8px 0', borderBottom: '1px solid #ccc' }}>
                <div style={{ fontWeight: 'bold' }}>{product.name}</div>
                <div style={{ fontSize: '0.9em', color: '#666', marginTop: '4px' }}>
                  {product.brands && <span style={{ marginRight: '16px' }}><strong>Brand:</strong> {product.brands}</span>}
                  {product.origin && <span><strong>Origin:</strong> {product.origin}</span>}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
