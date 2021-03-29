import React from 'react'

export default function Alert(props) {
    return (
            <>{props.alerts && 
                
            <>
                {props.alerts?.map(a =>(
                         <div  className="position-fixed top-0 start-50 translate-middle alert alert-success mt-5" key={a} role="alert">
                         {a}
                        </div>
                    ))}
               
            </>
            }
            {console.log(props)}
            </>
    )
}
