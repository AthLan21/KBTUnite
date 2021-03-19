import React from 'react';
import "./ProfileTab.css";
import {Avatar} from '@material-ui/core';

function ProfileTab({userName}) {
   return ( 
        <div className='ProfileTab'>
            <img src="" alt="" />
            <Avatar className="Profile__Avatar" />
            <h2>{userName}</h2>
        </div>
   )
};

export default ProfileTab;