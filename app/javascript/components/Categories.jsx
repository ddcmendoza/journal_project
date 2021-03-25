import React,{useState, useEffect} from 'react'
import Create from './Create'
import CategoryCard from './CategoryCard'
import { useLocation, useHistory } from "react-router-dom";
import axios from 'axios'
export default function Categories(props) {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const location = useLocation();
    const history = useHistory();
    const [categories,setCategories] = useState({});
    const [add, setAdd] = useState(false);
    const [category, setCategory] = useState(null);
    function addButtonClick(){
        setAdd(true);
    }
    function showClose(e){
        e.target.children[1].classList.remove('visually-hidden');
    }
    function hideClose(e){
        e.target.children[1].classList.add('visually-hidden');
    }
    function deleteCategory(e){
        e.preventDefault();
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
        if (e.target.type != 'delete'){
            setCategory(categories.filter(x=> x.id == e.target.id));
        }
    }
    useEffect(() => {
        if (location?.state){
            setAdd(location.state.add);
        }
        const abCont = new AbortController();
        const fetchCategories = async() =>{
            let c = await fetch(`/api/v1/categories/index/by-user-id/${props.user.id}`,{signal: abCont.signal}).catch(error => console.log('api errors:', error));
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
            <div className='container'>
                <h2 className=''>Categories</h2>
                <button type="button" className="btn btn-secondary mb-3 btn-sm" onClick={addButtonClick}> Add New Category</button>
                {//console.log(categories)
                }

              <div>
                    {
                        Object.keys(categories).map(c =>(
                            <a key={categories[c].id} id={categories[c].id} catid={c} className='align-items-center btn btn-outline-secondary mr-2 mb-2' role='button' onMouseEnter={showClose} onMouseLeave={hideClose} onClick={categoryView}>
                                <p className="p-0 m-0 d-inline" id={categories[c].id} catid={c}>{categories[c].name}</p>
                                <button type="button" className="btn-close btn-close-white ml-1 visually-hidden" aria-label="Close" role="button" id={categories[c].id} onClick={deleteCategory} type="delete" catid={c}>
                                </button>
                            </a>
                        ))
                    }
                    {add && <><Create type='Category'/></>}
                    <CategoryCard category={category}></CategoryCard>
              </div>
            </div>
        </div>
    )
}