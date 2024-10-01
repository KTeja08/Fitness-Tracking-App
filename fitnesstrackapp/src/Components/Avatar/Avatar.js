import React from 'react';

import Avatar from '@mui/material/Avatar';


const UserAvatar = () => (
  <div className="user-avatar">
     <Avatar 
      src="/static/images/avatar/1.jpg" alt="Tejal " />
    
    <div className="user-info">
      <strong>Teja</strong>
    </div>
  </div>
);

export default UserAvatar;
