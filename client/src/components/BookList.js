import { useEffect, useState } from 'react';
import api from '../api';
import BookForm from './BookForm';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => { api.get('/books').then(r => setBooks(r.data)); }, []);

  const save = book => {
    setBooks(prev => {
      const idx = prev.findIndex(b => b._id === book._id);
      return idx >= 0 ? prev.map(b => (b._id === book._id ? book : b)) : [book, ...prev];
    });
    setEditing(null);
  };

  const del = async id => {
    await api.delete(`/books/${id}`);
    setBooks(b => b.filter(x => x._id !== id));
  };

  return (
    <>
      <h1 className="page-title">Books</h1>

      {editing
        ? <BookForm existing={editing} onSaved={save} />
        : <BookForm onSaved={save} />
      }

      <ul className="card-grid">
        {books.map(b => (
          <li key={b._id} className="card">
            {b.coverUrl && <img src={b.coverUrl} alt={b.title} className="card-img" />}
            <h3 className="card-title">{b.title}</h3>
            <p className="card-author">{b.author}</p>
            <div className="card-actions">
              <button className="btn" onClick={() => setEditing(b)}>Edit</button>
              <button className="btn btn-danger" onClick={() => del(b._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
