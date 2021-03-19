import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { firestore } from "../../firebase";
import CommentInput from "./CommentInput";
import Comment from "./Comment";

function Post({ id, userName, postImageUrl, caption, comments, user }) {
  const deletePost = () => {
    //delete post
    firestore.collection("posts")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <div className="post">
      <div className="post__header">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            alt={userName}
            style={{ height: "25px", width: "25px" }}
          >
            {userName.charAt(0)}
          </Avatar>
          <div className="post__headerInfo">
            <p style={{ fontSize: "14px" }}>{userName}</p>
          </div>
        </div>

        {user.name!=="" ? (
          user.name === userName ? (
            <button
              className="button"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={deletePost}
            >
              Delete
            </button>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
      {/* headr --> avatar + username + time */}
      {/* username + caption */}
      <div className="post__bottom">
        <p>
           {caption}
        </p>
      </div>

      {/* image */}
      <img className="post__image" src={postImageUrl} alt='' />

      {comments ? (
        comments.map((comment) => (
          <Comment key={comment.id} username={comment.username} comment={comment.comment} timestamp={comment.timestamp} />
        ))
      ) : (
        <></>
      )}
      {
        user.name==="" ?
        null :
        <CommentInput comments={comments} id={id} user={user} /> 
      }
    </div>
  );
}

export default Post;
