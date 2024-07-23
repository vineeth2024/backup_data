import { Component } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  otp: string | undefined;

  verifyOTP() {
    if (this.otp === '1234') {
      // OTP is valid, navigate to a success page or the main application.
      // You can use Angular Router to navigate.
      alert('OTP verification successful'); // Replace with your logic.
    } else {
      alert('Invalid OTP. Please try again.');
    }
  }
}
