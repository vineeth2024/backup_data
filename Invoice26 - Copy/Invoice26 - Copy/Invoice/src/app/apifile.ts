export const apin = "http://122.175.43.71:8001/"
// export const apin = "http://192.168.1.163:8001/"
export const endPointsUser = {
    // Endpoints for login
    login: `${apin}login/`,
    sendotp:`${apin}otp`,
    dashboard:`${apin}dashboard`,

    //Endpoints for Accounts
    addaccounts:`${apin}addinwardpayments`,
    viewaccounts:`${apin}viewinwardpayments`,

    //Endpoints for AdminProfile
    addadmin:`${apin}adminprofile`,
    deleteadmin:`${apin}deleteadmin`,
    updateadmin:`${apin}updateadmin`,

    //Endpoints for customer
    addcustomer:`${apin}addcoustmer`,
    viewcustomer:`${apin}viewcoustmer`,
    updatecustomer:`${apin}updatecustomer/`,
    deletecustomer:`${apin}deletecustomer/`,
    editcustomer:`${apin}editcustomer/`,
    //Endpoints for Products
    addproduct:`${apin}addproduct`,
    viewproduct:`${apin}viewproduct`,
    deleteproduct:`${apin}deleteProduct/`,
    updateproduct:`${apin}updateProduct/`,
    editproduct:`${apin}editproduct/`,

    //Endpoints for Invoice
    Addinvoice:`${apin}createinvoice/`,
    viewinvoice:`${apin}viewinvoice`,
    deleteinvoice:`${apin}deleteinvoice/`,
    invoiceslip:`${apin}invoiceslip/`,
    
    //Endpoints for User
    addUser:`${apin}adduser`,
    viewuser:`${apin}viewusers`,
    deleteuser:`${apin}deleteuser/`,
    updateuser:`${apin}updateuser/`,
    edituser:`${apin}edituser/`
}