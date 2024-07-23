import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-passwords-list',
  templateUrl: './passwords-list.component.html',
  styleUrls: ['./passwords-list.component.css']
})
export class PasswordsListComponent {

  searchText: any
  items: MenuItem[] | undefined;
  totalCount = 0
  page = 1;
  pageSize = 10;
  displayDialog: boolean = false;
  passwordsDetails: any[] = [];
  isEdit: boolean= false
  allpasswords: any;

  constructor(
    private router:Router,
    private apiservice:ApiService,
  ) { 
    this.viewpasswords();
  }

  ngOnInit(): void {

    // this.apiservice.viewpasswords().subscribe((data: any) => {
    //   this.passwordsDetails = data;
    //   this.allpasswords = data;
    //   console.log(data);
    // });
  }
  pageChange(event: number) {
    this.page = event;
     this.viewpasswords()
   }
   viewpasswords() {
    this.apiservice.viewpasswords().subscribe((data: any) => {
      
      this.passwordsDetails = data.map((password: any) => {
        if (password.domainResponseView) {
          password.type="Domain";
          password.moduleName = password.domainResponseView.domainName;
        } else if (password.hostingResponseView) {
          password.type="Hosting";
          password.moduleName = password.hostingResponseView.hostingProvider;
        } else if (password.itReturnsResponseView) {
          password.type="It Returns";
          password.moduleName = password.itReturnsResponseView.serviceType;
        } else {
          password.type="None";
          password.moduleName = "N/A";
        }
        return password;
      });
      this.passwordsDetails = data.filter((password: any) => password.daysLeft && password.daysLeft <= 7);
      this.allpasswords = data;

      this.totalCount = this.passwordsDetails.length;
      
    });
  }

  showDialog() {
    this.displayDialog = true;
  }
  cancelLogout() {
    this.displayDialog = false;
  }
  logout() {
    
    alert('Logging out...');
    this.displayDialog = false;
    this.router.navigate(['/login'])
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
  
    if (!filterValue) {
      this.passwordsDetails = this.allpasswords; // Reset to the original list if the filter is empty
    } else {
      this.passwordsDetails = this.allpasswords.filter((password: any) => {
        const userNameString = password.userName?.toString().toLowerCase();
        const registrationDateString = password.registrationDate?.toString().toLowerCase();
        const expiryDateString = password.expiryDate?.toString().toLowerCase();
        const passwordString = password.password?.toString().toLowerCase();
        const daysLeftString = password.daysLeft?.toString().toLowerCase();

  
        return (
          userNameString?.includes(filterValue) ||
          registrationDateString?.includes(filterValue) ||
          expiryDateString?.includes(filterValue) ||
          passwordString?.includes(filterValue) ||
          daysLeftString?.includes(filterValue)
        );
      });
    }
  }
  
}
