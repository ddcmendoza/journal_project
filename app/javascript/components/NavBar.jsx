import React from 'react'
import {Link} from "react-router-dom"
export default function NavBar(props) {
    return (
        <div>
          {props.isLoggedIn &&
            <span>
              <Link
            to="/tasks"
            className="btn btn-lg custom-button"
            role="button"
          >
           All Tasks
          </Link>
          <Link
            to="/categories"
            className="btn btn-lg custom-button"
            role="button"
          >
          Categories
          </Link>
          </span>
      }
     {/*  {!props.isLoggedIn &&
            <span>
              <span className="btn btn-lg custom-button" style={{cursor: 'default'}}>
                       All Tasks
              </span>
              <span className="btn btn-lg custom-button" style={{cursor: 'default'}}>
            Categories
            </span>
            </span>
      } */}
          {!props.isLoggedIn &&
          <Link
          to="/login"
          className="btn btn-lg custom-button float-right"
          role="button"
        >
          Log-in
          </Link>
          }
          {props.isLoggedIn &&
         <>
            <Link
            to="/logout"
            className="btn btn-lg custom-button float-right"
            role="button"
          >
            Logout
            </Link>
              <Link
            to="/account"
            className="btn btn-lg custom-button float-right"
            role="button"
          >
            Account
            </Link>
         </>
          }

        </div>
    )
}
