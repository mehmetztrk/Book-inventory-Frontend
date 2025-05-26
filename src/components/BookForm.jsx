import { useState, useEffect } from "react";
import axios from "axios";

const BookForm = ({ onAdd, editingBook, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    year: "",
  });

  useEffect(() => {
    if (editingBook) {
      setFormData(editingBook);
    }
  }, [editingBook]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingBook) {
      await axios.put(`http://127.0.0.1:8000/books/${editingBook.id}`, {
        ...formData,
        year: parseInt(formData.year),
      });
    } else {
      await axios.post("http://127.0.0.1:8000/books/", {
        ...formData,
        year: parseInt(formData.year),
      });
    }
    setFormData({ title: "", author: "", description: "", year: "" });
    onAdd();
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="mb-3 text-primary">
          {editingBook ? "✏️ Edit Book" : "➕ Add a Book"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              required
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author"
              required
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Year"
              type="number"
              required
            />
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-primary" type="submit">
              {editingBook ? "Update Book" : "Add Book"}
            </button>
            {editingBook && (
              <button
                className="btn btn-secondary"
                onClick={onCancel}
                type="button"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
