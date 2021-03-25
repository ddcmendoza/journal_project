import React,{useState, useEffect} from 'react'
import {useHistory} from "react-router-dom"
import axios from 'axios'
export default function Create(props) {
    const history = useHistory();
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const [name, setName] = useState(null);
    const [details, setDetails] = useState(null);
    const [deadline, setDeadline] = useState(null);
    useEffect(() => {
        return () => {
            source.cancel('Cancelling axios request/s!')
        }
    }, [props])
    function onSubmit(e){
        e.preventDefault();
        switch(props.type){
            case "Task":
                break;
            case "Category":
                let category = {
                    name: name,
                    details: details
                }
                axios.post('/api/v1/categories/create', { category }, { withCredentials: true, cancelToken: source.token })
                    .then(response => {
                        if (response.data.status === 'created') {
                            history.push({
                                pathname:'/categories',
                                state: {
                                    add: false
                                }
                            })
                            console.log(`${name} Category created`);
                        } else {
                            console.log('There was an error!')
                            console.log(response)
                            console.log(response.data.errors)
                        }
                    })
                    .catch(error => console.log('api errors:', error));
                break;
            default:

        }
    }
    function onType(e){
        e.preventDefault();
        if(e.target.id === 'name'){
            setName(e.target.value);
        }
        else if(e.target.id === 'details'){
            setDetails(e.target.value);
        }
        else if(e.target.id === 'deadline'){
            setDeadline(e.target.value)
        }
    }
    return (
        <div>
            <form>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder={props.type} onChange={onType}/>
                    </div>
                <div className="mb-3">
                    <label htmlFor="Details" className="form-label">Details</label>
                    <textarea rows="10" style={{height: "100%", resize: "none"}} className="form-control" id="details" placeholder="Details" onChange={onType}/>
                    </div>
                {props.type === "Task" &&
                    <div className="mb-3">
                    <label htmlFor="deadline" className="form-label">Deadline</label>
                    <input className="form-control" type="datetime-local" id='deadline'></input>
                </div>
}
                    <input type='submit' className="btn btn-info mb-2" onClick={onSubmit}></input>
            </form>
        </div>
    )
}
