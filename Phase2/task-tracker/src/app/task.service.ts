import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks_obj = {}
  tasks_dict:any = null

  constructor(public http:HttpClient) { }

  postTask(task:any){
    this.http.post("http://localhost:3000/tasks",task).subscribe(result=>console.log(result))
  }

  deleteTask(task:any){
    this.http.delete(`http://localhost:3000/tasks/${task.id}`).subscribe(result=>console.log(result))
  }

  async getTask(){
    let resp = await this.http.get<Observable<Task[]>>("http://localhost:3000/tasks").toPromise()
    console.log("Here is the resp")
    console.log(resp)
    console.log("---DONE in GET----")
    return resp
  }
}
