//import { borderRightStyle } from 'html2canvas/dist/types/css/property-descriptors/border-style';
import React from 'react';
import { Calendar2Fill } from 'react-bootstrap-icons';
//import { ModalDialog } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Modalotp=()=> {
  return (
    <>
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
                      <table className=" table pull-right text-left" style={{borderSpacing:"1px"}}>
                        <tr className='col-md-8'>
                         <td className='col-md-5 '>
                          <h5 style={{ fontSize: "medium" }}>NEFT Information</h5>
                          <p>Account Holder Name : &nbsp; ........</p>
                          <p>Bank Name : &nbsp; ........</p>
                          <p>Branch&nbsp;: &nbsp; ........</p>
                          <p>Account Number : &nbsp; ........</p>
                          <p>IFSC Code : &nbsp; ........</p>
                         </td>
                         <td className='col-md-2'>
                          <p className='text-right'>Total Amount : &nbsp;<text >2893</text></p>
                          <p className='text-right'>Sgst(9%) : &nbsp; <text >49</text></p>
                          <p className='text-right'>Cgst(9%)&nbsp;: &nbsp; <text >49</text></p>
                          <p  className='text-right'>Igst(%) : &nbsp; <text>0</text></p>
                         </td>
                        
                        </tr>
                        <tr className=' col-md-12 table'>
                          <p className='text-left ml-2'><b>In Words:</b> &nbsp;<em>amount_in_words</em>&nbsp;only/-</p>
                          <th>                          
                            <p style={{marginBottom:"0px",fontSize:"20px"}}className='text-left'><b>Grand Total :</b> &nbsp; <text className='text-right'>3624</text></p>
                          </th>
                        </tr>
                      </table>
                      <p style={{ fontStyle: "italic" }}>The Payment should be made favouring <b>company_name</b> or Direct deposit information given below.</p>
                      <div className='table-responsive'>
                        <table className='table'>
                          <tr>
                            <th colSpan="12" style={{ fontSize: "medium" }}>NEFT Information</th>
                          </tr>
                          <tr>
                            <th>Bank Name</th>
                            <td>bank_name</td>
                            <th>Pan Number</th>
                            <td>pan_number</td>
                          </tr>
                          <tr>
                            <th>Account Type</th>
                            <td>bank_name</td>
                            <th>GST:</th>
                            <td colSpan="3">gst_number</td>
                          </tr>
                          <tr>
                            <th>Account Number</th>
                            <td>account_number</td>
                            <th rowSpan={2} colSpan={2}></th>

                          </tr>
                          <tr>
                            <th>IFSC Code</th>
                            <td>ifsc_code</td>

                          </tr>
                          <tr>
                            <th >Bank Address</th>
                            <td colSpan="3">bank_branch,state</td>
                          </tr>
                        </table>
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
</>
  );
}

export default Modalotp;