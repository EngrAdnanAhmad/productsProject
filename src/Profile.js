import React, { forwardRef } from 'react';

function Profile(props, pref) 
{
return(
  <div>
    <input type= "text" ref={pref}></input>
  </div>
)
}
export default forwardRef(Profile);
