import React, {useEffect, useState} from 'react'
import Home from './Home'

export default function Tasks() {
    const [tasks,setTasks] = useState({});
    useEffect(() => {
        const abCont = new AbortController();
        const fetchTasks = async() =>{
            let t = await fetch('/api/v1/tasks/index',{
                signal: abCont.signal,
                headers:{
                    Authenticate: 'True'
                }});
            let t_json = await t.json();
            console.log(t_json)
            setTasks(t_json);
            console.log('fetching')
        }
        fetchTasks()
        return () => {
            abCont.abort();
        }
    }, [])
    return (
        <div className="d-flex flex-column container">
            <div className='container'>
                <h2 className="text-decoration-underline">Tasks</h2>
                {//console.log(tasks)
                }
                {
                    Object.keys(tasks).map(t =>(
                        <div key={t}>{tasks[t].name}</div>
                    ))
                }
            </div>
        </div>
    )
}
