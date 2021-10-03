import React from "react";
import "./HomeButton.css";

const HomeButton = ({ content, onClick }) => {
  return (
    <button class="HomeButton__button" onClick={onClick}>
      <div>
        <p>{content}</p>
      </div>
    </button>
  );
};

export default HomeButton;
