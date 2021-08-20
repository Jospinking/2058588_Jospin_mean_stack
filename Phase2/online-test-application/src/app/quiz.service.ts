import {HttpClient} from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Quiz } from "./quiz.model";

@Injectable({
    providedIn: 'root'
})
export class QuizService{
    quizData = {}

    // -- JSON Content Arrays --
    questions:Array<string> = []
    choices:Array<Array<string>> = []
    solutions:Array<string> = []

    // -- User Choices --
    user_selection:Array<Array<any>> = []
    test_scored:boolean = false

    constructor(public http:HttpClient){}

    async loadQuizDetails():Promise<Observable<Quiz[]>>{
        let resp =  await this.http.get<Observable<Quiz[]>>("/assets/data.json").toPromise();
        console.log("HERE IS THE RESP")
        console.log(resp)
        console.log("^^^^^^^^^^^^^^^^^")
        return resp
    }

    setData(data_obj:any){
        console.log(data_obj)
        this.quizData = data_obj
        console.log("done")
    }

    async getData(){
        return this.quizData
    }

    showData(){
        console.log((this.quizData))
        this.prepData()
        console.log(this.choices)
    }

    prepData(){
        let data = JSON.stringify(this.quizData)
        let json_data = JSON.parse(data)
        let num_questions = json_data["questions"].length

        for(let idx=0; idx < num_questions; idx++){
            let question_details = json_data["questions"][idx]
            this.questions.push(question_details["question"])
            this.choices.push(question_details["choices"])
            this.solutions.push(question_details['solution'])
        }
    }
}