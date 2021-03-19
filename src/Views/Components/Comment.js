import React from "react";
import "./Comment.css";

function Comment({ username, comment, timestamp }) {
  return (
    <div className="comment">
      <p>
        <strong>{username}</strong> {comment}
      </p>
      <p>
        {timestamp }
      </p>
    </div>
  );
}

export default Comment;
