import React from 'react'
import { Calendar2Fill } from 'react-bootstrap-icons'


const Pagination = () => {
  return (
    <div className="card">
  <div className="card-body">
    {/* Button trigger modal */}
    <button type="button" className="btn btn-info margin-5" data-toggle="modal" data-target="#Modal3">
      Image Popup
    </button>
    {/* Modal */}

    <div className="modal fade" id="Modal3" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">  
            <h5 className="modal-title" id="exampleModalLabel">Invoice-Application</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            {/* Preview page */}
            <div className="row">
              <div className="col-md-12">
                <div className="card card-body printableArea bg-white">
                  <img src="assets/images/pathbreaker_logo.png" style={{ height: "60px", width: "155px" }} alt="logo" />
                  <hr />
                  <div className="row">
                    <div className="col-md-6">
                      <div className="text-left">
                        <address>
                          <h6 style={{ fontSize: "smaller" }}>Billed To,</h6>
                          <h4 className="font-small">Name:</h4>
                          <h6 className="m-l-30">Mail-Id:</h6>
                          <h6 className="m-l-30">Contact No:</h6>
                          <h6 className="m-l-30">GST:</h6>
                          <h6 className="m-l-30">Address:</h6>
                        </address>
                      </div>
                    </div>
                    <div className=' col-md-6 text-right'>
                      <h5 className='text-right'><b style={{ fontSize: "smaller" }}>INVOICE -</b><span>invoice_no:</span></h5>
                      <p className="text-right mr-1">Invoice Date :&nbsp;<Calendar2Fill />&nbsp;<b className="m-l-30">invoice_date:</b></p>
                      {/* <p className="text-right mr-1">Due Date :&nbsp;<CalendarFill/>&nbsp;<b className="m-l-30 ">{invoiceData.expiration_date}</b></p> */}
                    </div>

                    <div className="col-md-12">
                      <div className="table-responsive m-t-40" >
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th className="text-center">#</th>
                              <th className="text-left">Description</th>
                              <th className="text-left">HSN-no</th>
                              <th className="text-left">Quantity</th>
                              <th className="text-left">GST (%)</th>
                              <th className="text-left">Unit Cost (₹)</th>
                              <th className="text-left">Total (₹)</th>
                            </tr>

                          </thead>
                          <tbody>
                            {/* {invoiceData && Array.isArray(invoiceData.product_details) ? (
                              invoiceData.product_details.map((item, index) => ( */}
                                <tr >
                                  <td className="text-center">1</td>
                                  <td className="text-left">product_name</td>
                                  <td className="text-left">hsn_no</td>
                                  <td className="text-left">no_of_units</td>
                                  <td className="text-left">gst_rate </td>
                                  <td className="text-left">product_cost</td>
                                  <td className="text-left">total_amount</td>
                                </tr>

                              {/* ))

                            ) : (
                              <tr>
                                <td colSpan="6" className="font-bold text-center">......No product details available......</td>
                              </tr>
                            )} */}

                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col-md-12">
                      {/* <table className=" table pull-right text-left" style={{borderSpacing:"1px"}}>
                        <tr className='col-md-8'>
                         <td className='col-md-5 '>
                          <h5 style={{ fontSize: "medium" }}>NEFT Information</h5>
                          <p>Account Holder Name : &nbsp; ........</p>
                          <p>Bank Name : &nbsp; ........</p>
                          <p>Branch&nbsp;: &nbsp; ........</p>
                          <p>Account Number : &nbsp; ........</p>
                          <p>IFSC Code : &nbsp; ........</p>
                         </td>
                         <th className='col-md-1'>
                          <p className='text-right'style={{marginBottom:"0px"}}>Total Amount :</p>
                          <p className='text-right'>Sgst(9%) : &nbsp;</p>
                          <p className='text-right'>Cgst(9%)&nbsp;: &nbsp;</p>
                          <p  className='text-right'>Igst(%) : &nbsp;</p>
                         </th>
                         <td className='col-md-1'>
                          <p className='text-right'style={{marginBottom:"0px"}}>2893</p>
                          <p className='text-right'> &nbsp; 49</p>
                          <p className='text-right'>&nbsp;49</p>
                          <p  className='text-right'>Igst(%) : &nbsp; 0</p>
                         </td>
                        
                        </tr>
                        <tr className=' col-md-12 table' style={{backgroundColor:"#f5f5f5"}}>
                          <th className='text-left ml-2'><b>In Words:</b> &nbsp;<em>amount_in_words</em>&nbsp;only/-</th>
                          <th style={{borderRight:"1px solid #dee2e6",borderLeftColor:"rgb(245, 245, 245)"}}>                          
                            <p style={{fontSize:"18px"}}className='text-right'><b>Grand Total :</b> &nbsp;  </p>
                          </th>
                          <td  className='text-right' style={{fontSize:"18px",borderRight:"0px"}}><text>3624</text></td>
                        </tr>
                      </table> */}
                      <div className='table-responsive'>
                        <table className='table'>
                          <tr>
                            <th colSpan={4} style={{ fontSize: "small" }}>Bank Details</th>
                            <th>Total Amount</th>
                            <td>1000₹</td>
                          </tr>
                          <tr>
                            <th colSpan={1} >Bank Name :</th>
                            <td >bank_name</td>
                            <th colSpan={1}>Pan Number:</th>
                            <td>pan_number</td>
                            <th colSpan={1} >SGST(%):</th>
                            <td>90₹</td>
                          </tr>
                          <tr>
                            <th colSpan={1} >Account Number : </th>
                            <td >acount_number</td>
                            <th colSpan={1}>GST Number:</th>
                            <td>gst_number</td>
                            <th colSpan={1} >CGST(%):</th>
                            <td>90₹</td>
                          </tr>
                          <tr>
                            <th colSpan={1} >IFSC Code : </th>
                            <td >ifsc_code</td>
                            <th colSpan={2} rowSpan={2}></th>
                            <th colSpan={1} >IGST(%):</th>
                            <td>0₹</td>
                          </tr>
                          <tr>
                            <th colSpan={1} >Branch : </th>
                            <td >branch_name</td>
                            <th colSpan={2}></th>
                          </tr>
                          <tr style={{backgroundColor:"#f5f5f5"}}>
                            <th colSpan={4} style={{ fontSize: "medium" }}><b>In Words:</b> &nbsp;<em>amount_in_words</em>&nbsp;only/-</th>
                            <th rowSpan={2} colSpan={2} className='text-right'><b>Grand Total:</b>&nbsp; &nbsp;1180₹ </th>
                            
                          </tr>
                          {/* <tr style={{backgroundColor:"#f5f5f5"}}>
                          <th className='text-left ml-2' colSpan={4}><b>In Words:</b> &nbsp;<em>amount_in_words</em>&nbsp;only/-</th>
                          <th style={{borderRight:"1px solid #dee2e6",borderLeftColor:"rgb(245, 245, 245)"}}>                          
                            <p style={{fontSize:"18px"}}className='text-right'><b>Grand Total :</b> &nbsp;  </p>
                          </th>
                         
                        </tr> */}
                         
                        </table>
                        <p style={{ fontStyle: "italic" }}>The Payment should be made favouring <b>company_name</b> or Direct deposit information given above.</p>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <h6 style={{ marginBottom: "60px" }}>For <b>company_name </b> </h6>
                        <address style={{ marginTop: "90px" }}>
                          <h6 style={{ fontStyle: "italic", fontSize: "medium" }}>Authorized Signature</h6>
                          <h3 className="text-danger">company_name,</h3>
                          <h6 className="m-l-5">address.</h6>
                        </address>
                        <hr />
                        <h5 className='text-center'><b>company_name</b></h5>
                        <h6 className='text-center' ><b>ph no: </b>+9012345678, <b>email:</b> pathbreakertech@gmail.com</h6>
                      </div>

                    </div>
                  </div>
                </div>
                {/* <div className="text-right" style={{marginBottom:"30px"}}>{/**onClick={downloadPdf} 
        <button className="btn btn-danger" type="submit" > Submit</button>
      </div> */}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Pagination// import React,{useState,useEffect} from 'react'
// //import TopNav from '../Pages/TopNav'
// //import SideNav from '../Pages/SideNav'
// //import Footer from '../Pages/Footer'
// import { Link,useNavigate} from 'react-router-dom'
// import {XSquareFill, PencilSquare } from 'react-bootstrap-icons'
// import axios from 'axios'
// //import Pagination from '../Pagination'
// import DataTable from 'react-data-table-component'
// //import SearchBar from '../SearchBar'

// const Pagination=({invoiceData})=>{
//   return(

//     <div className="row" style={{background:"rgba(0,0,0,0.8)"}}>
//     <div className="col-md-12">
//       <div className="card card-body printableArea bg-white">
//     <img src="assets/images/pathbreaker_logo.png" style={{height:"60px",width:"155px"}} alt="logo" />
//         <hr />
//         <pre>{JSON.stringify(invoiceData, null, 2)}</pre>
//         <div className="row">
//           <div className="col-md-6">
//             <div className="text-left">
//               <address>
//               <h6 style={{fontSize:"smaller"}}>Billed To,</h6>
//                 <h4 className="font-small">{invoiceData.customer}</h4>
//                 <h6 className="m-l-30">{invoiceData.mail_id},</h6>
//                 <h6 className="m-l-30">Contact No: {invoiceData.mobile_number},</h6>
//                 <h6 className="m-l-30">GST: {invoiceData.cos_gst_number},</h6>
//                 <h6 className="m-l-30">{invoiceData.customer_address},{invoiceData.state}</h6>
//               </address>
//             </div>
//           </div>
//           <div className=' col-md-6 text-right'>
//         <h5 className='text-right'><b style={{fontSize:"smaller"}}>INVOICE -</b><span>{invoiceData.invoice_no}</span></h5>
//         <p className="text-right mr-1">Invoice Date :&nbsp;<CalendarFill/>&nbsp;<b className="m-l-30">{invoiceData.invoice_date}</b></p>
//         <p className="text-right mr-1">Due Date :&nbsp;<CalendarFill/>&nbsp;<b className="m-l-30 ">{invoiceData.expiration_date}</b></p>
//         </div>

//           <div className="col-md-12">
//             <div className="table-responsive m-t-40" >
//               <table className="table table-hover">
//                 <thead>
//                   <tr>
//                     <th className="text-center">#</th>
//                     <th className="text-left">Description</th>
//                    <th className="text-left">HSN-no</th>
//                     <th className="text-left">Quantity</th>
//                     <th className="text-left">GST (%)</th>
//                     <th className="text-left">Unit Cost (₹)</th>
//                     <th className="text-left">Total (₹)</th>
//                   </tr>
                  
//                 </thead>
//                 <tbody>
//                 {invoiceData && Array.isArray(invoiceData.productdetails) ? (
//                   invoiceData.productdetails.map((item, index) => (
//                     <tr key={index}>
//                       <td className="text-center">{index + 1}</td>
//                       <td className="text-left">{item.product_name}</td>
//                       <td className="text-left">{item.purchase_id}</td>
//                       <td className="text-left">{item.no_of_units_allowed}</td>
//                       <td className="text-left">{item.gst_rate}</td>
//                       <td className="text-left">{item.cost_per_unit}</td>
//                       <td className="text-left">{item.total_amount}</td>
//                     </tr>
                  
//                   ))
                  
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="font-bold text-center">......No product details available......</td>
//                   </tr>
//                 )}
             
//                 </tbody>
//               </table>
//             </div>
//           </div>
//           <div className="col-md-12">
//             <table className=" table pull-right text-right">
//                <tr  className='col-md-12 'style={{paddingLeft:"5px"}}>
//               <th className="col-md-11"  ><b>Sub - Total amount:</b></th>
//               <td className="col-md-2">&nbsp;&nbsp;{invoiceData.subtotal}₹</td>
//               </tr>
//               <tr>
//               <th><b>Sgst ({invoiceData.sgst}%):</b></th>
//               <td>{invoiceData.sgst_amount}₹</td>
//               </tr>
//              <tr>
//               <th><b>Cgst ({invoiceData.cgst}%):</b> </th>
//               <td>{invoiceData.cgst_amount}₹</td>
//              </tr>
//              <tr>
//               <th><b>Igst ({invoiceData.igst}%):</b></th>
//               <td>{invoiceData.igst_amount}₹</td>
//              </tr>
//               <tr style={{borderBottom:"1px solid #dee2e6"}}>
//                 <th ><b>Total :</b></th>
//                 <td>{invoiceData.total}₹</td>
//               </tr>
//             <tr>
//             <p className='text-left ml-2'><b>In Words:</b> &nbsp;<em>{invoiceData.amount_in_words}</em>&nbsp;only/-</p>
//             </tr>
            
//             </table>
//             <p style={{fontStyle:"italic"}}>The Payment should be made favouring <b>{invoiceData.company_name}</b> or Direct deposit information given below.</p>
//            <div className='table-responsive'>
//         <table className='table'>  
//             <tr>
//             <th colSpan="12" style={{fontSize:"medium"}}>NEFT Information</th>
//             </tr>
//             <tr>
//             <th>Bank Name</th>
//             <td>{invoiceData.bank_name}</td>
//             <th>Pan Number</th>
//             <td>{invoiceData.pan_number}</td>
//             </tr>
//             <tr>
//             <th>Account Type</th>
//             <td>{invoiceData.bank_name}</td>
//             <th>GST:</th>
//             <td colSpan="3">{invoiceData.gst_number}</td>
//             </tr>
//             <tr>
//             <th>Account Number</th>
//             <td>{invoiceData.account_number}</td>
//             <th rowSpan={2} colSpan={2}></th>
            
//             </tr>
//             <tr>
//             <th>IFSC Code</th>
//             <td>{invoiceData.ifsc_code}</td>
            
//             </tr>
//             <tr>
//             <th >Bank Address</th>
//             <td colSpan="3">{invoiceData.bank_branch},{invoiceData.state}</td>
//             </tr>
//         </table>
//         <h6 style={{marginBottom:"60px"}}>For <b>{invoiceData.company_name} </b> </h6>
//         <address style={{marginTop:"90px"}}>
//             <h6 style={{fontStyle:"italic",fontSize:"medium"}}>Authorized Signature</h6>
//              <h3 className="text-danger">{invoiceData.company_name},</h3>
//              <h6 className="m-l-5">{invoiceData.address}.</h6>
//            </address>
//            <hr/>
//            <h5 className='text-center'><b>{invoiceData.company_name}</b></h5>
//          <h6 className='text-center' ><b>ph no: </b>+9012345678, <b>email:</b> pathbreakertech@gmail.com</h6>
//         </div>
        
//           </div>
//         </div>
//       </div>
//       <div className="text-right" style={{marginBottom:"30px"}}>{/**onClick={downloadPdf} */}
//         <button className="btn btn-danger" type="submit" > Submit</button>
//       </div>
//     </div>
//   </div>
//   )
// }

// export default Usersview;