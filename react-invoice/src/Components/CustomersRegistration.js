import React,{useState,useEffect} from 'react'
import { useForm } from 'react-hook-form' 
import axios from 'axios'
import TopNav from '../Pages/TopNav'
import SideNav from '../Pages/SideNav'
import { Link ,useNavigate,useLocation } from 'react-router-dom'
import Footer from '../Pages/Footer'
import { toast } from 'react-toastify';

const CustomersRegistration = () => {
    const [show,setShow]=useState("gst");
    const [update,setUpdate]=useState([])
    const navigate=useNavigate(); 
    const location=useLocation();
    const token=sessionStorage.getItem('access');
    const {register,handleSubmit,reset,formState:{errors}}= useForm();
   const onSubmit=(data)=>{
    
   // const requestData = data.gstType === 'nongst' ? omit(data, 'gst_number') : data;
    if(location&&location.state&&location.state.id){
       axios.put(`http://122.175.43.71:8001/api/customer/${location.state.id}/`,data , { headers: {
        'Authorization': `Bearer ${token}`,
      }},)
       .then((response)=>{
        toast.success(response.data.data, {  //Notification status
          position: 'top-right',
          autoClose: 1000, // Close the toast after 1 seconds
        });
        console.log(response.data.data);
        setUpdate(response.data.data);
       }).catch((error)=>{
        if(error.response && error.response.status===401){
            navigate('/')
        }else{
            console.log(error)
        }
    })
    }else {
      // Check the customer type before including the GST-related fields
      if (data.gstType === 'nongst') {
        const { gst_number, ...restData } = data; // Exclude GST-related fields
        delete data.gstType
        axios.post('http://122.175.43.71:8001/api/customer/', restData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
          .then((response) => {
            toast.success('Data Saved Successfully', {
              position: 'top-right',
              autoClose: 1000,
            });
            console.log(response.data);
            console.log(data);
            navigate('/Customers');
          })
            .catch((error)=>{
              if(error.response && error.response.status===401){
                toast.error('Session TimeOut', {
                  position: 'top-right',
                  autoClose: 1000,
                });
                  navigate('/')
              }else{
                toast.error('Invalid Credentials', {
                  position: 'top-right',
                  autoClose: 1000,
                });
                console.error('Error saving data:', error);
              }
          })
      } else if (data.gstType === 'gst') {
        delete data.gstType
        axios.post('http://122.175.43.71:8001/api/customer/', data, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
          .then((response) => {
            toast.success(response.data, {
              position: 'top-right',
              autoClose: 1000,
            });
            console.log(response.data);
            console.log(data);
            navigate('/Customers');
          })
          .catch((error)=>{
            if(error.response && error.response.status===401){
              toast.error('Session TimeOut', {
                position: 'top-right',
                autoClose: 1000,
              });
                navigate('/')
            }else{
              toast.error('Invalid Credentials', {
                position: 'top-right',
                autoClose: 1000,
              });
              console.error('Error saving data:', error);
            }
        })
      }
    }
  }
    useEffect(()=>{
      if (location&&location.state && location.state.id) {
        axios.get(`http://122.175.43.71:8001/api/customer/${location.state.id}/`,  {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        },)
          .then((response) => {
            console.log(response.data);
            reset(response.data)
          
          })
          .catch((error)=>{
            if(error.response && error.response.status===401){
              toast.error('Session TimeOut', {
                position: 'top-right',
                autoClose: 1000,
              });
                navigate('/')
            }else{
              toast.error('Invalid Credentials', {
                position: 'top-right',
                autoClose: 1000,
              });
              console.error('Error saving data:', error);
            }
        })
      }
    },[])

    const  setGstType=async(event)=> {
      setShow(event.target.value);
      console.log(event.target.value);
    }
    
  return (
    <div id="main-wrapper" data-sidebartype="mini-sidebar">
    <TopNav/>
    <SideNav/>
    <div className="page-breadcrumb" style={{width:"78%",marginLeft:"280px"}}>
            <div className="row">
                <div className="col-12 d-flex no-block align-items-center">
                <h4 className="page-title" style = {{color:"blue"}}>Customers Registration</h4>
                <div className="ml-auto text-right">
                    <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                        <li className="breadcrumb-item"><Link to={'/Customers'}>Customers Details</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Customers Registration</li>
                    </ol>
                    </nav>
                </div>
                </div>
            </div>
    </div>
   <div className='container-fliuid'>
   <div className='row'>
       <div className='col-md-9 ' style={{marginLeft:"300px",marginTop:"50px"}}>
           <div className="card">
               <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                   <div className="card-body">
                       <div className="form-group row">
                           <label htmlFor='gstTypeGST' className="col-sm-3 text-right control-label col-form-label">Customer Type</label>
                           <div className=' form-group row' onChange={setGstType}>
                                <input type = "radio" name ="gstType" id ="gstType" value={"gst"} style={{marginLeft:"150px"}} checked={show==="gst"}
                                 {...register("gstType", {
                                    required: "Please select your Type"
                                  })}
                                />
                                <label htmlFor='gstTypeNonGST'  className="text-right col-form-label ml-2">GST</label><br/>
                                <input type = "radio"  name ="gstType" id ="gstType" value={"nongst"} checked={show==="nongst"} style={{marginLeft:"300px"}}                               
                                 {...register("gstType")}
                                />
                                <label htmlFor='gstType' className="text-right col-form-label ml-2" required>Non GST</label>
                           </div>
                       </div>


                       <div className="form-group row ">
                       <label htmlFor="customer" className="col-sm-3 text-right control-label col-form-label">Customer Name</label>
                       <div className="col-sm-9">
                           <input type="text" className="form-control" id="customer_id" name='customer_id' placeholder="Enter Customer Name "
                          {...register("customer_id", {
                            required: true,
                          })}
                          />
                       </div>
                       {errors.customer && <p className='errorsMsg '>Customer Name is Required .</p>}
                       </div>
                       <div className="form-group row">
                       <label htmlFor="email" className="col-sm-3 text-right control-label col-form-label">Email</label>
                       <div className="col-sm-9">
                           <input type="email" className="form-control" id="mail_id" name="mail_id" placeholder="Enter mail-id" 
                           {...register("mail_id",{
                            required:"Email is Required",
                            pattern:{
                              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                              message: "Invalid Email"
                            }
                          })}
                        />                        
                       </div>
                       {errors.mail_id && <p className="errorsMsg">{errors.mail_id.message}</p>}
                       </div>
                       <div className="form-group row">
                       <label htmlFor="mobilenumber" className="col-sm-3 text-right control-label col-form-label">Mobile Number</label>
                       <div className="col-sm-9">
                           <input type="text" className="form-control" id="mobile_number" name="mobile_number" placeholder="Mobile Number"
                             {...register("mobile_number",{
                                required:"Enter Mobile Number",
                                minLength:{
                                    value:10,
                                    message:'Enter valid Mobile Number',  
                                }
                               })}
                              />
                       </div>
                       {errors.mobile_number && (<p className='errorsMsg'>{errors.mobile_number.message}</p>)}
                       </div>
                       
                       <div className="form-group row">
                       <label htmlFor="address" className="col-sm-3 text-right control-label col-form-label">Address</label>
                       <div className="col-sm-9">
                           <textarea className="form-control" id='address' name='address' 
                          {...register("address", {         
                            required: true,       
                          })}          
                          />         
                       </div>                                                                           
                       {errors.address && <p className='errorsMsg '>Enter Address Required</p>}          
                       </div>                             
                       <div className="form-group row">                                                                 
                       <label htmlFor="state" className="col-sm-3 text-right control-label col-form-label">State</label>       
                       <div className="col-sm-9">                                                                        
                           <input type="text" className="form-control" id="state" name="state" placeholder="Enter State"
                         {...register("state", {                    
                            required: "State Name is Required.",   
                            minLength: {
                              value: 3,
                              message: "Please enter valid State."
                            }
                          })}
                        />
                       </div>
                       {errors.state && (
                          <p className="errorsMsg">{errors.state.message}</p>
                        )}
                       </div>
                       <div className="form-group row">
                       <label htmlFor="city" className="col-sm-3 text-right control-label col-form-label">City</label>
                       <div className="col-sm-9">
                           <input type="text" className="form-control" name="city" id="city" placeholder="Enter City" 
                           {...register("city", {
                            required: "City name required.",
                            minLength: {
                              value: 3,
                              message: "Please enter valid City."
                            }
                          })}
                        />
                       </div>
                       {errors.city && (
                          <p className="errorsMsg">{errors.city.message}</p>
                        )}
                       </div>
                       <div className="form-group row">
                       <label htmlFor="pincode" className="col-sm-3 text-right control-label col-form-label">Pin Code</label>
                       <div className="col-sm-9">
                           <input type="text" className="form-control" id="pin_code" name="pin_code" placeholder="Enter Pin" 
                          {...register("pin_code", {
                            required: "Enter PinCode.",
                            maxLength: {
                              value: 6,
                              message: "Please enter valid PinCode."
                            }
                          })}
                        />
                       </div>
                       {errors.pin_code && (
                          <p className="errorsMsg">{errors.pin_code.message}</p>
                        )}
                       </div>
                    {show==="gst" &&(
                        <div className="form-group row">
                        <label htmlFor="gst" className="col-sm-3 text-right control-label col-form-label">Gst No</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="gst_number" name="gst_number" placeholder="Enter Gst Number" 
                          {...register("gst_number",{
                            required:"Enter GST Number",
                            minLength:{
                                value:12,
                                message:'Enter valid GST Number',  
                            }
                           })}
                          />
                        </div>
                        {errors.gst_number && (<p className='errorsMsg'>{errors.gst_number.message}</p>)}
                        </div>
                      )
                    }                  
                
                      <div className="form-group row">
                       <label htmlFor="stateCode" className="col-sm-3 text-right control-label col-form-label">State Code</label>
                       <div className="col-sm-9">
                           <input type="text" className="form-control" id="state_code" name="state_code" placeholder="Enter Pin" 
                          {...register("state_code", {
                            required: "Enter stateCode.",
                            maxLength: {
                              value: 6,
                              message: "Please enter valid stateCode."
                            }
                          })}
                        />
                       </div>
                       {errors.state_code && (
                          <p className="errorsMsg">{errors.state_code.message}</p>
                        )}
                       </div>
                   </div>
                  

                   <div className="border-top">
                       <div className="card-body">
                           <button type="submit" className="btn btn-primary" style={{marginLeft:"450px"}}>Submit</button>
                       </div>
                   </div>
               </form>

           </div>
       </div>
   </div>
   </div>
   <Footer/>
</div>
  )
}

export default CustomersRegistration