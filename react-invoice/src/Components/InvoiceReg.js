import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import TopNav from '../Pages/TopNav'
import SideNav from '../Pages/SideNav'
import Footer from "../Pages/Footer"
//import { XSquareFill } from "react-bootstrap-icons/dist";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.module.css'
//import { Calendar4 } from "react-bootstrap-icons/dist";
import moment from "moment/moment";
import { Slide, toast } from 'react-toastify';
import InvoicePdf from "./InvoicePdf";
import InvoicePreview from "./InvoicePreview";
import { HandbagFill } from "react-bootstrap-icons";
//import { CalendarFill } from 'react-bootstrap-icons';


const InvoiceReg = () => {
  const { register, handleSubmit, control, getValues, reset, setValue, formState: { errors } } = useForm();
  const [invoiceData, setInvoiceData] = useState('')
  const [productsInfo, setProductsInfo] = useState([
    {
      product_name: "",
      hsn_no: "",
      purchase_date: "",
      no_of_units: "",
      product_cost: "",
      total_gst:"",
    }
  ]);
 
 // const [showPreview, setShowPreview] = useState(false);
  const [productList, setProductList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomerData, setSelectedCustomerData] = useState([]);
  //const [invoiceNumber, setInvoiceNumber] = useState('');
  //const [serialNumber, setSerialNumber] = useState(1);
 const[totalGst,setTotalGst]=useState('');
  const token = sessionStorage.getItem('access');

  const navigate = useNavigate();
  //Creating Date
  let day = new Date();
  const date = `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`;
  const year = day.getFullYear();

  //Adding Products info
  const AddProductsInfo = () => {
    const newItem = {product_name:"", hsn_no: "", purchase_date: "", no_of_units: "", product_cost: "" ,total_gst:totalGst};
    setProductsInfo([...productsInfo,newItem])
  }

  
  //Adding function to delete the Prodcut Details
  const handleDelete = (index) => {
    const updatedProducts = [...productsInfo];
    updatedProducts.splice(index, 1);
    setProductsInfo(updatedProducts);
  }
  // const generateInvoiceNumber = () => {
  //   setSerialNumber((prevSerialNumber) => prevSerialNumber + 1);
  //     const lastTwoDigitsOfYear = String(year).slice(-2);
  //     const newInvoiceNumber = `INV/${lastTwoDigitsOfYear}/${serialNumber + 1}`;
  //     return newInvoiceNumber;
 
  // }
  // const reviewInvoice=()=>{
  //   console.log(".......preview calling....")
  //   setShowPreview(true);
  // } 
  // const handleClose=()=>{
  //   setShowPreview(false);
  // }

  const onSubmit = (x) => {
    console.log(x);
    const y = x.productsInfo.map(item => {
      let obj = { ...item }
      obj.purchase_date = moment(day).format('YYYY-MM-DD');
      return (obj);
    })
    console.log(y);
    x.product_details = y;
    delete x.y;
    delete x.productsInfo
   
    delete x.invoiceData
    axios.post('http://122.175.43.71:8001/api/invoice/', x, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    },)
      .then((response) => {
        toast.success('Register Successfully', {  //Notification status
          position: 'top-right',
          transition: Slide,
          hideProgressBar: true,
          theme: "colored",
          autoClose: 1000, // Close the toast after 1 seconds
        });
        setInvoiceData(x)
        //console.log(invoiceData);
      //  setShowPreview(true);
        console.log(response.data)
      
        navigate('/Invoices')
      })
      .catch((errors) => {
        if(errors.response&& errors.response.status===401){
          toast.error('Invalid Credentials', {  //Notification status
            position: 'top-right',
            autoClose: 1000, // Close the toast after 1 seconds
          });
          navigate('/')
        }else{
        toast.error('Invalid Credentials', {  //Notification status
          position: 'top-right',
          autoClose: 1000, // Close the toast after 1 seconds
        });
        console.log(errors)
      }
      });
  }

  useEffect(() => {
    axios.get(`http://122.175.43.71:8001/api/customer/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    },)
      .then((response) => {
        const formattedCustomerList = response.data.map(customer => ({
          label: customer.customer_id,
          value: customer.id,
          name: customer.id,
          mobile_number: customer.mobile_number,
          customer_address: customer.address,
          gst_number: customer.gst_number,
          mail_id: customer.mail_id,
          state: customer.state,
          pin_code: customer.pin_code,
          // id:customer.id
        }));
        setCustomerList(formattedCustomerList);
        console.log(response.data)
      })
      .catch((errors) => {
        if(errors.response&& errors.response.status===401){
          toast.error('Invalid Credentials', {  //Notification status
            position: 'top-right',
            autoClose: 1000, // Close the toast after 1 seconds
          });
          navigate('/')
        }else{
        toast.error('Invalid Credentials', {  //Notification status
          position: 'top-right',
          autoClose: 1000, // Close the toast after 1 seconds
        });
        console.log(errors)
      }
      });
  }, []);
  useEffect(() => {
    console.log(selectedCustomerData);
  }, [selectedCustomerData]);
  useEffect(() => {
    axios.get(`http://122.175.43.71:8001/api/product/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    },)
      .then((response) => {
        const formattedProductList = response.data.map(product => {
          const productGst = parseFloat(product.cgst) + parseFloat(product.sgst);
          setTotalGst(productGst);
          console.log(totalGst);
          return {
            label: product.product_name,
            value: product.product_name,
            name: product.product_name,
            cgst: product.cgst,
            hsn_no: product.hsn_no,
            id: product.id,
            product_cost: product.product_cost,
            sgst: product.sgst,
            igst: product.igst,
            total_gst: productGst,
          };
        });
        setProductList(formattedProductList);
        console.log(response.data)
      })
      .catch((errors) => {
        if(errors.response&& errors.response.status===401){
          toast.error('Invalid Credentials', {  //Notification status
            position: 'top-right',
            autoClose: 1000, // Close the toast after 1 seconds
          });
          navigate('/')
        }else{
        toast.error('Invalid Credentials', {  //Notification status
          position: 'top-right',
          autoClose: 1000, // Close the toast after 1 seconds
        });
        console.log(errors)
      }
      });
  }, []);
  
  return (
    <div id="main-wrapper" data-sidebartype="mini-sidebar">
      <TopNav />
      <SideNav />
      <div className="page-breadcrumb" style={{ width: "78%", marginLeft: "280px" }}>
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="page-title" style={{ color: "blue" }}>Invoice Registration</h4>
            <div className="ml-auto text-right">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                  <li className="breadcrumb-item"><Link to={'/Invoices'}>Invoice List</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Invoice Registration</li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fliuid'>
        <div className='row'>
          <div className='col-md-9 ' style={{ marginLeft: "300px", paddingTop: "50px" }}>
            <div className="card">
              <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>{/**onSubmit={togglePreview} */}
                <div className="card-body">
                  <h4 className="card-title ml-1">Invoice Info</h4>
                  <div className="form-group row mt-5">
                    <label htmlFor="customer" className="col-sm-3 text-right control-label col-form-label">Customer Name</label>
                    <div className="col-sm-9">
                      <Controller
                        name="customer_id"
                        id="customer_id"
                        control={control}
                        rules={{ required: "true" }}
                        render={({ value }) => (
                          <Select
                            value={customerList.find((e) => e.value === value)}
                            options={customerList}
                            onChange={(data) => {
                              setValue('customer_id', data.value);
                              const selectedCustomer = customerList.find((customer) => customer.value === data.value);
                              setSelectedCustomerData(selectedCustomer);
                            }}
                          />
                        )}
                      />
                    </div>
                    {errors.customer && (
                      <p className="errorsMsg">Select Customer Name</p>)}
                  </div>
                  <div className="form-group row">
                    <label htmlFor="purchase_order" className="col-sm-3 text-right control-label col-form-label">Purchase Order</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="purchase_order" id="purchase_order" placeholder="Enter Purchase Order"
                        {...register("purchase_order", {
                          required: 'Enter Purchase Order'
                        })}
                      />
                    </div>
                    {errors.purchase_order && (<p className="errorsMsg">{errors.purchase_order.message}</p>)}
                  </div>
                  <div className="form-group row">
                    <label htmlFor="vendor_code" className="col-sm-3 text-right control-label col-form-label">Vendor Code:</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="vendor_code" id="vendor_code" placeholder="Enter Vendor Code"
                        {...register("vendor_code", {
                          required: " Enter vendor_code"
                        })}
                      />
                    </div>
                    {errors.vendor_code && (<p className="errorsMsg">{errors.vendor_code.message}</p>)}
                  </div>
                  <div className="form-group row">
                    <label htmlFor="invoice_date" className="col-sm-3 text-right control-label col-form-label">Invoice Date</label>
                    <div className="col-sm-9">
                      <input type="date" className="form-control" name="invoice_date" id="invoice_date" placeholder="Enter Invoice Date "
                        {...register("invoice_date", {
                          required: 'Enter date'
                        })}
                      />
                    </div>
                    {errors.invoice_date && (<p className="errorsMsg">{errors.invoice_date.message}</p>)}
                  </div>
                  <div className="form-group row">
                    <label htmlFor="invoice_number" className="col-sm-3 text-right control-label col-form-label">Invoice Number</label>
                    <div className="col-sm-9">
                      <input type="text" className="form-control" name="invoice_number" id="invoice_number" 
                      // placeholder={invoiceNumber || generateInvoiceNumber()}
                      //  value={invoiceNumber||generateInvoiceNumber()}
                      {...register("invoice_number", {
                          required: 'Enter Invoice Number'
                        })}
                      />
                    </div>
                    {errors.invoice_number && (<p className="errorsMsg">{errors.invoice_number.message}</p>)}
                  </div>
                  <div className="row">
                    <h5 className="card-title ml-3">Product Details</h5>
                    <button type="button"
                      onClick={AddProductsInfo}
                      className="btn btn-secondary" style={{ marginLeft: "80%" }} >Add More </button>
                  </div>
                  <div className="form-group row">
                    <div className="col-sm-12" style={{ marginLeft: "5%" }} >
                      {productsInfo && productsInfo.length > 0 &&
                        productsInfo.map((item, index) => (
                          <div key={item.id} className="row">
                            <div className="form-group col-sm-2 ml-2 mt-2 mt-2">
                              <div className="row">
                                {errors?.productsInfo && errors?.productsInfo[index] && errors?.productsInfo[index].product_id && (
                                  <p className="errorMsgs">*</p>
                                )}
                                <label htmlFor="product_id" className="text-right control-label col-form-label pb-2">Product Id</label>
                              </div>
                              <Controller
                                control={control}
                                name={`productsInfo[${index}].product_id`}
                                id={`productsInfo[${index}].product_id`}
                                rules={{ required: true }}
                                render={({ value }) => (
                                  <Select
                                    options={productList}
                                    value={productList.find((e) => e.value === value)}
                                    onChange={(val) => {
                                      setValue(`productsInfo[${index}][product_id]`, val.value);
                                      setValue(`productsInfo[${index}][product_cost]`, val.product_cost);
                                      setValue(`productsInfo[${index}][hsn_no]`, val.hsn_no);
                                      setValue(`productsInfo[${index}][total_gst]`, val.total_gst);
                                      console.log(productsInfo)
                                    }}
                                 
                                  />
                                )}
                              />

                            </div>
                            <div className="form-group row col-sm-2 ml-2">
                              {errors?.productsInfo && errors?.productsInfo[index] && errors?.productsInfo[index].product_id && (
                                <p className="errorMsgs">*</p>
                              )}
                              <label htmlFor="cost_per_unit" className=" text-right control-label col-form-label">HSN No</label>
                              <input className="form-control" type="text" id="hsn_no" name="hsn_no" {...register(`productsInfo[${index}][hsn_no]`, { required: "true" })}  /**{`productsInfo[${index}][hsn_no]`} */
                              />
                            </div>
                            <div className="form-group row col-sm-2 ml-2">
                              {errors.productsInfo && errors.productsInfo[index] && errors.productsInfo[index].purchase_date && (
                                <p className="errorMsgs">*</p>
                              )}
                              <label htmlFor="purchase_date" className=" text-right control-label col-form-label">Purchase Date</label>
                              <input className="form-control" id="purchase_date" name="purchase_date" type="date" /**{`productsInfo[${index}][purchase_date]`} */ {...register(`productsInfo[${index}][purchase_date]`, { required: 'true' })} />
                            </div>
                            <div className="form-group row col-sm-2 ml-2">
                              {errors.productsInfo && errors.productsInfo[index] && errors.productsInfo[index].no_of_units && (
                                <p className="errorMsgs">*</p>
                              )}
                              <label htmlFor="no_of_units" className="text-right control-label col-form-label">Quantity</label>
                              <input className="form-control" id="no_of_units" name="no_of_units" type="number" /**{`productsInfo[${index}[no_of_units]`} */
                  
                                {...register(`productsInfo[${index}].no_of_units`, { required: 'true' })}
                              />
                            </div>
                            {/* {errors.no_of_units && (<p className="errorsMsg">{errors.no_of_units.message}</p>)} */}

                            <div className="form-group row col-sm-2 ml-2">
                              {errors?.productsInfo && errors?.productsInfo[index] && errors?.productsInfo[index].product_id && (
                                <p className="errorMsgs">*</p>
                              )}
                              <label htmlFor="cost_per_unit" className=" text-right control-label col-form-label">Cost</label>
                              <input className="form-control" type="text" id="product_cost" name="product_cost"  {...register(`productsInfo[${index}][product_cost]`, { required: 'true' })}
                              />
                            </div>
                            <div className="card-body mt-4">
                              <button className="btn btn-danger"
                                onClick={() => handleDelete(index)}
                              >Delete</button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="border-top">
                  <div className="card-body">
                    <button className="btn btn-primary" style={{ marginLeft: "450px" }} type="submit" >Submit</button>
                    {/* {showPreview && (
                      onClick={reviewInvoice}
                      <div >
                        <InvoicePreview
                          invoiceData={invoiceData}
                          selectedCustomerData={selectedCustomerData}
                          productsInfo={productsInfo}
                          // totals={calculateTotalProductCost()} 
                          reviewInvoice={reviewInvoice}
                          handleClose={handleClose}
                         onSubmit={handleSubmit(onSubmit)}
                        />
                      </div>
                    )
                    } */}
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
export default InvoiceReg