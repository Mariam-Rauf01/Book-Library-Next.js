"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  available: boolean;
}

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Book>({
    id: 0,
    title: "",
    author: "",
    image: "",
    available: true,
  });
  const [editMode, setEditMode] = useState(false);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  // Add or update a book
  const saveBook = async () => {
    try {
      if (editMode) {
        // Update existing book
        await axios.put("/api/books", newBook);
        setBooks(books.map((book) => (book.id === newBook.id ? newBook : book)));
        setEditMode(false);
      } else {
        // Add new book with unique ID (using Date.now())
        const addedBook = { ...newBook, id: Date.now() }; // Using timestamp as a unique ID
        await axios.post("/api/books", addedBook);
        setBooks([...books, addedBook]); // Append new book to list
      }
      setNewBook({ id: 0, title: "", author: "", image: "", available: true });
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  // Delete a book
  const deleteBook = async (id: number) => {
    try {
      await axios.delete("/api/books", { data: { id } });
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Edit a book
  const editBook = (book: Book) => {
    setNewBook(book);
    setEditMode(true);
  };

  // Toggle availability
  const toggleAvailability = async (id: number) => {
    try {
      const updatedBook = books.find((book) => book.id === id);
      if (updatedBook) {
        const newStatus = !updatedBook.available;
        await axios.put("/api/books", { ...updatedBook, available: newStatus });
        setBooks(
          books.map((book) =>
            book.id === id ? { ...book, available: newStatus } : book
          )
        );
      }
    } catch (error) {
      console.error("Error toggling availability:", error);
    }
  };

  return (
    <>
<div className="flex justify-center items-center">
  <h2 className="text-6xl text-red-600 bg-yellow-200 font-bold mt-9 mb-2 px-4 py-2">
    Code Book Library
  </h2>
</div>
 <div className="container mx-auto p-4">
      {/* Form to add or edit book */}
      <div className="flex justify-center items-center mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="border p-2 m-8 rounded"
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="border p-2 m-2 rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newBook.image}
          onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
          className="border p-2 m-2 rounded"
        />
        <button
          onClick={saveBook}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          {editMode ? "Update Book" : "Add Book"}
        </button>
        {editMode && (
          <button
            onClick={() => {
              setNewBook({ id: 0, title: "", author: "", image: "", available: true });
              setEditMode(false);
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Book List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4"
          >
            <Image
                src={book.image}
                alt={book.title}
                width={500} // Add width and height for Image component
                height={300}
                className="w-full h-auto object-cover rounded mb-4"
              />
            <div className="text-center">
              <h3 className="text-xl font-semibold line-clamp-2">{book.title}</h3>
              <p className="text-gray-600">Author: {book.author}</p>
              <div className="mt-2">
                <button
                  onClick={() => deleteBook(book.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => editBook(book)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleAvailability(book.id)}
                  className={`${
                    book.available ? "bg-green-500" : "bg-gray-500"
                  } text-white mt-2 px-4 py-2 rounded`}
                >
                  {book.available ? "Mark Unavailable" : "Mark Available"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default BookList;
