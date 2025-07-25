import { useState } from 'react';
import api from '../api';

export default function BookForm({ onSaved, existing }) {
  const [form, setForm] = useState({
    title: existing?.title || '',
    author: existing?.author || '',
    description: existing?.description || ''
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(existing?.coverUrl || '');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = e => {
    const f = e.target.files[0];
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };

  const submit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach(k => data.append(k, form[k]));
    if (file) data.append('cover', file);

    setLoading(true);
    try {
      const res = existing
        ? await api.put(`/books/${existing._id}`, data)
        : await api.post('/books', data);
      onSaved(res.data);
    } finally { setLoading(false); }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{existing ? 'Edit Book' : 'Add New Book'}</h2>
      
      <form onSubmit={submit} className="form">
        <input 
          name="title" 
          value={form.title} 
          onChange={handleChange} 
          placeholder="Title" 
          className="form-input"
          required 
        />
        
        <input 
          name="author" 
          value={form.author} 
          onChange={handleChange} 
          placeholder="Author" 
          className="form-input"
          required 
        />
        
        <textarea 
          name="description" 
          value={form.description} 
          onChange={handleChange} 
          placeholder="Description" 
          className="form-textarea"
          rows="3"
        />
        
        <label className="file-label">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFile} 
            className="file-input"
          />
          <span className="file-button">📁 Choose Cover Image</span>
        </label>
        
        {preview && <img src={preview} alt="preview" className="preview-img" />}
        
        <button 
          type="submit" 
          disabled={loading} 
          className="form-submit"
        >
          {loading ? 'Uploading…' : (existing ? 'Update Book' : 'Add Book')}
        </button>
      </form>
    </div>
  );
}