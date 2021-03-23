import React from 'react'
import {Link} from "react-router-dom"
export default function NavBar() {
    return (
        <div>
            <Link
          to="/tasks"
          className="btn btn-lg custom-button"
          role="button"
        >
          Tasks
        </Link>
        <Link
          to="/categories"
          className="btn btn-lg custom-button"
          role="button"
        >
          Categories
          </Link>
        </div>
    )
}
