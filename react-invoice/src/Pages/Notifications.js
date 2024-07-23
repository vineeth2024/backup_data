import React, { useState, useEffect } from "react";
import SideNav from "../Pages/SideNav";
import TopNav from "../Pages/TopNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Eye, PencilSquare, XSquareFill } from "react-bootstrap-icons";
import Footer from "../Pages/Footer";
import DataTable from "react-data-table-component";
import { Slide, toast } from 'react-toastify';

const InvoiceViews = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('')
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate(); //
    const token = sessionStorage.getItem('access');

    const getInvoices = () => {
        axios.get("http://122.175.43.71:8001/api/invoice/", {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        },)
            .then((res) => {
                console.log(res);
                setUsers(res.data.data);    
                setFilteredData(res.data.data);
            })
    }
    useEffect(() => {
        getInvoices();
    }, []);
    const onUpdate=(id)=>{
      navigate('/invoiceSlip',{state:{id}})
   }
    const deleteData = async (id) => {
        try {
            // Make a DELETE request to the API with the given ID
            await axios.delete('http://122.175.43.71:8001/api/invoice/' + id + '/', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            },)
                .then((response) => {
                    getInvoices();
                    toast.error("Deleted Successfully", {  //Notification status
                        position: 'top-right',
                        transition: Slide,
                        hideProgressBar: true,
                        theme: "colored",
                        autoClose: 1000, // Close the toast after 1 seconds
                    });
                    console.log(response.data);
                })
        } catch (error) {
            // Log any errors that occur
            console.error(error.response);
            if (error.response && error.response.data) {
                console.error('Server Error Message:', error.response.data);
            }
        }
    }
    const paginationComponentOptions = {
        noRowsPerPage: true,
    }
    const columns = [
        {
            name: "Id",
            selector: (row) => row.invoice_id,
        },
        {
            name: "Invoice Number",
            selector: (row) => row.invoice_no,
        },
        {
            name: "Client Name",
            selector: (row) => row.client_name,
        },
        {
            name: "Invoice Date",
            selector: (row) => row.invoice_date,
        },
        {
            name: "Action",
            cell: (row) =>
                <div>
                    <button className="btn btn-sm mr-2" style={{backgroundColor:"transparent"}} ><SendFill size={22} color='darkorange'/></button>
                    <button className="btn btn-sm mr-2" style={{ backgroundColor: "transparent" }} onClick={() => onUpdate(row.invoice_id)}><Eye size={22} color='#2255a4' /></button>
                    <button className="btn btn-sm " style={{ backgroundColor: "transparent" }} onClick={() => deleteData(row.invoice_id)}><XSquareFill size={22} color='#da542e' /></button>
                </div>

        }
    ]
        const  getFilteredList=async(searchData) => {console.log("seacrh",searchData)
        setSearch(searchData) 
        debugger
        const result = users.filter((data) => {
            return (
                (data.invoice_id && data.invoice_id.toString().includes(searchData)) ||
               (data.client_name.toString().includes(searchData))
            );
        });
        setFilteredData(result);
    }
    
    return (
        <div id="main-wrapper" data-sidebartype="mini-sidebar">
            <TopNav />
            <SideNav />
            <div className="page-breadcrumb" style={{ width: "78%", marginLeft: "280px" }}>
                <div className="row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title" style={{ color: "blue" }}>Products Details</h4>
                        <div className="ml-auto text-right">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">ProductList</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container-fliuid'>
                <div className='row'>
                    <div className='col-md-9 ' style={{ marginLeft: "300px" }}>
                        <div className="card" style={{ marginTop: "50px" }}>
                            <div className="card-body col-md-12" >

                                <button type="button" className="btn btn-primary btn-lg " onClick={() => navigate('/productsRegistration')} style={{ marginBottom: "10px" }} >Add Product</button>
                                <input
                                    className="form-control col-md-3"
                                    style={{ border: "1px soild black", borderRadius: "8px", float: "right", marginBottom: "10px" }}
                                    type="text"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) =>getFilteredList(e.target.value)}
                                />

                                <div className="table-responsive">
                                    <DataTable
                                        className="table table-striped table-bordered"
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
            <Footer />
        </div>


    )
}
export default InvoiceViews;

// import { toast } from "react-toastify/dist/components";
// import 'react-toastify/scss';

// // Initialize react-toastify
// toast.configure();

// export default Notifications
// // Create a function to display success notifications
// export const showSuccessNotification = (message) => {
//   toast.success(message, {
//     position: 'top-right',
//     autoClose: 3000,
//   });
// };

// // Create a function to display error notifications
// export const showErrorNotification = (message) => {
//   toast.error(message, {
//     position: 'bottom-left',
//   });
// };
