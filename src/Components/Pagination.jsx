import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

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

      <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-right">Tooltip text</Tooltip>}>
        <button>Hover over me</button>
      </OverlayTrigger>
    </div>
  );
}

// NO FUNCIONA
