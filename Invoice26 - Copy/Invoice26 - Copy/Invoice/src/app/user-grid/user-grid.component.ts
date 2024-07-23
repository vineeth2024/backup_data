import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormArray,FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ConfirmationService,MessageService } from 'primeng/api';
@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit {
  productForm:any
  searchText: any
  items: MenuItem[] | undefined;
  getuserdata: any;
  userdetails: any[] = [];
  alluserdata: any;
  totalCount = 0
  isAscendingSort: boolean = true;
  isAscendingSort1: boolean = true;
  isAscendingSort2: boolean = true;
  page = 1;
  displayDialog: boolean = false;

  pageSize = 10;
  p = 1;
  sortedColumn: string = '';
  sortDirection: number = 1; // 1 for ascending, -1 for descending
  sort(column: string) {
    if (this.sortedColumn === column) {
      this.sortDirection *= -1;
    } else {
      this.sortedColumn = column;
      this.sortDirection = 1;
    }
  }
  compareValues(a: any, b: any) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  }
  


  constructor(
    private route:Router,
    private apiserviceservice:ApiServiceService,
    private confirmationservice:ConfirmationService,
    private messageservice:MessageService
  ) { }

  ngOnInit(): void {
    this.getUser()
    this.items = [{ label: 'Dashboard', routerLink:'/dashboard' }, { label: 'User' }];

    
  }
  pageChange(event: number) {
    this.page = event;
     this.getUser()
   }
   toggleSorting() {
     this.isAscendingSort = !this.isAscendingSort;
     // Implement your sorting logic here based on the current sorting state.
   }
   toggleSorting1() {
     this.isAscendingSort1 = !this.isAscendingSort1;
     // Implement your sorting logic here based on the current sorting state.
   }
   toggleSorting2() {
     this.isAscendingSort2 = !this.isAscendingSort2;
     // Implement your sorting logic here based on the current sorting state.
   }
   clear(){

    sessionStorage.clear()
    this.route.navigate(['/login'])
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

   confirm2() {
    this.confirmationservice.confirm({
        message: 'Are you sure Do you want to Logout ?',
        header: 'Logout Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.clear()
        },
        reject: (type: any) => {
            // switch(type) {
            //     case ConfirmEventType.REJECT:
            //         this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
            //     break;
            //     case ConfirmEventType.CANCEL:
            //         this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
            //     break;
            // }
        }
    });
}
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.userdetails = this.alluserdata;
    }
    else {
      this.userdetails = this.alluserdata.filter(
        (user: any) =>
          (user.email && user.email.toLowerCase().includes(filterValue)) ||
          (user.role && user.role.toLowerCase().includes(filterValue))

      );
    }
  }
   
    adduser() {
      this.route.navigate(['/user'])
  }
  edit(id: string) {
    this.route.navigate(['/user', id])
  }
  getUser() {
    this.getuserdata = this.apiserviceservice.viewuser().subscribe(
      (data: any) => {
        this.userdetails = data.data;
        this.alluserdata = data.data;
        this.totalCount = this.getuserdata.length;
      },
      (error: any) => {
        // Handle error here if needed
      }
    );
  }
  deleteproduct(id:string,val:string){

    this.apiserviceservice.deleteuser(id).subscribe((data:any)=>{
      
      (data: any) => {

        console.log(data)
        this.messageservice.add({ severity: 'success', summary: 'Success Message', detail: 'Product Deleted Successfully' });
        this.getUser()
      }

  })
}
}


