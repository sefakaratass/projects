import React, { useContext, useState } from "react";
import Booklist from "../components/BookList";
import SearchBar from "../components/SearchBar";
import { ReadingListContext } from '../context/ReadingListContext';

const Home = () => {
  const { addToReadingList } = useContext(ReadingListContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyDkbHOVfQc1QdW_WHzHYJax6fBvX1W9Tj0`
      );
      if(!res.ok) {
        throw new Error ("Hata, Kitaplar Yüklenemedi");
      }
      const data = await res.json();
      const filteredBooks = data.items?.filter(book =>
        book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail);
      setBooks(filteredBooks || []);
      setSearchPerformed(true);
      setSearchTerm('');
    } catch (error) {
      console.error('Hata', error);
    }
  };

  const handleClearResults = () => {
    setSearchPerformed(false);
    setBooks([]);
  };

  return (
    <div className="container">
      <header className="header">
        <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
            handleClearResults={handleClearResults}
            showClearButton={books.length > 0}
        />
      </header>
      <section className='booksSection'>
        {searchPerformed && <h2>Arama Sonuçları</h2>}
        <Booklist books={books} addToReadingList={addToReadingList}/>
      </section>
    </div>
  )
}

export default Home;