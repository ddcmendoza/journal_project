import React from 'react'
import NavBar from './NavBar'
import Header from './Header'

export default function Home() {
    return (
        <div>

    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
       <Header/>
        <NavBar/>
      </div>
    </div>
  </div>

    )
}
