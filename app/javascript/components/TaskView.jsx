import React from 'react'

export default function TaskView(props) {

    return (
        <li key={props.task.id} id={props.task.id} onClick={props.taskView}>
            <a onMouseEnter={props.showClose} onMouseLeave={props.hideClose} key={props.task.id} id={props.task.id}>
                <button type="button" className="d-inline btn-close ml-1 visually-hidden" aria-label="Close" role="button" id={props.task.id} onClick={props.deleteTask} type="delete">
                </button>
                <h4 className='d-inline' id={props.task.id}>{props.task.name}</h4>
                <br></br>
                {
                    props.categories?.map(c => (
                        (c.id == props.task.category_id &&
                            <div className="badge bg-secondary" key={c.name}>
                                {c.name}
                            </div>
                        )

                    ))
                }
                {props.task.deadline &&
                    <div id={props.task.id} className=
                    {(getDaysAgo(props.task.deadline) > 0)? "badge bg-warning text-dark mx-1":"badge bg-danger text-light mx-1"}
                    >
                        Due{(getDaysAgo(props.task.deadline) > 0)?" in ":" "} 
                        {(getDaysAgo(props.task.deadline) == 0)? "":(getDaysAgo(props.task.deadline) > 0)? getDaysAgo(props.task.deadline):(-getDaysAgo(props.task.deadline))}  
                        {(Math.abs(getDaysAgo(props.task.deadline)) > 1) ? ' Days' :(Math.abs(getDaysAgo(props.task.deadline)) == 0)? ' Today': ' Day'}
                        {(getDaysAgo(props.task.deadline) < 0)?" ago":""}
                        </div>
                }
                <p id={props.task.id} style={{whiteSpace: 'pre-line'}}>{props.task.details?.slice(0,50).concat(  (props.task.details?.length > 50)? "...":"")} </p>

                <input type="text" className="visually-hidden"></input>
                <textarea className="visually-hidden"></textarea>
            </a>
        </li>
    )
}
function getDaysAgo(date){
   return Math.floor((new Date(date).getTime() - new Date(Date.now()).getTime()) / (1000 * 60 * 60 * 24));
}