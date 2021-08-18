import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms'
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token_size:number = 10;
  token_dict:string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  loginRef = new FormGroup({
    username:new FormControl(),
    password:new FormControl()
  })
  msg:string = ''
  constructor(public router:Router) { }

  ngOnInit(): void {
  }


  getIndexBetween(min:number,max:number){
    return Math.round(Math.random() * (max - min) + min)
  }

  generate_token():string{
    let token:string = "";
    for(let i=0; i < this.token_size; i++){
      let idx:number = this.getIndexBetween(0,this.token_dict.length - 1)
      console.log(idx + " ---> " + this.token_dict[idx])
      token = token.concat(this.token_dict[idx])
    }
    return token
  }

  checkCredentials(){
    if(!sessionStorage['username']){
      this.msg = "No Credentials!"
    }
    else{
      console.log("Found Creds")
    }
    if(this.loginRef.value['username'] == null || this.loginRef.value['password']== null){
      this.msg = "Invalid Credentials"
    }
    
    let stored_username:string = sessionStorage['username']
    let stored_password:string = sessionStorage['password']

    let attempted_username:string = this.loginRef.value['username']
    let attempted_password:string = this.loginRef.value['password']

    if(attempted_username == stored_username && attempted_password == stored_password){
      console.log("Credentials Matched!")
      console.log("Generated Login Token!")
      let token = this.generate_token()
      sessionStorage.setItem("login_token",token)
      this.router.navigate(['../portfolio'])
    }

  }

  redirectRegistration(){
    this.router.navigate(['create'])
  }

}
