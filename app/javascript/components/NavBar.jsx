import React from 'react'
import {Link} from "react-router-dom"
export default function NavBar(props) {
    return (
        <div className="pt-2">
          {props.isLoggedIn &&
            <span>
              <Link
            to="/tasks"
            className="btn btn-dark p-1 mx-1 my-auto btn-lg custom-button"
            role="button"
          >
           All Tasks
          </Link>
          <Link
            to="/categories"
            className="btn btn-dark p-1 mx-auto my-auto btn-lg custom-button"
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
          className="btn btn-lg p-1 mx-auto my-auto btn-primary float-end"
          role="button"
        >
          Log-in
          </Link>
          }
          {props.isLoggedIn &&
         <>
            <Link
            to="/logout"
            className="btn btn-lg btn-secondary p-1 mx-auto my-auto float-end"
            role="button"
          >
            Logout
            </Link>
              <Link
            to="/account"
            className="btn btn-lg btn-primary p-1 mx-1 my-auto float-end"
            role="button"
          >
            Account
            </Link>
         </>
          }

        </div>
    )
}
