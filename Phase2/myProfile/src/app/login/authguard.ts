import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(){}

    canActivate(){
        console.log("** AuthGuard Check **")
        // Get the token
        let token = sessionStorage.getItem("login_token")
        if(token){
            console.log("AuthGuard Passed!")
            return true
        }else{
            console.log("AuthGuard Failed!")
            return false
        }
    }
}