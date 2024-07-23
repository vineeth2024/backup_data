import React,{useState,useEffect} from 'react'
import axios from 'axios'
import SideNav from '../Pages/SideNav'
import TopNav from '../Pages/TopNav'
import Footer from '../Pages/Footer'
import { PencilSquare, XSquareFill } from 'react-bootstrap-icons'
import { useNavigate,Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { Slide, toast } from 'react-toastify';

const Customers = () => {
    const navigate=useNavigate();
    const [users,setUsers]=useState([]);
    const [search,setSearch]=useState("");
    const [filteredData,setFilteredData]=useState('');
    const token=sessionStorage.getItem('access');
    const getCustomer=()=>{
        axios.get('http://122.175.43.71:8001/api/customer/',  {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          },
        )
        .then((res)=>{
            console.log(res);
            setUsers(res.data);
            setFilteredData(res.data);
            
        }).catch((error)=>{
            if(error.response && error.response.status===401){
                toast.error('Session TimeOut', {  //Notification status
                    position: 'top-right',
                    autoClose: 1000, // Close the toast after 1 seconds
                  });
                navigate('/')
            }else{
                console.error('An error occurred:', error);
            }
        })
    }
    console.log(users);
  useEffect(()=>{ 
   getCustomer();

  },[]);
  const updateData=(id)=>{
    navigate('/CustomersRegistration',{state:{id}})
    
 }
  const  onDelete=async(id)=> {
    try {
       // Make a DELETE request to the API with the given ID
       await axios.delete('http://122.175.43.71:8001/api/customer/' +id+'/' , {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      },)
       .then((response)=>{        
        getCustomer();
        toast.error(response.data, {  //Notification status
            position: 'top-right',
            transition:Slide,
            hideProgressBar:true,
            theme:"colored",
            autoClose: 1000, // Close the toast after 1 seconds
          });
        console.log(response.data);
       }).catch((error)=>{
            if(error.response&& error.response.status===401){
                toast.error('Session TimeOut', {  //Notification status
                  position: 'top-right',
                  autoClose: 1000, // Close the toast after 1 seconds
                });
            navigate('/')
        }else{
            console.log(error)
        }
    })
        } catch (error) {
            console.log('error');
    
    }
 } 
// Masking the mobile Number
    const maskNumber=(mobile_number)=>{
        const maskedNumber= '*'.repeat(mobile_number.length-3)+mobile_number.slice(-3);
        return maskedNumber ;
    }
 const paginationComponentOptions={
    noRowsPerPage:true,
 }
 const columns=[
    {
       name:"Customer Id",
       selector:(row)=>row.id,
    },
    {
        name:"Customer Name",
        selector:(row)=>row.customer_id,
    },
    {
        name:"State",
        selector:(row)=>row.state,
    },
    {
        name:"Contact",
        selector:(row)=>maskNumber(row.mobile_number),
    },
    {
        name:"Mail-Id",
        selector:(row)=>row.mail_id,
    },
    {
        name:"Action",
        cell:(row)=><div> <button className="btn btn-sm mr-2" style={{backgroundColor:"transparent"}} onClick={()=>updateData(row.id)}><PencilSquare size={22} color='#2255a4'/></button>
        <button className="btn btn-sm " style={{backgroundColor:"transparent"}} onClick={()=>onDelete(row.id)}><XSquareFill size={22} color='#da542e'/></button>
        </div>

            }
        ]
        useEffect(()=>{
        const result=users.filter((data)=>{
            return( 
            (data.customer_id && data.customer_id.toLowerCase().match(search.toLowerCase()))||
            (data.id && data.id.toString() === search.trim())
            )
        });
        setFilteredData(result);
        },[search,users])
  return (
    <div id="main-wrapper" data-sidebartype="mini-sidebar">
       <TopNav/>
      <SideNav/>
      <div className="page-breadcrumb" style={{width:"78%",marginLeft:"280px"}}>
            <div className="row">
                <div className="col-12 d-flex no-block align-items-center">
                <h4 className="page-title" style = {{color:"blue"}}>Customers Details</h4>
                <div className="ml-auto text-right">
                    <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Library</li>
                        <li className="breadcrumb-item"><Link to={'/Usersviews'}>Customers</Link></li>
                    </ol>
                    </nav>
                </div>
                </div>
            </div>
        </div>
        <div className='container-fluid' style={{marginTop:"50px"}}>
            <div className='row'>
                <div className='col-md-9' style={{marginLeft:"300px"}}>
                    <div className="card">
                    <div className="card-body col-md-12">
                        <button type="button" className="btn btn-primary btn-lg" onClick={()=>navigate('/CustomersRegistration')} style={{marginBottom:"15px"}}>Add Customer</button>
                            <input
                                className="form-control col-md-3"
                                style={{border:"2px soild black",borderRadius:"8px",float:"right",marginBottom:"10px" }}
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e)=>setSearch(e.target.value)}
                            />
                        <div className="table-responsive">
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            pagination
                            paginationComponentOptions={paginationComponentOptions}
                        />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    <Footer/>
   </div>
  )
}

export default Customers