import React, {useState,useEffect} from 'react'
import axios from 'axios';
export default function CategoryCard(props) {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const [name,setName] = useState(props.category?.[0]?.name);
    const [details,setDetails] = useState(props.category?.[0]?.details);
    useEffect(() => {
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
            {//console.log(props.category?.[0].name,name,details)
            }
            {props.category &&
            <form className='container-md col-8'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder={props.category?.[0]?.name} defaultValue={props.category?.[0]?.name} onChange={onType} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Details" className="form-label">Details</label>
                    <textarea rows="5" style={{ height: "100%", resize: "none" }} className="form-control" id="details" placeholder={props.category?.[0]?.details} defaultValue={props.category?.[0]?.details} onChange={onType} />
                </div>
                <button type='submit' className="btn btn-info mb-2" onClick={onSubmit}>Edit</button>
            </form>
}
        </div>
    )
}
