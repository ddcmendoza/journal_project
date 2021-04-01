import Header from './Header'
import NavBar from './NavBar'
import React, {useState,useEffect} from 'react'
import {Link,useHistory} from "react-router-dom"
import axios from 'axios'
import Error from './Error'
export default function User(props) {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [pwtype, setPwtype] = useState('password');
    const [name,setName] = useState(null);
    const [pw, setPW] = useState(null);
    const [username, setUsername] = useState(null);
    const [errors, setErrors] = useState(null);
    useEffect(() => {
        setIsLoading(false);
        return () => {
            source.cancel('Cancelling axios request/s!')
        }
    }, [])
    function onSubmit(e){
        e.preventDefault();
        switch(props.type){
            case 'Registration':

                let user = {
                    username: username,
                    name: name,
                    password: pw
                }
                axios.post('/api/v1/users/create', { user }, { withCredentials: true, cancelToken: source.token })
                    .then(response => {
                        console.log(user,response);
                        if (response.data.status === 'created') {
                            console.log('Congratulations! You registered!')
                            history.push('/login');
                        } else {
                            console.log('There was an error!')
                            console.log(response)
                            setErrors(response.data.errors)
                        }
                    })
                    .catch(error => console.log('api errors:', error));      
                break;
            case 'Login':
                user = {
                    username: username,
                    password: pw
                }
                axios.post('/login', { user }, { withCredentials: true , cancelToken: source.token})
                    .then(response => {
                        if (response.data.logged_in) {
                            console.log('Success');
                            console.log(response);
                            history.push({
                                pathname:'/tasks',
                                state: {
                                    logged_in: response.data.logged_in,
                                    user: response.user
                                }
                            })
                        } else {
                            console.log('There was an error!')
                            console.log(response)
                            setErrors(response.data.errors)
                        }
                    })
                    .catch(error => console.log('api errors:', error))
                break;
/*             case 'Update':
                break; */
            default:
                console.log(name,pw,username)
        }
    }
    function onType(e){
        e.preventDefault();
        if (e.target.id === 'username'){
            setUsername(e.target.value);
        }
        else if(e.target.id === 'name'){
            setName(e.target.value);
        }
        else if(e.target.id === 'password'){
            setPW(e.target.value);
        }
    }
    function handleClick(e){
        e.preventDefault();
        let a = (pwtype==='text')? 'password':'text';
        setPwtype(a);
    }
    return (
        <div className="container">
            <Error errors={errors}/>
            <NavBar/>
            {isLoading && 
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            }
        {!isLoading &&
        <div className="container">
            
            <Header name={name} />
            <h1>{props.type}</h1>
{       props.type === 'Login' &&
        <div className ="text-primary">
            <Link to="/register" role='button'>
                Create an account
            </Link>
        </div>
}
{       props.type === 'Registration' &&
        <div className ="text-primary">
            <Link to="/login" role='button'>
                Already have an account?
            </Link>
        </div>
}
            <form>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="iLoveJournals" onChange={onType}/>
                    </div>
                {props.type === 'Registration' &&
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type='text' className="form-control" id="name" placeholder="Journal L. Over" onChange={onType}/>
                    </div>
                }
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="d-flex align-items-stretch justify-content-evenly">
                        <div className="col-9">
                            <input type={pwtype} className="form-control" id="password" onChange={onType} defaultValue="password" />
                            </div>
                        <a className='btn btn-primary mx-1 col-3' onClick={handleClick}>Show Password</a>
                    </div>
                    </div>
                    <input type='submit' className="btn btn-info" onClick={onSubmit}></input>
            </form>
        </div>
}

        </div>
    )
}
