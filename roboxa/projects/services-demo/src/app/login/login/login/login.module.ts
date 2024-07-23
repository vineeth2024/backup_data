import { NgModule } from '@angular/core';
import { LoginComponent } from '../login.component';
import { CaptchService } from '../captch.service';



@NgModule({
  declarations: [LoginComponent],
  providers:[CaptchService]
  
})
export class LoginModule { }
