import React, { useState ,useEffect} from 'react'
import TopNav from './TopNav'
import SideNav from './SideNav'
import Footer from './Footer'
import { Boxes, Grid1x2Fill, PeopleFill, ReceiptCutoff } from 'react-bootstrap-icons'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Slide, toast } from 'react-toastify';

const Main = () => {
  const [count,setCount]=useState([]);
  const[load,setLoad]=useState()
  const token=sessionStorage.getItem("access");
  const navigate=useNavigate();
  
  useEffect(()=>{
    const getCount = async () => {
      try {
          const response = await axios.get(`http://122.175.43.71:8001/api/dashboard`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          },);
          console.log(response.data.data);
          setCount(response.data.data);
        
      }  catch (error) {
        // Log any errors that occur
        console.error(error.response);
        if (error.response && error.response.data && error.response.status===401) {
            toast.error("Session TimeOut", {  //Notification status
                position: 'top-right',
                transition: Slide,
                hideProgressBar: true,
                theme: "colored",
                autoClose: 1000, // Close the toast after 1 seconds
            });
            console.error('Server Error Message:', error.response.data);
            navigate('/')
        }
    }
    };
    getCount();
    console.log(count);
  }, []);
  return (
<div>
{load?(
        <div className="preloader">
            <div className="lds-ripple">
            <div className="lds-pos" />
            <div className="lds-pos" />
            </div>
        </div>
       ) :''}
  <div id="main-wrapper" data-sidebartype="mini-sidebar">
         <TopNav style={{marginTop:"0px"}} />  
        <SideNav/>
        <br/>
        <div id="page-wrapper" style={{marginLeft:"300px" }} >
          <div className="page-breadcrumb mt-4 mb-3 ">
            <div className="row">
              <div className="col-12 d-flex no-block align-items-center">
                <h4 className="page-title"style={{color:"#11375B"}}>Dashboard</h4>
                <div className="ml-auto text-right">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><Link to={'/main'}>Home</Link></li>
                      <li className="breadcrumb-item active" aria-current="page">Library</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid pt-2 ml-4">
            {/* ============================================================== */}
            {/* Start Page Content */}
            {/* ============================================================== */}
            <div className="row">
              {/* Column
              <div className="col-md-5 col-lg-3 ">
                <div className="card card-hover">
                  <div className="box bg-cyan text-center row">
                    <h5 className="text-white text-left mt-2">No:of Products</h5>
                    <PeopleFill className='text-white mt-2' style={{marginLeft:"70px"}} size={50}/>
                    <h5 className='text-white ml-5'style={{fontSize:"20px"}}>37+</h5>
                  </div>
                </div>
              </div> */}
              {/* Column */}
              <div className="col-md-9 col-lg-3 ml-5">
                <div className="card card-hover">
                  <div className="box bg-success text-center row">
                    <h5 className="text-white text-left mt-2">No:of Customers</h5>
                    <Boxes className='text-white mt-2' style={{marginLeft:"70px"}} size={50}/>
                    <h5 className='text-white ml-5' style={{fontSize:"20px"}}>{count.no_of_customers}</h5>
                  </div>
                </div>
              </div>
              {/* Column */}
              <div className="col-md-9 col-lg-3 ml-5">
                <div className="card card-hover">
                  <div className="box bg-warning text-center row">
                    <h5 className="text-white mt-2">Invoices Raised </h5>
                    <Grid1x2Fill size={48} className='text-white mt-2' style={{marginLeft:"70px"}}/>
                    <h5 className='text-white ml-5'style={{fontSize:"20px"}}>{count.invoices_raised}</h5>
                  </div>
                </div>
              </div>
              {/* Column */}
              <div className="col-md-9 col-lg-3 ml-5">
                <div className="card card-hover">
                  <div className="box bg-danger text-center row">
                    <h5 className="text-white mt-2">Invoices rasied in Last Month</h5>
                    <ReceiptCutoff size={48} className='text-white mt-2' style={{marginLeft:"70px"}}/>
                    <h5 className='text-white ml-5'style={{fontSize:"20px"}}>{count.invoices_raised_last_month}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
    </div>
    
</div>

  )
}

export default Main