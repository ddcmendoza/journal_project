import React from 'react'

export default function Error(props) {
    return (
            <>{props.errors && 
                
            <>
                {props.errors?.map(e =>(
                         <div  className="position-fixed top-0 start-50 translate-middle alert alert-danger mt-5" key={e} role="alert">
                         {e}
                        </div>
                    ))}
               
            </>
            }
            {//console.log(props)
            }
            </>
    )
}
