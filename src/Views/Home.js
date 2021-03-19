import React from "react";
import Feed from "./Components/Feed";
// import { auth, firestore } from "../firebase";
// import Header from "../Views/Components/Header";
import CreatePost from "../Views/Components/CreatePost";
import {useSelector} from 'react-redux';

function Home() {
  const user = useSelector(state => state.user);
  // console.log(user);

  return (
    <div className="home">

      <div className="app__body">
        {/* Upload Option */}

        <CreatePost user={user} />

        <Feed user={user} />

      </div>

    </div>
  );
}

export default Home;

