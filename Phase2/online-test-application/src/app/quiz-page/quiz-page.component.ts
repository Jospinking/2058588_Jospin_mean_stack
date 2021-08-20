import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css'],
  providers: [QuizService]
})
export class QuizPageComponent implements OnInit {

  constructor(public service:QuizService) { }

  // Fields ---
  data_obj:any = {}

  user_score:Array<any> = []

  async ngOnInit() {
    await this.loadData()
    this.service.prepData()
  }

  async loadData(){
    await this.service.loadQuizDetails().then(data=>{
        this.data_obj = data;
        console.log(this.data_obj)
      })
    // this.service.loadQuizDetails().subscribe(data=>{
    //   this.data_obj = data;
    //   console.log(this.data_obj)
    // })
    console.log("--- DONE Loading Data ---")
    console.log(this.data_obj)
    this.service.setData(this.data_obj)
    console.log(this.service.quizData)
    console.log("*****************************")
  }

  update_score(label_content:string,question_idx:number){
    console.log("Testing")
    // We need to set the value
    let choice_letter = label_content.substr(0,1)

    if(this.service.user_selection.length == 0){
      this.service.user_selection.push([question_idx,choice_letter])
    }
    else{
      // check user selections
      for(let i = 0; i < this.service.user_selection.length; i++){
        if(question_idx ==  this.service.user_selection[i][0]){
          console.log("Found it")
          // now we need to replace with the new selection
          this.service.user_selection[i][1] = choice_letter
          break
        }
        else if(i == this.service.user_selection.length - 1 && question_idx !=  this.service.user_selection[i][0]){
          // didn't find it
          console.log("Didn't find it")
          this.service.user_selection.push([question_idx,choice_letter])
        }
      }

    }
    
    // sort the array by question order -- sort by the first column
    this.service.user_selection = this.service.user_selection.sort(function(a,b){
      return a[0]-b[0]
    })
    console.log(this.service.user_selection)
  }
  score(){
    //assert(this.service.user_selection.length == this.service.solutions.length);

    this.document_highlightAnswers()

    console.log("******** SCORING ************")
    console.log("Scoring the following selections!" + this.service.user_selection)
    let user_score = 0
    for(let i = 0; i < this.service.user_selection.length; i++){
      if(this.service.user_selection[i][1] == this.service.solutions[i]){
        user_score++
      }
    }
    user_score /= this.service.user_selection.length
    if(user_score >= 0.7){
      console.log("Passed!")
      this.user_score = ["Passed!",user_score*100,user_score*this.service.user_selection.length,this.service.solutions.length,"green"]
    }
    else if(user_score < 0.7){
      this.user_score = ["Failed!",user_score*100,user_score*this.service.user_selection.length,this.service.solutions.length,"red"]
    }
    this.service.test_scored = true
  }

  document_highlightAnswers(){
    for(let q = 0; q < this.service.questions.length; q++){
      for(let c = 0; c < this.service.choices[q].length;c++){
        let el = document.getElementById(`choice_${q}_${c}`);
        let choice = el?.textContent?.substr(0,1)
        let user_choice = this.service.user_selection[q][1]

        if(choice == user_choice || choice == this.service.solutions[q]){
          if(user_choice == this.service.solutions[q] || choice == this.service.solutions[q]){
            el!.style.border = "5px solid green";
          }
          else if(user_choice != this.service.solutions[q]){
            el!.style.border = "5px solid red";
          }
        }
      }
    }
  }
}
