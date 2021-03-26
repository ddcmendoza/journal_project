import React, {useEffect,useState} from 'react';
import TaskView from './TaskView'
export default function TaskByCategory(props) {
    const [tasks, setTasks] = useState({})

    function hideClose(){};
    function showClose(){};
    function taskView(){};
    function deleteTask(){};

    useEffect(() => {
        const abCont = new AbortController();
        const fetchTasks = async() =>{
            let t = await fetch(`/api/v1/tasks/index/by-category-id/${props.categoryID}`,{signal: abCont.signal});
            let t_json = await t.json();
            setTasks(t_json);
            console.log('fetching')
        }
        fetchTasks();
        return () => {
            abCont.abort();
        }
    }, [props])
    return (
        <ul>
            {console.log(tasks, props.categoryID)
            }
            {
                    Object.keys(tasks).map(t =>(
                        <TaskView key={tasks[t].id} task ={tasks[t]} categories={[]} hideClose={hideClose} showClose={showClose} deleteTask={deleteTask} taskView={taskView}/>
                            
                    ))
                }
        </ul>
    )
}
