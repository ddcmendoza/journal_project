import React,{useState, useEffect} from 'react'
import {useHistory} from "react-router-dom"
import axios from 'axios'
import Error from './Error'
import Alert from './Alert'
export default function Create(props) {
    const history = useHistory();
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const [name, setName] = useState(null);
    const [details, setDetails] = useState(null);
    const [deadline, setDeadline] = useState(null);
    const [categoryID, setCategoryID] = useState(props.categories?.length > 1? null:props.categories?.[0].id);
    const [errors, setErrors] = useState(null);
    const [alerts, setAlerts] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    useEffect(() => {
        return () => {
            source.cancel('Cancelling axios request/s!')
        }
    }, [props,errors])
    function onSubmit(e){
        setSubmitting(true);
        e.preventDefault();
        switch(props.type){
            case "Task":
                let task = {
                    name: name,
                    details: details,
                    deadline: deadline,
                    category_id: categoryID
                }
                
                axios.post('/api/v1/tasks/create', { task }, { withCredentials: true, cancelToken: source.token })
                    .then(response => {
                        setSubmitting(false);
                        if (response.data.status === 'created') {
                            if (props.categories.length > 1) {
                                history.push({
                                    pathname: '/tasks',
                                    state: {
                                        add: false,
                                        alerts: [`${name.slice(0,20)} Task created`]
                                    }
                                })
                            }
                            else{
                                window.location.reload()
                            }
                            setAlerts(`${name} Task created`);
                            setName(null);
                            setDetails(null);
                            setDeadline(null);
                            setCategoryID(null);
                        } else {
                            console.log('There was an error!')
                            console.log(response)
                            setErrors(response.data.errors)
                        }
                    })
                    .catch(error => {
                        console.log('api errors:', error);
                        setSubmitting(false);
                    });
                break;
            case "Category":
                let category = {
                    name: name,
                    details: details
                }
                axios.post('/api/v1/categories/create', { category }, { withCredentials: true, cancelToken: source.token })
                    .then(response => {
                        setSubmitting(false);
                        if (response.data.status === 'created') {
                            setName(null);
                            setDetails(null);
                            history.push({
                                pathname:'/categories',
                                state: {
                                    add: false,
                                    alerts: [`${name.slice(0,20)} Category created`]
                                }
                            })
                        } else {
                            console.log('There was an error!')
                            console.log(response)
                            setErrors(response.data.errors)
                        }
                    })
                    .catch(error => {
                        console.log('api errors:', error);
                        setSubmitting(false);
                    });
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
        else if(e.target.id === 'cid'){
            setCategoryID(e.target.value)
        }
        setErrors(null);
        setAlerts(null);
    }
    return (
        <div className="d-flex justify-content-center  ">
            <Error errors={errors}/>
            <Alert alerts={alerts}/>

            <form className="container shadow-sm col-8-md">
            <span className="badge bg-success mx-1">New</span>{props.type}
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder={props.type} onChange={onType} required/>
                    </div>
                <div className="mb-3">
                    <label htmlFor="Details" className="form-label">Details</label>
                    <textarea rows="3" style={{height: "100%", resize: "none"}} className="form-control" id="details" placeholder="Details" onChange={onType}/>
                    </div>
                {props.type === "Task" &&
                    <div>
                        <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select className="form-select" defaultValue={props.categories.length > 1?"default":props.categories[0].name} onChange={onType} id="cid" required>
                            <option disabled value="default">Select Category</option>
                            {
                                props.categories?.map(cat =>(
                                    <option value={cat.id} key={cat.id}>{cat.name}</option>
                                )

                                )
                            }
                            
                        </select>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="deadline" className="form-label">Deadline</label>
                        <input className="form-control" type="datetime-local" min={Date.now()} id='deadline' onChange={onType}></input>
                        </div>
                    </div>
}
{
    !submitting && <input type='submit' className="btn btn-success mb-2" onClick={onSubmit}></input>
}
{
    submitting && <input type='submit' className="btn btn-success mb-2" onClick={onSubmit} disabled></input>
}
                    
            </form>
        </div>
    )
}
