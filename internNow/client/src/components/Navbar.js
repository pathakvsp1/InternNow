import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'
const NavBar = ()=>{
    const  searchModal = useRef(null)
    const [search,setSearch] = useState('')
    const [userDetails,setUserDetails] = useState([])
     const {state,dispatch} = useContext(UserContext)
     const history = useHistory()
     useEffect(()=>{
         M.Modal.init(searchModal.current)
     },[])
     const renderList = ()=>{
       if(state){
           return [
            <li key="1"><div className="tooltip"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i><span className="tooltiptext">Search User</span></div></li>,
            <li className="homebtn" key="2"><Link to="/"><div className="tooltip"><i className="fas fa-home"></i><span className="tooltiptext">Home</span></div></Link></li>,
            <li key="3"><Link to="/create"><div className="tooltip"><i className="large material-icons">add_circle_outline</i><span className="tooltiptext">Create Post</span></div></Link></li>,
            <li key="4"><Link to="/myfollowingpost"><div className="tooltip"><i className="far fa-compass"></i><span className="tooltiptext">Following</span></div></Link></li>,
            <li key="5"><Link to="/profile"><div className="tooltip"><i className="far fa-user-circle"></i><span className="tooltiptext">My Profile</span></div></Link></li>,
            <li  key="6"><Link to="/signin">
              <div className="tooltip">
            <i className="fas fa-sign-out-alt"
            onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }}></i>
            <span className="tooltiptext">Sign Out</span></div>
            </Link>
            </li>
         
            
           ]
       }else{
         return [
          <li  key="7"><Link to="/signin"><b>SignIn</b></Link></li>,
          <li  key="8"><Link to="/signup"><b>SignUp</b></Link></li>
         
         ]
       }
     }


     const fetchUsers = (query)=>{
        setSearch(query)
        fetch('/search-users',{ 
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            query
          })
        }).then(res=>res.json())
        .then(results=>{
          setUserDetails(results.user)
        })
     }
    return(
        <nav>
        <div className="nav-wrapper #64b5f6 blue lighten-2">
          <Link to={state?"/":"/signin"} className="brand-logo left">InternNow</Link>
          <ul id="nav-mobile" className="right">
             {renderList()}
  
          </ul>
        </div>
        <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item">{item.email}</li></Link> 
               })}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
      </nav>
    )
}


export default NavBar