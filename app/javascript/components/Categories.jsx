import React,{useState, useEffect} from 'react'
import Home from './Home'
export default function Categories() {
    const [categories,setCategories] = useState({});
    useEffect(() => {
        const abCont = new AbortController();
        const fetchCategories = async() =>{
            let c = await fetch('/api/v1/categories/index',{signal: abCont.signal});
            let c_json = await c.json();
            setCategories(c_json);
            console.log('fetching')
        }
        fetchCategories()
        return () => {
            abCont.abort();
        }
    }, [])
    return (
        <div className="d-flex flex-column container">
            <Home/>
            <h2 className="text-decoration-underline">Categories</h2>
            {console.log(categories)}
            {
                Object.keys(categories).map(c =>(
                    <div key={c}>{categories[c].name}</div>
                ))
            }
        </div>
    )
}