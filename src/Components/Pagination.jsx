import React from "react";

export default function Pagination({ currentPage, totalCards, setPage }) {
  const cardsPerPage = 10;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  return (
    <div>
      <button onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={() => setPage(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

// NO FUNCIONA
