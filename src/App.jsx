import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import { useState } from "react";

function App() {
  const [updated, setUpdated] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const refreshBooks = () => {
    setUpdated(!updated);
    setEditingBook(null);
  };

return (
  <div
    className="d-flex justify-content-center align-items-start"
    style={{ minHeight: "100vh", background: "#f8f9fa" }}
  >
    <div
      className="py-5"
      style={{
        maxWidth: "720px",
        width: "100%",
        margin: "0 auto",
      }}
    >
      <h1 className="mb-4 text-center">📖 Book Inventory</h1>
      <BookForm
        onAdd={refreshBooks}
        editingBook={editingBook}
        onCancel={() => setEditingBook(null)}
      />
      <hr />
      <BookList key={updated} onEdit={setEditingBook} />
    </div>
  </div>
);


}

export default App;
