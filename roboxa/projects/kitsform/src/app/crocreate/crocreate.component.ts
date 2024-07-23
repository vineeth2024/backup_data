import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crocreate',
  templateUrl: './crocreate.component.html',
  styleUrls: ['./crocreate.component.css']
})
export class CrocreateComponent {
  public CroForm: FormGroup = new FormGroup({
    cro_code: new FormControl("", [Validators.required]),
    cro_name: new FormControl("", [Validators.required]),
    legal_cro_name: new FormControl("", [Validators.required]),
    address_1: new FormControl("", [Validators.required]),
    address_2: new FormControl(""),})}
