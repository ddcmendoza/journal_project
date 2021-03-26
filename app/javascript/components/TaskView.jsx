import React from 'react'

export default function TaskView(props) {
    var parse = require('html-react-parser');
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
                    <div id={props.task.id} className="badge bg-warning text-dark mx-1">Due in {Math.floor((new Date(props.task.deadline).getTime() - new Date(Date.now()).getTime()) / (1000 * 60 * 60 * 24))} {(Math.floor((new Date(props.task.deadline).getTime() - new Date(Date.now()).getTime()) / (1000 * 60 * 60 * 24)) > 1) ? 'Days' : 'Day'}</div>
                }
                <p id={props.task.id} style={{whiteSpace: 'pre-line'}}>{props.task.details} </p>

                <input type="text" className="visually-hidden"></input>
                <textarea className="visually-hidden"></textarea>
            </a>
        </li>
    )
}
