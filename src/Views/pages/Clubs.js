import React from 'react'
import './Clubs.css'

import Feed from '../Components/Feed';
import CreatePost from '../Components/CreatePost';
import LatestNews from '../Components/LatestNews';
import ProfileTab from '../Components/ProfileTab';
import {useSelector} from 'react-redux';

export default function Sidebar(){
  const groups = (topic) => (
    <div className="groupItem">
      <p>{topic}</p>
    </div>
  )
  const news = (articleTopic) => (
    <div className="newsItem">
      <p>{articleTopic}</p>
    </div>
  )

  const user = useSelector(state => state.user);
  
  return (
    <div className="main">
      <div className="Sidebar" >
        <div className='profileTab'>
          <ProfileTab userName = {user.name} />
        </div>
        <div className='Sidebar__bottomHeader'>
          <h2 >Your Clubs</h2>
        </div>
        <div className="Sidebar__bottom">
          {groups ('Volleyball')}
          {groups ('Programming')}
          {groups ('Mechanics')}
          {groups ('Photography')}
        </div>
      </div>
      <div className = 'CenterArea'>
        <div className='CreatePost'>
            <CreatePost user = {user}/>
        </div>
        <div className='Feed'>
          <Feed user = {user}/>
        </div>
      </div>

      <LatestNews />

    </div>
  )
}
