import React, { useState, useEffect, useRef } from 'react'
import SideNav from "../Pages/SideNav";
import TopNav from "../Pages/TopNav";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link,useNavigate } from 'react-router-dom';
import Footer from '../Pages/Footer';
import { Slide, toast } from 'react-toastify'



const AdminRegistration = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const token = sessionStorage.getItem('access');
  const user = sessionStorage.getItem('id');
  const Navigate=useNavigate()
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result.split(',')[1]);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : '');
  };
console.log(fileName)
  const onSubmit = async (data) => {
   
   // Convert file to base64
   const file = data.stamp[0];
    const base64File = await convertFileToBase64(file);
    
    const jsonData = {
      client: data.client,
      mail_id: data.mail_id,
      phone_number: data.phone_number,
      company_name: data.company_name,
      pan_number: data.pan_number,
      gst_number: data.gst_number,
      gender: data.gender,
      file: base64File,  
      account_number: data.account_number,
      bank_name: data.bank_name,
      bank_branch: data.bank_branch,
      ifsc_code: data.ifsc_code,
      address: data.address,
      state: data.state,
    };
    console.log('json', jsonData);
    try {
      const response = await axios.post(`http://122.175.43.71:8001/api/adminprofile/${user}/`, jsonData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      toast.success('Register Successfully', {
        position: 'top-right',
        theme: "colored",
        autoClose: 1000,
        transition: Slide,
      });

      console.log(response.data);
      console.log(data);
    } catch (error) {
      if(error.response && error.response.status===401){
          Navigate('/');
      }else{
      console.error('Error:', error);
    }
  }
  };
  return (
    <div id="main-wrapper" data-sidebartype="mini-sidebar">
      <TopNav />
      <SideNav />
      <div className="page-breadcrumb" style={{ width: "78%", marginLeft: "280px" }}>
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="page-title" style={{ color: "blue" }}>Admin Registration</h4>
            <div className="ml-auto text-right">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Admin</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fliuid'>
        <div className='row'>
          <div className='col-md-9 ' style={{ marginLeft: "300px", marginTop: "40px" }}>
            <div className="card">
              <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                <div className="card-body">
                  <h4 className="card-title" style={{ marginLeft: "80px" }}>Admin Info</h4>
                  <div className="form-group row mt-5">
                    <label htmlFor="fname" className="col-sm-3 text-right control-label col-form-label">User Name</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="client" id="client" placeholder="Client Name"
                        {...register("client", {
                          required: true,
                        })}
                      />
                    </div>
                    <div>
                      {errors.client && <p className='errorsMsg '>Client Name is Required .</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="mail_id" className="col-sm-3 text-right control-label col-form-label">Email</label>
                    <div className="col-sm-9">
                      <input type="email" className="form-control" name="mail_id" id="mail_id" placeholder="Email Id"
                        {...register("mail_id", {
                          required: "Email is Required",
                          pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: "Invalid Email"
                          }
                        })}
                      />
                    </div>
                    <div>
                      {errors.mail_id && <p className="errorsMsg">{errors.mail_id.message}</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="phone_number" className="col-sm-3 text-right control-label col-form-label">Phone:</label>
                    <div className="col-sm-9">
                      <input type="tel" className="form-control" name="phone_number" id="phone_number" placeholder="Phone Number"
                        {...register("phone_number", {
                          required: "Enter Mobile Number",
                          minLength: {
                            value: 10,
                            message: 'Enter valid Mobile Number',
                          }
                        })}
                      />
                    </div>
                    <div>
                      {errors.phone_number && (<p className='errorsMsg'>{errors.phone_number.message}</p>)}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="company_name" className="col-sm-3 text-right control-label col-form-label">Company Name</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="company_name" id="company_name" placeholder="Company Name"
                        {...register("company_name", {
                          required: true,
                        })}
                      />
                    </div>
                    <div>
                      {errors.company_name && <p className='errorsMsg '>Company Name is Required .</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="pan_number" className="col-sm-3 text-right control-label col-form-label">Pan</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="pan_number" id="pan_number" placeholder="Pan Card Number"
                        {...register("pan_number", {
                          required: "Enter Pan Number.",
                        })}
                      />
                    </div>
                    <div>
                      {errors.pan_number && (
                        <p className="errorsMsg">{errors.pan_number.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="gst_number" className="col-sm-3 text-right control-label col-form-label">GST-Number</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="gst_number" id="gst_number" placeholder="GST..."
                        {...register("gst_number", {
                          required: "Enter GST Number",
                          minLength: {
                            value: 12,
                            message: 'Enter valid GST Number',
                          }
                        })}
                      />
                    </div>
                    <div>
                      {errors.gst_number && (<p className='errorsMsg'>{errors.gst_number.message}</p>)}
                    </div>
                  </div>
                  <div className=' form-group row'>
                    <label htmlFor="gender" className="col-sm-3 text-right control-label col-form-label">Gender</label>
                    <input type="radio" name="gender" id="genderMale" value="male" style={{ marginLeft: "12px" }}
                      {...register("gender", {
                        required: "Please select your gender"
                      })}
                    />
                    <label htmlFor='genderMale' className="text-right col-form-label ml-2">Male</label><br />
                    <input type="radio" name="gender" id="genderFemale" value="female" style={{ marginLeft: "10px" }}
                      {...register("gender")}
                    />
                    <label htmlFor='genderFemale' className="text-right  col-form-label ml-2" required>Female</label>
                    <input type="radio" name="gender" id="genderOthers" value="others" style={{ marginLeft: "10px" }}
                      {...register("gender")}
                    />
                    <label htmlFor='genderOthers' className="text-right  col-form-label ml-2" required>Others</label>
                    {errors.gender && <p className="errorsMsg mt-2" style={{ marginLeft: "40px" }}>{errors.gender.message}</p>}
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 text-right control-label col-form-label">Stamp & Sign</label>
                    <div className="col-md-5">
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" name='stamp' id="stamp"
                         onChange={(e) => handleFileChange(e)}
                         {...register("stamp",{
                          required:"Upload a file",
                         })}
                           />
                        <label className="custom-file-label" htmlFor="stamp">
                          {fileName || 'Choose file...'}
                        </label>
                        {errors.stamp && (<p className='errorsMsg'>{errors.stamp.message}</p>)}
                      </div>
                    </div>
                  </div>
                  <h5 className="card-title" style={{ marginLeft: "80px" }}>Bank Details</h5>
                  <div className="form-group row">
                    <label htmlFor="account_number" className="col-sm-3 text-right control-label col-form-label">Bank Account</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="account_number" id="account_number" placeholder="Bank Account"
                        {...register("account_number", {
                          required: "Enter Account Number",
                          minLength: {
                            value: 12,
                            message: 'Enter valid Account Number',
                          }
                        })}
                      />
                    </div>
                    <div>
                      {errors.account_number && (<p className='errorsMsg'>{errors.account_number.message}</p>)}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="bank_name" className="col-sm-3 text-right control-label col-form-label">Bank Name</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="bank_name" id="bank_name" placeholder="Bank Name"
                        {...register("bank_name", {
                          required: true,
                        })}
                      />
                    </div>
                    <div>
                      {errors.bank_name && <p className='errorsMsg '>Bank Name is Required .</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="bank_branch" className="col-sm-3 text-right control-label col-form-label">Branch</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="bank_branch" id="bank_branch" placeholder="Branch Name"
                        {...register("bank_branch", {
                          required: true,
                        })}
                      />
                    </div>
                    <div>
                      {errors.bank_branch && <p className='errorsMsg '>Branch Name is Required .</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="ifsc_code" className="col-sm-3 text-right control-label col-form-label"> IFSC Code</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="ifsc_code" id="ifsc_code" placeholder="IFSC CODE"
                        {...register("ifsc_code", {
                          required: "Enter IFSC Code",
                          minLength: {
                            value: 12,
                            message: 'Enter valid IFSC Code',
                          }
                        })}
                      />
                    </div>
                    <div>
                      {errors.ifsc_code && (<p className='errorsMsg'>{errors.ifsc_code.message}</p>)}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="lname" className="col-sm-3 text-right control-label col-form-label">Address</label>
                    <div className="col-sm-9">
                      < textarea rows="3" cols="5" className="form-control" name="address" id="address" placeholder="Enter Address"
                        {...register("address", {
                          required: true,
                        })}
                      />
                    </div>
                    <div>
                      {errors.address && <p className='errorsMsg '>Enter Address Required</p>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="state" className="col-sm-3 text-right control-label col-form-label">State</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="state" id="state" placeholder="State...."
                        {...register("state", {
                          required: true,
                        })}
                      />
                    </div>
                    <div>
                      {errors.state && <p className='errorsMsg '>State Name is Required .</p>}
                    </div>
                  </div>
                  <div className="border-top">
                    <div className="card-body">
                      <button type="submit" className="btn btn-primary" style={{ marginLeft: "250px" }}>Submit</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default AdminRegistration;
{/**
try {
      // Declare formData before the try block
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'file') {
          // For the 'file' field, append file name and file data
          formData.append('fileName', value.fileName);
          formData.append('fileData',value);
        } else {
          // For other fields, append key-value pairs
          formData.append(key, value);
        }
      });
     */}