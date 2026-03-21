
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setQuery, setSort, setPage, setFilters } from '../features/catalogUI/catalogUISlice';

export default function CatalogPage() {
  const dispatch = useAppDispatch();
  const { query, sort, currentPage, filters } = useAppSelector((state) => state.catalogUI);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Catalog Page</h1>
      
      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="search" style={{ marginRight: '8px' }}>Search:</label>
        <input 
          id="search"
          type="text" 
          value={query} 
          onChange={(e) => dispatch(setQuery(e.target.value))} 
          placeholder="Search items..."
        />
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
    </div>
  );
}