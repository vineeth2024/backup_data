import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormArray,FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Router ,ActivatedRoute} from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { PDFDocument, rgb } from 'pdf-lib';
import { HttpClient } from '@angular/common/http';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-invoice-grid',
  templateUrl: './invoice-grid.component.html',
  styleUrls: ['./invoice-grid.component.css']
})
export class InvoiceGridComponent implements OnInit {
  productForm:any
  displayDialog: boolean = false;

  view1:boolean | undefined
  invoicedettails:any
  searchText: any
  items: MenuItem[] | undefined;
  getinvoicedata: any;
  invoicedetails: any[] = [];
  allinvoicedata: any;
  totalCount = 0
  messageservice: any;
  downloaddetails: any;
  base64String:any
  uploadedFiles: any;
  fileURLs: any;
  id: any;
  invoiceData: any;
  productdettails:any
  page = 1;
  pageSize = 10;
  constructor(
    private route:Router,
    private apiserviceservice:ApiServiceService,
    private activatedroute:ActivatedRoute,
    private http:HttpClient
  ) {
    this.activatedroute.params.subscribe((data:any)=>{
      if(data.id){
        this.id = data.id
        this.getinvoice()
        console.log(data.id)
      }
    });
   }

  setId(invoiceId: string) {
    this.id = invoiceId;
  }

  ngOnInit(): void {
    this.getinvoice()
  }
  pageChange(event: number) {
    this.page = event;
     this.getinvoice()
   }
   showDialog() {
    this.displayDialog = true;
  }
  cancelLogout() {
    this.displayDialog = false;
  }
  logout() {
    // Handle logout logic here
    // You can replace this with your actual logout code
    alert('Logging out...');
    // After logging out, close the dialog
    this.displayDialog = false;
    this.route.navigate(['/login'])
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.invoicedetails = this.allinvoicedata;
    }

    else {
      this.invoicedetails = this.allinvoicedata.filter(
        (invoice: any) =>
          (invoice.invoice_no && invoice.invoice_no.toLowerCase().includes(filterValue)) ||
          (invoice.client_name && invoice.client_name.toLowerCase().includes(filterValue)) ||
          (invoice.invoice_date && invoice.invoice_date.toString().includes(filterValue))||
          (invoice.invoice_no && invoice.invoice_no.toString().includes(filterValue))||
          (invoice.invoice_id && invoice.invoice_id.toString().includes(filterValue))

          
       
      );
    }
  }
  view(id:any){
    this.view1=true
    this.apiserviceservice.invoiceslip(id).subscribe((data: any) => {
      this.invoicedettails =data.data
      this.productdettails =data.data.productdetails
    })

  }
  downloadPdf(id: any) {
    // Make your API call here to get the invoice slip details
    this.apiserviceservice.invoiceslip(id).subscribe((data: any) => {
      // Data from the API response
      const invoiceData = data.data;
  
      const pdf = new jsPDF.default();
      pdf.setFont('times', 'normal');
      pdf.rect(5, 5, 200, 287); // Adjust the x, y, width, and height as needed

      // pdf.addPage('a4');
      pdf.setFontSize(20);

      pdf.text('Invoice Details', 105, 13, { align: 'center' });

  
      pdf.addImage("../../assets/pathbreakerlogo.png", 'JPEG', 9, 4, 40, 30);
      pdf.setFontSize(13);

      // Display customer details in the top left corner
      pdf.text('To ' , 10, 40);
      pdf.setFontSize(10);

      pdf.text('Customer Name: ' + invoiceData.customer, 10, 45);
      pdf.text('Email: ' + invoiceData.mail_id, 10, 50);
  
      pdf.text('GST Number: ' + invoiceData.gst_number, 10, 55);
      pdf.text('Mobile Number: ' + invoiceData.mobile_number, 10, 60);
  
      // Wrap the address text within a specific width
      const addressText = pdf.splitTextToSize(invoiceData.address, 65);
      pdf.text('Address:', 10, 65);
      pdf.text(addressText, 25, 65);
  
      // Add Invoice No in the top right corner
      pdf.text('Invoice No: ' + invoiceData.invoice_no, 165, 35);
      pdf.text('Invoice Date: ' + invoiceData.invoice_date, 165, 40);
    

      // Define purchaseIds by extracting purchase_id values from productdetails
      const purchaseIds = invoiceData.productdetails.map((product: { purchase_id: any }) => product.purchase_id);
  
      const columns = ['S.No', 'HSN Code', 'Product Details', 'Qty', 'Price', 'Amount(INR)'];
      const rows = purchaseIds.map((purchaseId: any, index: number) => {
        const product = invoiceData.productdetails[index];
        const amount = product.count * parseFloat(product.cost_per_unit);
        const gstAmount = (amount * parseFloat(invoiceData.gst)) / 100;
  
        return [
          (index + 1).toString(),
          purchaseId,
          product.product_name,
          product.count.toString(),
          parseFloat(product.cost_per_unit).toFixed(2),
          amount.toFixed(2),
        ];
      });
  
      const totalAmount = rows.reduce((sum: number, row: any[]) => sum + parseFloat(row[5]), 0);
      const gstAmount = (totalAmount * parseFloat(invoiceData.gst)) / 100;
      const sgst = gstAmount / 2;
      const cgst = gstAmount / 2;
      const igst = gstAmount;
  
      // Add rows for SGST, CGST, IGST, and Total Amount
      rows.push(['', '', '', '', 'SGST(9%)', invoiceData.sgst_amount]);
      rows.push(['', '', '', '', 'CGST(9%)', invoiceData.cgst_amount]);
      rows.push(['', '', '', '', 'IGST(18%)', invoiceData.igst_amount]);
      rows.push(['', '', '', '', 'Total Amount', invoiceData.total]);

  
      // Display bank details in a separate table below the product details
    
  
      (pdf as any).autoTable({
        head: [columns],
        body: rows,
        startY: 70,
      });
      const bankDetails = 
  
      (pdf as any).autoTable({
        // head:['NEFT Information'],
        body: [
          ['Bank Name', invoiceData.bank_name],
          ['Account Number', invoiceData.account_number],
          ['IFSC Code', invoiceData.ifsc_code],
          ['PAN No', invoiceData.pan_number],
          ['GST No', invoiceData.gst_number],


        ],
        startY:( pdf as any).autoTable.previous.finalY + 10,
        theme: 'grid',
      });
      pdf.setFontSize(12);

          // Add the lines of text after the tables
    pdf.text('Pathbreaker IT Technologies PVT LTD', 10, (pdf as any).autoTable.previous.finalY + 20);
    pdf.text('Authorized Signature', 10, (pdf as any).autoTable.previous.finalY + 25);
    pdf.text('Place: Hyderabad', 10, (pdf as any).autoTable.previous.finalY + 30);


  
  
      pdf.save(invoiceData.invoice_no.pdf);
    });
  }
  
  


  downloadpdf1(){
    this.route.navigate(['/nav'])

  }

   
  addinvoice() {
      this.route.navigate(['/invoice'])
  }
  edit(id: string) {
    this.route.navigate(['/invoice', id])
  }
  getinvoice() {
    this.getinvoicedata = this.apiserviceservice.viewinvoice().subscribe(
      (data: any) => {
        console.log(data)
        this.invoicedetails = data.data;
        this.allinvoicedata = data.data;
        this.totalCount = this.getinvoicedata.length;
      },
      (error: any) => {
        // Handle error here if needed
      }
    );
  }
  
  
  downloadpdf(id:any){
  this.apiserviceservice.invoiceslip(id).subscribe((data:any)=>{
    this.downloaddetails =data.data
  })
  }
  deleteinvoice(id:any){
 this.apiserviceservice.deleteinvoice(id).subscribe((data:any) =>{
    this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: ' Deleted Successfully' });
    this.getinvoice()
  }

)}
}
