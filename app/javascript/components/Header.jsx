import React from 'react'

export default function Header(props) {
    return (
        <div>
        <h1 className="display-4">Journal</h1>
        <p className="lead">
          Hello {props.name? props.name:props.username},
          </p>
          <p className="lead">
          See what you need to do today!
        </p>
        <hr className="my-4" />
        </div>
    )
}
