import React, {useState,useEffect,useRef} from 'react'
import axios from 'axios';
import {  useHistory } from "react-router-dom";
import TaskByCategory from "./TaskByCategory"
import Create from './Create'
export default function CategoryCard(props) {
    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView() 
    const history = useHistory();
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const [name,setName] = useState(props.category?.[0]?.name);
    const [details,setDetails] = useState(props.category?.[0]?.details);
    const [add, setAdd] = useState(false);

    function addButtonClick(e){
        
        e.preventDefault();
        executeScroll();
        setAdd(true);
    }
    useEffect(() => {
        setAdd(false);
        setName(props.category?.[0]?.name);
        setDetails(props.category?.[0]?.details);
        return () => {
            source.cancel('Cancelling axios request/s!')
        }
    }, [props])
    function onSubmit(e){
        e.preventDefault();
        const category = {
            name: name,
            details: details
        }
        axios.patch(`/api/v1/categories/update/${props?.category?.[0]?.id}`, { category }, { withCredentials: true, cancelToken: source.token })
                    .then(response => {
                        if (response.data.status === 'updated') {
                            console.log('Congratulations! Category updated!')
                            history.push({
                                pathname:'/categories',
                                state: {
                                    category: null
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
    }
    return (
        <div>
            {//console.log(props.category?.[0],name,details)
            }
            {props.category &&
            <form className='container-md col-8-md shadow-sm'>
                <span className="badge bg-info text-dark mx-1">Edit</span>Category
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder={name} defaultValue={name} onChange={onType} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Details" className="form-label">Details</label>
                    <textarea rows="2" style={{ height: "100%", resize: "none" }} className="form-control" id="details" placeholder={details? details:""} defaultValue={details? details:""} onChange={onType} />
                </div>
                <button type='submit' className="btn btn-info mb-2" onClick={onSubmit}>Edit</button>
            </form>
}
            <div className="mt-3">
                    {props.category && 
                    <h4 className="mb-1">Tasks <button type="button" className="btn btn-secondary btn-sm" onClick={addButtonClick} href="#add"> Add New Task</button></h4>}
                <TaskByCategory categoryID={props.category?.[0]?.id}/>
                <div ref={myRef} className="mb-5">
                {!add && <div className="mb-5"><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div>}
                {add && <><Create type='Task' categories={props.category}/></>}
                </div>
                
                </div>
        </div>
    )
}
