import React from "react";
import { useHistory } from "react-router-dom";

const BackHistoryBtn: React.FC = () => {
  const hist = useHistory();

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => hist.goBack()}
    >
      <i className="bi bi-caret-left"></i>Назад
    </button>
  );
};

export default BackHistoryBtn;
