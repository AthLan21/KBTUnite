import React, { useState } from "react";
import "./CommentInput.css";
import { firestore } from "../../firebase";

function CommentInput({ comments, id, user }) {
  const [comment, setComment] = useState("");
  const [commentMap, setcommentMap] = useState(comments ? comments : []);
  const dateID = new Date();

  const addComment = () => {
    // Add a new document in collection "cities"
    
    commentMap.push({
      id: dateID.getTime(),
      comment: comment,
      username: user.name,
      timestamp: dateID.toLocaleString('en-GB'),
    });

    firestore.collection("posts")
      .doc(id)
      .update({
        comments: commentMap,
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

    setComment("");
  };

  return (
    <div className="commentInput">
      <textarea
        rows="1"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="commentInput__textarea"
        placeholder="Add a comment.."
      ></textarea>

      <button
        onClick={addComment}
        className="button commentInput__button"
        style={{
          color: comment ? "gray" : "lightgrey",
          fontWeight: comment ? "600" : "500",
        }}
      >
        Post
      </button>
    </div>
  );
}

export default CommentInput;
