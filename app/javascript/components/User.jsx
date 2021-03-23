import Header from './Header'
import React, {useState} from 'react'
export default function User() {
    const [pwtype, setPwtype] = useState('password')
    const [name,setName] = useState(null);
    const [pw, setPW] = useState(null);
    const [username, setUsername] = useState(null);
    function onSubmit(e){
        e.preventDefault();

        console.log(name,pw,username)
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
            <Header/>
            <h1>Registration</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="iLoveJournals" onChange={onType}/>
                    </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type='text' className="form-control" id="name" placeholder="Journal L. Over" onChange={onType}/>
                    </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="d-flex align-items-stretch justify-content-evenly">
                        <input type={pwtype} className="form-control col-9" id="password" onChange={onType} defaultValue="password" />
                        <button className='btn btn-primary mx-1 col-3' onClick={handleClick}>Show Password</button>
                    </div>
                    </div>
                    <input type='submit' onClick={onSubmit}></input>
            </form>
        </div>
    )
}
