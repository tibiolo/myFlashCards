import React from 'react';

function Collection(props) {
  return (
    <div id={props.id} className="card" onClick={props.onClick} >
      <h2 className="card-title">{props.title}</h2>
      <p className="card-description">{props.description}</p>
    </div>
  )
}

export default Collection;
