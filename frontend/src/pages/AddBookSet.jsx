import React, { useState } from "react";
import API from "../services/api";

const AddBookSet = () => {
  const [formData, setFormData] = useState({
    school: "",
    className: "",
    books: [{ name: "", price: 0, quantity: 1 }], // Initialize with one book entry
    setPrice: 0,
    totalQuantity: 1,
  });

  const handleAddBook = () => {
    setFormData({
      ...formData,
      books: [...formData.books, { name: "", price: 0, quantity: 1 }],
    });
  };

  const handleBookChange = (index, field, value) => {
    const updatedBooks = formData.books.map((book, i) =>
      i === index ? { ...book, [field]: value } : book
    );
    setFormData({ ...formData, books: updatedBooks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/book-sets/create", formData);
      alert("Book set added successfully");
    } catch (error) {
      console.error("Error adding book set", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Book Set</h2>
      <input
        type="text"
        placeholder="School"
        value={formData.school}
        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
      />
      <input
        type="text"
        placeholder="Class Name"
        value={formData.className}
        onChange={(e) =>
          setFormData({ ...formData, className: e.target.value })
        }
      />
      {formData.books.map((book, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Book Name"
            value={book.name}
            onChange={(e) =>
              handleBookChange(index, "name", e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Book Price"
            value={book.price}
            onChange={(e) =>
              handleBookChange(index, "price", parseFloat(e.target.value))
            }
          />
          <input
            type="number"
            placeholder="Book Quantity"
            value={book.quantity}
            onChange={(e) =>
              handleBookChange(index, "quantity", parseInt(e.target.value))
            }
          />
        </div>
      ))}
      <button type="button" onClick={handleAddBook}>
        Add Another Book
      </button>
      <input
        type="number"
        placeholder="Set Price"
        value={formData.setPrice}
        onChange={(e) =>
          setFormData({ ...formData, setPrice: parseFloat(e.target.value) })
        }
      />
      <input
        type="number"
        placeholder="Total Quantity"
        value={formData.totalQuantity}
        onChange={(e) =>
          setFormData({ ...formData, totalQuantity: parseInt(e.target.value) })
        }
      />
      <button type="submit">Add Book Set</button>
    </form>
  );
};

export default AddBookSet;