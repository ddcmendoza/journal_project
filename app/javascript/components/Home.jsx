import React,{useState, useEffect} from 'react'
import NavBar from './NavBar'
import Header from './Header'
import Tasks from './Tasks'
import {useLocation, useHistory} from 'react-router-dom';
import axios from 'axios'
import Categories from './Categories';
import Account from './Account';

export default function Home(props) {
  
  const history = useHistory();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [view, setView] = useState(null);
  useEffect(() => {
    console.log(props)
    if(props?.logout){
      console.log('logging out')
      setIsLoggedIn(false);
      setView(null);
      setUser({});
      /* history.push({
        pathname: '/',
        state: {
          logged_in: false,
          user: {}
        }
      }) */
     axios.post('/logout',
      { withCredentials: true })
      .then(response => {
        //console.log(response)
        if(response.data.logged_out){
          history.push({
            pathname:'/',
            state: {
                logged_in: false,
                user: {}
            }
        })
      }
      })
      .catch(error => console.log('api errors:', error)) 
    }
    else{
    axios.get('/logged_in',
      { withCredentials: true })
      .then(response => {
        //console.log(response)
        if (response.data.logged_in) {
          setIsLoggedIn(response.data.logged_in)
          setUser(response.data.user)
        } else {
          setIsLoggedIn(false);
          setUser({});
        }
      })
      .catch(error => console.log('api errors:', error))

  }
    if(props?.view){
      setView(props.view)
    }
    return () => {
    }
  }, [props])
    return (
        <div className="container">
          {//console.log("IMPORTANT",props,"NEXT IMPORTANT",user)
          }
        <NavBar isLoggedIn={isLoggedIn}/>

    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
       <Header name={user.name} username={user.username}/>
       { view === 'Tasks' &&
       <div>
         <Tasks isLoggedIn={isLoggedIn} user={user}/>
       </div>
       }
       {
         view === 'Categories' &&
         <div>
           <Categories isLoggedIn={isLoggedIn} user={user}/>
         </div>
       }
       {
         view === 'Account' &&
         <div>
           <Account isLoggedIn={isLoggedIn} user={user}/>
         </div>
       }
      </div>
    </div>
  </div>

    )
}
