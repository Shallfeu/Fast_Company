import React from "react";
import lodash from "lodash";

type PaginationProps = {
  itemsCount: number;
  pageSize: number;
  onPageChange: (pageIndex: number) => void;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = lodash.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={`page-item ${page === currentPage ? " active" : ""}`}
            key={`page_${page}`}
          >
            <button
              type="button"
              className="page-link"
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
