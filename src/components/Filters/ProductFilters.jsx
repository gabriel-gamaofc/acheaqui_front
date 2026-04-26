import React from 'react';
import './ProductFilters.css';

export default function ProductFilters({
  filters,
  setFilters,
  categories,
  onSearch,
  onOpenFilters
}) {

  // 🔥 categoria selecionada derivada do estado global
  const selectedCategory = categories.find(cat =>
    cat.id == filters.category_id ||
    cat.children?.some(sub => sub.id == filters.category_id)
  );

  function update(key, value) {
    setFilters(prev => ({ ...prev, [key]: value }));
  }

  function handleCategorySelect(cat) {
    update('category_id', cat.id);
    onSearch();
  }

  function handleSubcategorySelect(sub) {
    update('category_id', sub.id);
    onSearch();
  }

  return (
    <div className="filters-top">

      {/* 🔍 BUSCA */}
      <div className="search-top">
        <input
          placeholder="Buscar produto..."
          value={filters.search}
          onChange={(e) => update('search', e.target.value)}
        />
        <button onClick={() => onSearch(filters)}>Buscar</button>
      </div>

      {/* 📦 CATEGORIAS */}
      <div className="categories-row">

        <div className="categories-scroll">

          <button
            className={!filters.category_id ? 'active' : ''}
            onClick={() => {
              update('category_id', '');
              onSearch();
            }}
          >
            Todas
          </button>

          {categories.map(cat => (
            <button
              key={cat.id}
              className={filters.category_id == cat.id ? 'active' : ''}
              onClick={() => handleCategorySelect(cat)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <button className="mobile-filter-btn" onClick={onOpenFilters}>
          Filtros
        </button>

      </div>

      {/* 🔥 SUBCATEGORIAS */}
      {selectedCategory?.children?.length > 0 && (
        <div className="subcategories-row">
          {selectedCategory.children.map(sub => (
            <button
              key={sub.id}
              className={filters.category_id == sub.id ? 'active' : ''}
              onClick={() => handleSubcategorySelect(sub)}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}

    </div>
  );
}