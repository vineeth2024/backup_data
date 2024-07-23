import React, { useState } from 'react'
import { Justify, Person, PersonCircle, Power, Wallet, XLg } from 'react-bootstrap-icons'
import { Link,useNavigate,redirect} from 'react-router-dom'

const TopNav = () => {
    const [isDrop, setIsDrop] = useState(false);
    const navigate = useNavigate();
    const role = sessionStorage.getItem('user');
    const logout = (e) => {
        e.preventDefault();
        sessionStorage.clear('user');
        sessionStorage.clear('access');
        sessionStorage.clear('refresh');
         navigate('/');
    }
    return (
        <div>
            <header className='topbar ' data-navbarbg="skin5">
                <nav className="navbar top-navbar navbar-expand-md navbar-dark  ">
                    <div className='navbar-header' data-logobg="skin5">
                        <Link className='navbar-brand'>
                            <span className="logo-text">
                                {/* dark Logo text  */}
                                <img src="assets/images/pathbreaker_logo.png" alt="INVOICE APPLICATION" style={{ height: "65px", width: "180px" }} className="light-logo ml-2" />
                            </span>
                        </Link>
                        {/* <Link  className='topbartoggler d-block d-md-none waves-effect waves-light'><Justify size={30} color='Black'/></Link> */}
                    </div>
                    <div className="navbar-collapse collapse " id="navbarSupportedContent" data-navbarbg="skin5">
                        <ul className='navbar-nav float-left mr-auto'>
                            <li className='nav-item d-none d-md-block'>
                                <Link className='nav-link sidebartoggler waves-effect waves-light'><Justify size={25} /></Link>
                            </li>
                            <li className='nav-link sidebartoggler waves-effect waves-light mt-2' style={{ marginLeft:'400px' }}><h5  style={{ color: "orange", fontSize: "100" }}>INVOICE-APPLICATION</h5></li>
                        </ul>
                        {/* <ul className='navbar-nav'><li style={{ marginLeft: "10px" }}> <h6 style={{ color: "orange", fontSize: "500" }}>INVOICE-APPLICATION</h6></li></ul> */}
      
                        <ul className="navbar-nav float-right" style={{ marginLeft: "280px",marginLeft:"90px" }}>
                        
                        {/**Profile */}
                            {/* <li className="nav-item">
                                <Link className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic pt-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><PersonCircle size={25} color='orange'/></Link>
                            </li> */}
                             <li className="nav-item dropdown mr-5" >
                                <button className="nav-link dropdown-toggle waves-effect waves-dark pt-2 " style={{border:"none",backgroundColor:"transparent"}}  onClick={(e)=>{logout(e)}} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><Power size={28} color='orange'/></button>
                           
                            </li> 
                            
                        </ul>

                    </div>

                </nav>

            </header>

        </div>

    )
}

export default TopNav