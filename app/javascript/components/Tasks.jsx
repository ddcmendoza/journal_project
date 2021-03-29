import React, {useEffect, useState,useRef} from 'react'
import Create from './Create'
import { useLocation, useHistory } from "react-router-dom";
import axios from 'axios'
import TaskCard from './TaskCard'
import TaskView from './TaskView'

export default function Tasks(props) {
    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView() 
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const location = useLocation();
    const history = useHistory();
    const [tasks,setTasks] = useState({});
    const [add, setAdd] = useState(false);
    const [categories, setCategories] = useState([]);
    const [task, setTask] = useState(null);
    function addButtonClick(){

        executeScroll();
        setAdd(true);
        setTask(null);
    }    
    function deleteTask(e){
        e.preventDefault();
        const task_id = e.target.id;
        axios.delete(`/api/v1/tasks/destroy/${task_id}`, { withCredentials: true, cancelToken: source.token })
                    .then(response => {
                        if (response.data.status === 'deleted') {
                            history.push({
                                pathname:'/tasks',
                                state: {
                                    add: false
                                }
                            })
                            console.log(`${task_id} Task deleted`);
                        } else {
                            console.log('There was an error!')
                            console.log(response)
                            console.log(response.data.errors)
                        }
                    })
                    .catch(error => console.log('api errors:', error));
    }
    function showClose(e){
        e.target.children[0].classList.remove('visually-hidden');
    }
    function hideClose(e){
        e.target.children[0].classList.add('visually-hidden');
    }
    function taskView(e){
        e.preventDefault();
        executeScroll();
        setAdd(false);
        if (e.target.type != 'delete'){
            setTask(tasks.filter(x=> x.id == e.target.id));
        }
    }
    useEffect(() => {
        
        if (location?.state){
            setAdd(location.state.add);
            setTask(location.state.task);
        }

        const abCont = new AbortController();
        const fetchCategories = async() =>{
            let c = await fetch(`/api/v1/categories/index/`,{signal: abCont.signal}).catch(error => console.log('api errors:', error));
            let c_json = await c?.json();
            setCategories(c_json? c_json:[]);
            console.log('fetching')
        }
        fetchCategories();
        const fetchTasks = async() =>{
            let t = await fetch(`/api/v1/tasks/index/by-user-id/${props.user.id}`,{
                signal: abCont.signal,
                });
            let t_json = await t.json();
            setTasks(t_json);
            console.log('fetching')
        }
        fetchTasks()
        return () => {
            abCont.abort();
        }
    }, [props])
    return (
        <div className="d-flex flex-column container">
            <div className='container'>
                <h2 className="h2">Tasks</h2>
                <button type="button" className="btn btn-secondary mb-3 btn-sm" onClick={addButtonClick} href="#add"> Add New Task</button>
                
                {//console.log(Object.keys(tasks),tasks)
                }
                {!add && !task && <p className="my-5 lead">Create a Task or Edit a Task here!</p>}
                <ul>
                    
                            
                {
                    Object.keys(tasks).map(t =>(
                        <TaskView key={tasks[t].id} task ={tasks[t]} categories={categories} hideClose={hideClose} showClose={showClose} deleteTask={deleteTask} taskView={taskView}/>
                            
                    ))
                }
                       
                </ul>
                <div ref={myRef}>
                    {add && <><Create type='Task' categories={categories}/></>}
                    
                    <TaskCard task={task} categories={categories}></TaskCard>
                </div>
            </div>
        </div>
    )
}
