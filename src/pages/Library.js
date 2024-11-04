import React, { useContext, useState } from "react";
import { ReadingListContext } from '../context/ReadingListContext';
import './Library.css';

const Library = () => {
  const { readingList, removeFromReadingList, updateReadingProgress } = useContext(ReadingListContext);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newPageNumber, setNewPageNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [completionMessage, setCompletionMessage] = useState("");

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setNewPageNumber("");
    setErrorMessage("");
    setCompletionMessage("");
  };

  const handleClosePopup = () => {
    setSelectedBook(null);
    setNewPageNumber("");
    setErrorMessage("");
    setCompletionMessage("");
  }

  const handleUpdateProgress = () => {
    if (newPageNumber && selectedBook) {
      const pageNumber = parseInt(newPageNumber);

      if (pageNumber < 0 || pageNumber > selectedBook.volumeInfo.pageCount) {
        setErrorMessage(`Lütfen 0 ile ${selectedBook.volumeInfo.pageCount} arasında bir sayfa numarası girin.`);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        return;
      }

      if (pageNumber === selectedBook.volumeInfo.pageCount) {
        setCompletionMessage("Kitap bitirildi!");
        updateReadingProgress(selectedBook.id, pageNumber, true);
      } else {
        setCompletionMessage("");
        updateReadingProgress(selectedBook.id, pageNumber);
      }

      setNewPageNumber("");
      setErrorMessage("");
    }
  }

  return (
    <div className="readingList">
      <div className="readingListContent">
        {readingList.length > 0 ? (
          readingList.map((book, index) => (
            <div key={index} className="bookItem">
              {book.volumeInfo.imageLinks?.thumbnail ? (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt="Kitap kapağı"
                />
              ) : (
                <img
                  src="path/to/default-image.jpg"
                  alt="Varsayılan kitap kapağı"
                />
              )}
              <h3>{book.volumeInfo.title}</h3>
              <p>
                {book.volumeInfo.authors
                  ? book.volumeInfo.authors.join(", ")
                  : "Yazar bilgisi mevcut değil."}
              </p>
              <p>Sayfa Sayısı: {book.volumeInfo.pageCount}</p>
              <p>Okuma İlerlemesi: {book.progress?.page || 0} sayfa</p>
              {book.progress?.page < book.volumeInfo.pageCount && (
                <button className="read-btn" onClick={() => handleBookClick(book)}>
                  Oku
                </button>
              )}
              <button
                className="remove-btn"
                onClick={() => removeFromReadingList(book)}
              >
                Kaldır
              </button>
            </div>
          ))
        ) : (
          <p className="message">Henüz okuma listenize kitap eklemediniz.</p>
        )}
      </div>

      {selectedBook && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{selectedBook.volumeInfo.title}</h3>
            <p>Yazar(lar): {selectedBook.volumeInfo.authors?.join(", ")}</p>
            <p>Okuma İlerlemesi: {selectedBook.progress?.page || 0} sayfa</p>
            <input 
              type="number" 
              value={newPageNumber} 
              onChange={(e) => setNewPageNumber(e.target.value)} 
              placeholder="Yeni sayfa numarası"
            />
            <button onClick={handleUpdateProgress}>İlerlemeni Güncelle</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {completionMessage && <p className="completion-message">{completionMessage}</p>}
            <button onClick={handleClosePopup}>Kapat</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;