import React, { useState } from "react";
import ReactModal from 'react-modal';

const ReadingProgressModal = ({ book, isOpen, closeModal }) => {
    return (
        <ReactModal isOpen={isOpen} onRequestClose={closeModal}>
            <h2> {bbok.volumeInfo.title } </h2>
            <p>Son OKunan Sayfa: {book.progress.page || 1} </p>
            <button onClick={closeModal}>Kapat</button>
        </ReactModal>
    );
};