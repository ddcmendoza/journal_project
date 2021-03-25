import React, {useEffect, useState} from 'react'
import Create from './Create'

export default function Tasks(props) {
    const [tasks,setTasks] = useState({});
    const [add, setAdd] = useState(false);
    function addButtonClick(){
        console.log('fired')
        setAdd(true);
    }    
    useEffect(() => {
        const abCont = new AbortController();
        const fetchTasks = async() =>{
            let t = await fetch(`/api/v1/tasks/index/by-user-id/${props.user.id}`,{
                signal: abCont.signal,
                headers:{
                    Authenticate: 'True'
                }});
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
                <h2 className="">Tasks</h2>
                <button type="button" className="btn btn-secondary mb-3 btn-sm" onClick={addButtonClick} href="#add"> Add New Task</button>
                
                {//console.log(tasks)
                }
                <ul>
                    
                            
                {
                    Object.keys(tasks).map(t =>(
                            <li key={t}>
                                <a>
                                    <h4>{tasks[t].name}</h4>
                                    <p>{tasks[t].details} Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt nemo nulla accusamus maxime consequuntur fuga, illo ipsam aut quisquam natus pariatur dignissimos sapiente delectus sequi. Nemo aperiam corrupti sint nulla!</p>
                                </a>
                            </li>
                    ))
                }
                       {add && <div id="add"><Create type='Task'/></div>}
                </ul>
            </div>
        </div>
    )
}
