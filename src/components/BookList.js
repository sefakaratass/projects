import React from "react";

const Booklist = ({ books, addToReadingList }) => {
  return (
    <div className="bookList">
      {books.map((book, index) => (
        <div key={index} className="bookItem">
          {book.volumeInfo.imageLinks?.thumbnail && (
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={`${book.volumeInfo.title} kapağı`}
            />
          )}
          <h3>Kitap İsmi: {book.volumeInfo.title}</h3>
          <p>Yazarı: {book.volumeInfo.authors?.join(", ")}</p>
          <p>Sayfa Sayısı: {book.volumeInfo.pageCount}</p>
          <button onClick={() => addToReadingList(book)} className="addList-btn">Kitaplığıma Ekle</button>
        </div>
      ))}
    </div>
  );
};

export default Booklist;