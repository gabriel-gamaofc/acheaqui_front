import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api.js';
import './CreateProductPage.css';

export default function CreateProductPage() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [level1, setLevel1] = useState(null);
  const [level2, setLevel2] = useState(null);

  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const [form, setForm] = useState({
    title: '',
    price: '',
    condition: '',
    description: '',
    whatsapp: ''
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/categories/tree').then(res => setCategories(res.data));
  }, []);

  function handleChange(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  function handleImages(e) {
    const files = Array.from(e.target.files);

    setImages(prev => [...prev, ...files]);

    const previews = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));

    setPreview(prev => [...prev, ...previews]);
  }

  function removeImage(index) {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreview(prev => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      images.forEach(img => {
        formData.append('images', img);
      });

      const finalCategoryId = level2?.id || level1?.id;

      if (isOtherSelected && customCategory) {
        formData.append('category_name', customCategory);
      } else if (finalCategoryId) {
        formData.append('category_id', finalCategoryId);
      } else {
        alert('Selecione uma categoria');
        setLoading(false);
        return;
      }

      const { data } = await api.post('/products', formData);

      navigate(`/produto/${data.id}`);

    } catch (err) {
      console.error(err);
      alert('Erro ao criar produto');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="create-container">

      <h1>Criar anúncio</h1>

      <form className="form-vertical" onSubmit={handleSubmit}>

        <input
          name="title"
          placeholder="Título"
          onChange={handleChange}
        />

        <input
          name="price"
          type="number"
          placeholder="Preço"
          onChange={handleChange}
        />

        {/* CATEGORIA */}
        <select onChange={(e) => {
          if (e.target.value === 'other') {
            setIsOtherSelected(true);
            setLevel1(null);
            setLevel2(null);
            return;
          }

          const selected = categories.find(c => c.id == e.target.value);

          setIsOtherSelected(false);
          setLevel1(selected);
          setLevel2(null);
        }}>
          <option value="">Categoria</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
          <option value="other">Outra</option>
        </select>

        {/* SUBCATEGORIA */}
        {level1?.children?.length > 0 && (
          <select onChange={(e) => {
            if (e.target.value === 'other') {
              setIsOtherSelected(true);
              return;
            }

            const selected = level1.children.find(c => c.id == e.target.value);

            setIsOtherSelected(false);
            setLevel2(selected);
          }}>
            <option value="">Subcategoria</option>
            {level1.children.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
            <option value="other">Outra</option>
          </select>
        )}

        {/* OUTRA CATEGORIA */}
        {isOtherSelected && (
          <input
            placeholder="Digite a categoria"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
          />
        )}

        <input
          name="whatsapp"
          placeholder="WhatsApp"
          onChange={handleChange}
        />

        <select name="condition" onChange={handleChange}>
          <option value="">Estado</option>
          <option value="novo">Novo</option>
          <option value="seminovo">Seminovo</option>
          <option value="usado">Usado</option>
        </select>

        <textarea
          name="description"
          placeholder="Descrição do produto"
          onChange={handleChange}
        />

        {/* IMAGENS */}
        <div className="images-section">

          <label className="image-upload">
            +
            <input type="file" multiple hidden onChange={handleImages} />
          </label>

          {preview.map((img, index) => (
            <div className="image-item" key={index}>
              <img src={img.url} alt="" />
              <button type="button" onClick={() => removeImage(index)}>×</button>
            </div>
          ))}

        </div>

        <button className="btn primary full" disabled={loading}>
          {loading ? 'Publicando...' : 'Publicar anúncio'}
        </button>

      </form>

    </div>
  );
}