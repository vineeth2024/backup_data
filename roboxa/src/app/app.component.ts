import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'roboxa';
  forgotPassword:boolean = false;
  enableFields: boolean = false;
  showPassword: boolean = false;
  showPasswordc: boolean = false;
  // @ViewChild('myModal') myModal: any;
  disableFields: boolean = false;
  emailvalue: any;
  emailvaluef: any;
  valid: boolean = false;
  // constructor(private admin: AdminService, private route: Router, private formBuilder: FormBuilder,
    // private messageService: MessageService, private elementRef: ElementRef,private renderer: Renderer2) { }

  loginForm!: FormGroup;
  forgetForm!: FormGroup;
  submitted = false;
  formBuilder: any;


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      otp: [''],

    },
    );
    this.forgetForm = this.formBuilder.group({
      email1: ['', [Validators.required, Validators.email]],
      otp: [''],
      npassword: ['', [Validators.required, Validators.minLength(8)]],
      // npassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
      {
        validators: password1('npassword', 'confirmPassword')
      })

  }
}
function password1(arg0: string, arg1: string) {
  throw new Error('Function not implemented.');
}

