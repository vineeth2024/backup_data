import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-viewpdf',
  templateUrl: './viewpdf.component.html',
  styleUrls: ['./viewpdf.component.css']
})
export class ViewpdfComponent implements OnInit {
id:any
invoicedettails: any // Define this array to hold your API data
constructor(
    private apiservice:ApiServiceService,
    private activatedroute:ActivatedRoute,
    private route:Router

  ) { }

  ngOnInit(): void {
      this.activatedroute.params.subscribe(params => {
        this.id = params['id']; 
  
      // Now, you can make the API call.
      this.apiservice.invoiceslip(this.id).subscribe((data: any) => {
        this.invoicedettails = data;
        console.log(data);
      });
    });
  }
 
    
}

