import React, {useState,useEffect} from 'react'
import axios from 'axios';
import {  useHistory } from "react-router-dom";
export default function TaskCard(props) {
    const history = useHistory();
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const [name,setName] = useState(props.task?.[0]?.name);
    const [details,setDetails] = useState(props.task?.[0]?.details);
    const [deadline, setDeadline] = useState(props.task?.[0]?.deadline);
    const [categoryID, setCategoryID] = useState(props.task?.[0]?.category_id);
    
    useEffect(() => {
        console.log(props.task)
        setName(props.task?.[0]?.name);
        setDetails(props.task?.[0]?.details);
        setCategoryID(props.task?.[0]?.category_id);
        setDeadline(props.task?.[0]?.deadline);
        return () => {
            source.cancel('Cancelling axios request/s!')
        }
    }, [props])
    function onSubmit(e){
        e.preventDefault();
        const task = {
            name: name,
            details: details,
            deadline: deadline,
            category_id: categoryID
        }
        axios.patch(`/api/v1/tasks/update/${props?.task?.[0]?.id}`, { task }, { withCredentials: true, cancelToken: source.token })
                    .then(response => {
                        if (response.data.status === 'updated') {
                            console.log('Congratulations! task updated!')
                            history.push({
                                pathname:'/tasks',
                                state: {
                                    task: null
                                }
                            })
                            console.log(response)
                        } else {
                            console.log('There was an error!')
                            console.log(response)
                            console.log(response.data.errors)
                        }
                    })
                    .catch(error => console.log('api errors:', error));
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
    }
    return (
        <div className=" d-flex justify-content-center ">
            {//console.log(categoryID)
            }
            {props.task &&
            <form className="container shadow-sm col-8-md" id="viewForm">
                <span className="badge bg-info text-dark mx-1">Edit</span>Task
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder={props.type} onChange={onType} placeholder={name? name:""} defaultValue={name? name:""}/>
                    </div>
                <div className="mb-3">
                    <label htmlFor="Details" className="form-label">Details</label>
                    <textarea rows="3" style={{height: "100%", resize: "none"}} className="form-control" id="details" placeholder="Details" onChange={onType} placeholder={details? details:""} defaultValue={details? details:""}/>
                    </div>
                    <div>
                        <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select className="form-select"  value={categoryID} onChange={onType} id="cid">
                            {
                                props.categories?.map(cat =>(
                                    <option value={cat.id} key={cat.name}> {cat.name}</option>
                                )

                                )
                            }
                            
                        </select>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="deadline" className="form-label">Deadline</label>
                        <input className="form-control" type="datetime-local" id='deadline' onChange={onType} placeholder={deadline? new Date(deadline).toISOString().slice(0, -1):''} defaultValue={deadline? new Date(deadline).toISOString().slice(0, -1):''}></input>
                        </div>
                    </div>

                    <button type='submit' className="btn btn-info mb-2" onClick={onSubmit}>Edit</button>
            </form>
}
        </div>
    )
}
