import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  fname:FormControl = new FormControl()
  lname:FormControl = new FormControl()
  username:FormControl = new FormControl()
  password:FormControl = new FormControl()

  registrationRef = new FormGroup({
    fname:this.fname,
    lname:this.lname,
    username:this.username,
    password:this.password
  })
  msg:string = ""

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  clearForm():void{
    this.fname.setValue("")
    this.lname.setValue("")
    this.username.setValue("")
    this.password.setValue("")
  }

  registerAccount(){
    console.log("Registering acount...")
    sessionStorage.setItem("fname",this.registrationRef.value['fname'])
    sessionStorage.setItem("lname",this.registrationRef.value['lname'])
    sessionStorage.setItem("username",this.registrationRef.value['username'])
    sessionStorage.setItem("password",this.registrationRef.value['password'])
    this.clearForm()
    this.msg = "Account Registered!"
    // this.router.navigate(['../login'])
  }

}
