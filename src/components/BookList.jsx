import { useEffect, useState } from "react";
import axios from "axios";

const BookList = ({ onEdit }) => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBooks = async () => {
    const res = await axios.get("http://127.0.0.1:8000/books/");
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/books/${id}`);
    fetchBooks();
  };

  // Arama filtresi
  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 className="mb-3 text-success">📚 Book List</h2>

      {/* Arama kutusu */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredBooks.length === 0 ? (
          <p>No matching books.</p>
        ) : (
          filteredBooks.map((book) => (
            <div className="col-md-6 mb-3" key={book.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {book.author} ({book.year})
                  </h6>
                  <p className="card-text">{book.description}</p>
                </div>
                <div className="card-footer d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(book.id)}
                  >
                    🗑️
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEdit(book)}
                  >
                    ✏️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookList;
