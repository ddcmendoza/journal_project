import React,{useState, useEffect, useRef} from 'react'
import Create from './Create'
import CategoryCard from './CategoryCard'
import { useLocation, useHistory } from "react-router-dom";
import axios from 'axios'
import Alert from './Alert'
export default function Categories(props) {
    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView() 
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const location = useLocation();
    const history = useHistory();
    const [categories,setCategories] = useState({});
    const [add, setAdd] = useState(false);
    const [category, setCategory] = useState(null);
    const [alerts, setAlerts] = useState(location?.state?.alerts? location.state.alerts:null);

    function addButtonClick(){
        executeScroll();
        setAlerts(null);
        setAdd(true);
        setCategory(null);
    }
    function showClose(e){
        e.target?.children[1]?.classList?.remove('visually-hidden');
    }
    function hideClose(e){
        e.target.children[1].classList.add('visually-hidden');
    }
    function deleteCategory(e){
        e.preventDefault();
        setAlerts(null);
        const category_id = e.target.id;
        axios.delete(`/api/v1/categories/destroy/${category_id}`, { withCredentials: true, cancelToken: source.token })
                    .then(response => {
                        if (response.data.status === 'deleted') {
                            history.push({
                                pathname:'/categories',
                                state: {
                                    add: false
                                }
                            })
                            console.log(`${category_id} Category deleted`);
                        } else {
                            console.log('There was an error!')
                            console.log(response)
                            console.log(response.data.errors)
                        }
                    })
                    .catch(error => console.log('api errors:', error));

    }
    
    function categoryView(e){
        e.preventDefault();
        setAlerts(null);
        executeScroll();
        setAdd(false);
        if (e.target.type != 'delete'){
            setCategory(categories.filter(x=> x.id == e.target.id));
        }
    }
    useEffect(() => {
        setAlerts(location?.state?.alerts? location.state.alerts:null);
        if (location?.state){
            setAdd(location.state.add);
            setCategory(location.state.category);
        }
        const abCont = new AbortController();
        const fetchCategories = async() =>{
            let c = await fetch(`/api/v1/categories/index/by-user-id/${props.user.id}`,{signal: abCont.signal,withCredentials: true}).catch(error => console.log('api errors:', error));
            let c_json = await c?.json();
            setCategories(c_json? c_json:{});
            console.log('fetching')
        }
        fetchCategories()
        return () => {
            abCont.abort();
            source.cancel('Cancelling axios request/s!')
        }
    }, [props])
    return (
        <div className="d-flex flex-column container">
            <Alert alerts={alerts}/>
            <div className='container'>
                <h2 className='h2'>Categories</h2>
                <button type="button" className="btn btn-secondary mb-3 btn-sm" onClick={addButtonClick}> Add New Category</button>
                {//console.log(categories)
                }

              <div>
                    {
                        Object.keys(categories).map(c =>(
                            <a key={categories[c].id} id={categories[c].id} className='align-items-center btn btn-outline-secondary ms-2 mb-2' role='button' onMouseEnter={showClose} onMouseLeave={hideClose} onClick={categoryView}>
                                <p className="p-0 m-0 d-inline" id={categories[c].id}>{categories[c].name}</p>
                                <button type="button" className="btn-close btn-close-white ml-1 visually-hidden" aria-label="Close" role="button" id={categories[c].id} onClick={deleteCategory} type="delete">
                                </button>
                            </a>
                        ))
                    }
                    <div ref={myRef}>
                        {add && <div className="mt-2"><Create type='Category'/></div>}
                        {!add && !category && <p className="my-5 lead">Create or Edit a Category here!</p>}
                        <div className="mt-2"><CategoryCard category={category}></CategoryCard></div>
                    </div>
              </div>
            </div>
        </div>
    )
}