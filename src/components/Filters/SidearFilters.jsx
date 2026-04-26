import React from 'react';
import './SidebarFilters.css';

export default function SidebarFilters({
  filters,
  setFilters,
  categories,
  onApply
}) {

  // 🔥 mesma lógica do topo (sincronizado)
  const selectedCategory = categories.find(cat =>
    cat.id == filters.category_id ||
    cat.children?.some(sub => sub.id == filters.category_id)
  );

  function update(key, value) {
    setFilters(prev => ({ ...prev, [key]: value }));
  }

  function handleCategory(cat) {
    update('category_id', cat.id);
  }

  function handleSubcategory(sub) {
    update('category_id', sub.id);
  }

  function handleClear() {
    const cleared = {
      search: '',
      category_id: '',
      condition: '',
      min_price: '',
      max_price: ''
    };

    setFilters(cleared);
    onApply && onApply(cleared);
  }

  function handleApply() {
    onApply && onApply(filters);
  }

  return (
    <aside className="sidebar-filters">

      <h3>Refinar busca</h3>

      {/* 🔥 CATEGORIA */}
      <select
        value={selectedCategory?.id || ''}
        onChange={(e) => {
          const cat = categories.find(c => c.id == e.target.value);
          if (cat) handleCategory(cat);
        }}
      >
        <option value="">Categoria</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* 🔥 SUBCATEGORIA */}
      {selectedCategory?.children?.length > 0 && (
        <select
          value={filters.category_id}
          onChange={(e) => {
            const sub = selectedCategory.children.find(c => c.id == e.target.value);
            if (sub) handleSubcategory(sub);
          }}
        >
          <option value="">Subcategoria</option>
          {selectedCategory.children.map(sub => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>
      )}

      <input
        type="number"
        placeholder="Preço mín"
        value={filters.min_price}
        onChange={(e) => update('min_price', e.target.value)}
      />

      <input
        type="number"
        placeholder="Preço máx"
        value={filters.max_price}
        onChange={(e) => update('max_price', e.target.value)}
      />

      <select
        value={filters.condition}
        onChange={(e) => update('condition', e.target.value)}
      >
        <option value="">Estado</option>
        <option value="novo">Novo</option>
        <option value="seminovo">Seminovo</option>
        <option value="usado">Usado</option>
      </select>

      <div className="actions">
        <button className="btn secondary" onClick={handleClear}>
          Limpar
        </button>

        <button className="btn primary" onClick={handleApply}>
          Aplicar
        </button>
      </div>

    </aside>
  );
}