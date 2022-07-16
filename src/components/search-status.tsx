import React from 'react';

function SearchStatus({ length }: any) {
  if (length === 0) {
    return <span className="badge bg-danger">Никто с тобой не тусанет</span>;
  }
  if (length === 1 || length > 4) {
    return <span className="badge bg-primary">{length} человек тусанет с тобой сегодня</span>;
  }
  return <span className="badge bg-primary">{length} человек тусанут с тобой сегодня</span>;
}

export default SearchStatus;
