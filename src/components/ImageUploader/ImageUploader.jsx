import React from 'react';
import './ImageUploader.css';

export default function ImageUploader({ files, setFiles }) {
  function handleFiles(event) {
    const selected = Array.from(event.target.files || []);
    setFiles(selected.slice(0, 8));
  }

  function removeFile(indexToRemove) {
    setFiles((current) => current.filter((_, index) => index !== indexToRemove));
  }

  return (
    <div className="uploader">
      <label className="upload-box">
        <input type="file" multiple accept="image/png,image/jpeg,image/webp" onChange={handleFiles} />
        <span className="upload-icon">+</span>
        <strong>Adicionar fotos do produto</strong>
        <small>Até 8 imagens. A primeira imagem será usada como capa do anúncio.</small>
      </label>
      <div className="preview-grid">
        {files.map((file, index) => (
          <div className="preview-item" key={`${file.name}-${index}`}>
            <img src={URL.createObjectURL(file)} alt={file.name} />
            {index === 0 && <span>Capa</span>}
            <button type="button" onClick={() => removeFile(index)}>Remover</button>
          </div>
        ))}
      </div>
    </div>
  );
}
