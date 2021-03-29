import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Error from './Error'

export default function Account(props) {
    console.log('important',props)
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const [pwtype,setPwtype] = useState('password');
    const [name,setName] = useState(props?.user?.name);
    const [pw, setPW] = useState(props?.user?.password);
    const [errors, setErrors] = useState(null);

    function handleClick(e){
        e.preventDefault();
        let a = (pwtype==='text')? 'password':'text';
        setPwtype(a);
    }
    function onSubmit(e){
        e.preventDefault();
        let user = (e.target.id === 'name_edit')? {name: name}:{password:pw}
        if(e.target.id === 'password_edit' && pw.length < 6){
            setErrors(['Password must be at least 6 characters long'])
            // throw alert
            return
        }
        axios.patch(`/api/v1/users/update/${props?.user?.id}`, { user }, { withCredentials: true, cancelToken: source.token })
                    .then(response => {
                        if (response.data.status === 'updated') {
                            console.log('Congratulations! Account updated!')
                        } else {
                            console.log('There was an error!')
                            console.log(response)
                            setErrors(response.data.errors)
                        }
                    })
                    .catch(error => console.log('api errors:', error));
    }
    function onType(e){
        e.preventDefault();
        if(e.target.id === 'name'){
            setName(e.target.value);
        }
        else if(e.target.id === 'password'){
            setPW(e.target.value);
        }
    }
    useEffect(() => {
        return () => {
            source.cancel("Cancelling request!");
        }
    }, [props])
    return (
        <div>
            <Error errors={errors}/>
            {props.isLoggedIn &&
            <form>
                <div className="mb-3">
                    <fieldset disabled>
                        <label htmlFor="disabledTextInput" className="form-label">Username</label>
                        <input type="text" className="form-control" id="disabledTextInput" placeholder={props.user.username} onChange={onType}/>
                    </fieldset>
                    </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <div className="d-flex align-items-stretch justify-content-evenly"> 
                       <input type='text' className="form-control col-10" id="name" placeholder={props.user.name} defaultValue={props.user.name} onChange={onType}/>
                       <button className='btn btn-info mx-1 col-2' type='submit' onClick={onSubmit} id="name_edit">Edit Name</button>
                       </div>
                    </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="d-flex align-items-stretch justify-content-evenly">
                        <input type={pwtype} className="form-control col-8" id="password" onChange={onType} placeholder={props.user.password} />
                        <a className='btn btn-primary ml-1 col-2' onClick={handleClick}>Show Password</a>
                        <button className='btn btn-info mx-1 col-2' type='submit' onClick={onSubmit} id="password_edit">Edit Password</button>
                    </div>
                    </div>
            </form>
        }
          </div>
    )
}
