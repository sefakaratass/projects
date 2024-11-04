import React, { createContext, useState, useEffect } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { ref, set, remove, onValue } from 'firebase/database';
import { onAuthStateChanged } from "firebase/auth";

export const ReadingListContext = createContext();

export const ReadingListProvider = ({ children }) => {
  const [readingList, setReadingList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const userBooksRef = ref(db, `users/${user.uid}/readingList`);
      onValue(userBooksRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const booksArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setReadingList(booksArray);
        } else {
          setReadingList([]);
        }
      });
    }
  }, [user]);

  const addToReadingList = (book) => {
    const isBookInList = readingList.some((item) => item.id === book.id);
  
    if (!isBookInList) {
      const bookWithProgress = { ...book, progress: { page: 0 } };
      setReadingList((prevList) => [...prevList, bookWithProgress]);

      const bookRef = ref(db, `users/${user.uid}/readingList/${book.id}`);
      set(bookRef, bookWithProgress)
        .then(() => {
          console.log("Kitap Firebase'e eklendi:", book.id);
        })
        .catch((error) => {
          console.error("Firebase'e eklerken hata:", error);
        });
    } else {
      console.log("Kitap zaten okuma listenizde mevcut!");
    }
  }

  const removeFromReadingList = (bookToRemove) => {
    const bookRef = ref(db, `users/${user.uid}/readingList/${bookToRemove.id}`);
    remove(bookRef)
      .then(() => {
        console.log("Kitap başarıyla silindi.", bookToRemove.id);
        setReadingList((prevList) =>
          prevList.filter((book) => book.id !== bookToRemove.id)
        );
      })
      .catch((error) => {
        console.error("Kitap silinirken bir hata oluştu.", error);
      });
  };

  const updateReadingProgress = (bookId, page) => {
    const bookRef = ref(db, `users/${user.uid}/readingList/${bookId}/progress`);
    set(bookRef, { page })
      .then(() => {
        console.log(`Kitap ilerlemesi güncellendi: ${bookId}, Sayfa: ${page}`);
        setReadingList((prevList) =>
          prevList.map((book) => 
            book.id === bookId ? { ...book, progress: { page } } : book
          )
        );
      })
      .catch((error) => {
        console.error("İlerleme güncellenirken hata:", error);
      });
  };

  return (
    <ReadingListContext.Provider value={{ readingList, addToReadingList, removeFromReadingList, updateReadingProgress }}>
      {children}
    </ReadingListContext.Provider>
  );
};
