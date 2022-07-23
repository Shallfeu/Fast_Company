import React from "react";
import _ from "lodash";

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
  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={`page-item ${currentPage === page ? "active" : ""}`}
            key={`page_${page}`}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Pagination.propTypes=(
//   itemsCount:PropTypes.number.isRequire,
//   pageSize:PropTypes.number.isRequire,
//   onPageChange:PropTypes.func.isRequire,
//   currentPage:PropTypes.number.isRequire,
// )

export default Pagination;
