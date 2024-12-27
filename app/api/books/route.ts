import { NextResponse } from "next/server";

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  available: boolean;
}

let books: Book[] = [
  {
    id: 1,
    title: "Everything You Need to Ace Computer Science and Coding in One Big Fat Notebook: The Complete Middle School Study Guide (Big Fat Notebooks)",
    author: "Workman Publishing",
    image: "/images/code1.jpg",
    available: true,
  },
  {
    id: 2,
    title: "Cracking the Coding Interview: 189 Programming Questions and Solutions (Cracking the Interview & Career)",
    author: "Gayle Laakmann McDowell",
    image: "/images/code2.jpg",
    available: true,
  },
  {
    id: 3,
    title: "Python Crash Course, 3rd Edition: A Hands-On, Project-Based Introduction to Programming",
    author: "Eric Matthes",
    image: "/images/code3.jpg",
    available: true,
  },
  {
    id: 4,
    title: "C# & C++: 5 Books in 1 - The #1 Coding Course from Beginner to Advanced (Computer Programming)",
    author: "Mark Reed",
    image: "/images/code4.jpg",
    available: true,
  },
  {
    id: 5,
    title: "COMPUTER PROGRAMMING FUNDAMENTALS: [4 Books in 1] Coding For Beginners, Coding With Python, SQL Programming For Beginners, Coding HTML. A Complete ... With A Crash Course. (Coding Made Easy)",
    author: "Ashton Miller",
    image: "/images/code5.jpg",
    available: true,
  },
  {
    id: 6,
    title: "The Pragmatic Programmer: Your Journey To Mastery, 20th Anniversary Edition (2nd Edition)",
    author: "David Thomas",
    image: "/images/code6.jpg",
    available: true,
  },
  {
    id: 7,
    title: "ICD-10-CM and ICD-10-PCS Coding Handbook without Answers 2025",
    author: "Nelly Leon-Chisen",
    image: "/images/code7.jpg",
    available: true,
  },
  {
    id: 8,
    title: "Python, Javascript, Java, SQL, Linux: The Complete Coding and Developing Crash Course for Beginners (2024) (Computer Programming)",
    author: "Mark Reed",
    image: "/images/code8.jpg",
    available: true,
  },
  {
    id: 9,
    title: "Computer Networking Bible: [3 in 1] The Complete Crash Course to Effectively Design, Implement and Manage Networks. Including Sections on Security, Performance and Scalability",
    author: "Rick C. Worley",
    image: "/images/code9.jpg",
    available: true,
  },
];

// GET Method
export async function GET() {
  return NextResponse.json(books, { status: 200 });
}

// POST Method
export async function POST(req: Request) {
  try {
    const newBook: Book = await req.json();
    const id = books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1;
    books.push({ ...newBook, id });
    return NextResponse.json({ message: "Book added successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error adding book!", error }, { status: 500 });
  }
}

// PUT Method
export async function PUT(req: Request) {
  try {
    const updatedBook: Book = await req.json();
    books = books.map((book) =>
      book.id === updatedBook.id ? { ...book, ...updatedBook } : book
    );
    return NextResponse.json({ message: "Book updated successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating book!", error }, { status: 500 });
  }
}

// DELETE Method
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    books = books.filter((book) => book.id !== id);
    return NextResponse.json({ message: "Book deleted successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting book!", error }, { status: 500 });
  }
}