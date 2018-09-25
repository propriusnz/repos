import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
//import { debug } from '../../../../../devUtils.js';

import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FinishQuizComponent } from './finish-quiz/finish-quiz.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuestionObj, QuestionInfo } from '../../../../../../../models/HomeworkResourceModel';
import { ResourceRepositoryService } from '../../../../../../../services/repositories/resource-repository.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css']
})
export class MultipleChoiceComponent implements OnInit {
  formValidation: string[];

  options: any;
  // viewer type
  @Input() viewerType: string;
  // access type
  @Input() accessType: string;

  // Question Id
  @Input() questionId: number;
  // question status: init, unsaved, saved
  @Input() questionStatus: string;
  // Question information
  @Input() questionInfo: any;
  // function to create question object
  @Input() createQuizObj: Function;

  // get question value
  @Output() collectFormValue: EventEmitter<object> = new EventEmitter<object>();
  // return question id for editing
  @Output() editQuiz: EventEmitter<number> = new EventEmitter<number>();
  // return delete information
  @Output() deleteQuiz: EventEmitter<number> = new EventEmitter<number>();
  // return question id for discarding
  @Output() discardQuiz: EventEmitter<number> = new EventEmitter<number>();
  // move question position up
  @Output() upQuestion: EventEmitter<number> = new EventEmitter<number>();
  // move question position down
  @Output() downQuestion: EventEmitter<number> = new EventEmitter<number>();
  // display answer
  displayAnswer: boolean = false;

  quizArray: any[] = [];
  questionForm: FormGroup;
  shuffledResult: any[];
  str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  ansArray: any[] = [];
  finalArray: any[] = [];
  questionNotAns: number[] = [];
  inputAns: any[] = [];
  correctAns: any[] = [];
  //quizForm: FormGroup;

  showAnsSignalSubscription: Subscription;


  // create form for question
  createForm() {
    console.log("Start to create form for: " + this.viewerType);
    if (this.viewerType == "tutor") {
      if (this.questionStatus == "init") {
        // fired when a new question is added
        //debug("info", "Find init question");
        this.questionForm = this.fb.group({
          questionTitle: [''],
          questionType: ['multi'],
          questionOption: this.fb.array([]),
          questionText: ['', Validators.required],
        });
        for (let i = 0; i < 2; i++) {
          this.addOption();
        }
      } else if (this.questionStatus == "saved" && this.questionInfo.questionSaveStatus == "unSaved") {
        // fired when a question is required to be edited
        //debug("info", "Find unSaved question");
        this.questionForm = this.fb.group({
          questionTitle: [''],
          questionType: ['multi'],
          questionOption: this.fb.array([]),
          questionText: ['', Validators.required],
        });

        for (const i in this.questionInfo.questionContent.questionOption) {
          console.log(this.questionInfo);

          const data = this.questionInfo.questionContent.questionOption[i];
          let options = this.questionForm.get('questionOption') as FormArray;
          options.push(this.fb.group({
            correct: data.correct,
            choiceText: [data.choiceText, Validators.required]
          }));
          //this.setFormArrayValue(data);
        }
        for (const field in this.questionForm.controls) { // 'field' is a string
          if (field != "questionOption") {
            this.questionForm.controls[field].setValue(this.questionInfo.questionContent[field]);
          }
        }
      }
    } else if (this.viewerType == "learner") {
      console.log(this.questionInfo);
      console.log("Creating form for LEARNER!!!!!");

      this.questionForm = this.fb.group({
        result: this.fb.group({
          ans: this.fb.array([

    ]),
    questionId: this.questionInfo.questionId
        })
      });
      console.log("fsdafdsafasdf",this.questionForm.value);
      for (var i = 0; i < this.questionInfo.questionContent.questionOption.length; i++) {
        this.ans.push(this.initAns(i));
        //console.log(this.ans);
      }
    }

  }

  addOption(): void {
    let options = this.questionForm.get('questionOption') as FormArray;
    if (options.length >= 5) {
      alert("the maximum choices is 5!");
    } else {
      options.push(this.fb.group({
        correct: [false],
        choiceText: ['', Validators.required]
      }));
    }


  }

  deleteOption() {
    let rows = this.questionForm.get('questionOption') as FormArray;
    console.log(rows.length);
    if (rows.length <= 2) {
      alert("must be at least two choices!");
    } else {
      rows.removeAt(rows.length - 1);
    }
  }

  constructor(private fb: FormBuilder, private dialog: MatDialog,private resourceRepositoryService: ResourceRepositoryService) {

    // debug("info", "Constructor will create form!!!");

    //this.createForm();


  }

  ngOnInit() {
    console.log(this.viewerType);
    if (this.viewerType == "learner") {
      console.log("learner quiz!");
      this.choiceShuffle();
      this.getQuizAns();
      this.createForm();
      //this.addQuestion();
    } else {
      this.createForm();
    }

    this.showAnsSignalSubscription = this.resourceRepositoryService.answerSignal.subscribe(
      msg => {
        if(Object.keys(msg).length != 0) {
          console.log(" receives signal");
          console.log(msg);
          this.collectAnswer();
        }
      }
    );

  }

  // save question
  saveQuestion() {
    this.formValidation = [];
    let options = this.questionForm.get('questionOption') as FormArray;
    let toReg = options.getRawValue().map(function(obj) {
      return obj.correct;
    });
    if (!toReg.includes(true)) {
      alert("choices must be at least one true ans!");
      this.formValidation.push("choices must be at least one true ans!");
      return

    }
    if (!toReg.includes(false)) {

      alert("choices must be at least one false ans!");
      this.formValidation.push("choices must be at least one false ans!");
      return
    }


    if (this.questionForm.status === "VALID") {
      let quiz = {
        type: '',
        quizContent: {}
      };

      if (this.questionStatus == "init") {
        this.questionInfo = this.createQuizObj("multi", this.questionId, this.questionForm.value);
        quiz.type = "new";
      } else if (this.questionStatus == "saved") {
        if (this.questionInfo.questionSaveStatus == "unSaved") { // edit question
          this.questionInfo = this.createQuizObj(
            "multi",
            this.questionInfo.questionId,
            this.questionForm.value);
          quiz.type = "existed";
        }
      }
      this.questionInfo.questionSaveStatus = 'saved';
      quiz.quizContent = this.questionInfo;

      this.collectFormValue.emit(quiz);
    } else {
      alert("New question is not saved!!");
    }
  }

  editQuestion() {
    let i = this.questionInfo.questionId;
    this.editQuiz.emit(i);
  }

  // delete question
  deleteQuestion() {
    this.deleteQuiz.emit(this.questionInfo.questionId);
  }

  // discard uncompleted questions
  discardQuestion() {
    if (this.questionStatus == "init") {
      if (this.questionId == 1) {
        // empty the init question form if no questions are saved
        this.questionForm.reset();
      } else {
        this.discardQuiz.emit(this.questionId);
      }
    } else if (this.questionStatus == "saved") {
      this.discardQuiz.emit(this.questionInfo.questionId);
    }
  }

  // show answer
  displayOrHideAnswer() {
    this.displayAnswer = !this.displayAnswer;
  }

  getQuizAns() {

    //for (var i = 0; i < this.quizArray.length; i++) {
      //console.log(i);
      var questionId = this.questionInfo.questionId;
      //console.log(this.quizArray[i].questionId);
      var ans: string[] = [];
      for (var n = 0; n < this.questionInfo.questionContent.questionOption.length; n++) {
        if (this.questionInfo.questionContent.questionOption[n].correct == true)
          ans.push(this.questionInfo.questionContent.questionOption[n].choiceText);
      }
      this.ansArray.push({ questionId: questionId, ans: ans });
      //console.log(this.ansArray);
    //}

    //return this.ansArray;
  }

  initQuestion() {
    return new FormGroup({
      //questionTitle: new FormControl(this.questionInfo.questionContent.questionTitle),
      //questionText: new FormControl(this.questionInfo.questionContent.questionText),
      questionId: new FormControl(this.questionInfo.questionId),
      ans: new FormArray([

      ])
    });
  }

  addQuestion() {
    const control = this.questionForm.get('result');
    //for (var i = 0; i < this.quizArray.length; i++) {
      control.setValue(this.initQuestion());
      //console.log("hhhh", this.questionForm.value);

      this.addAns()
    //}
  }


  addAns() {
    const formControl = this.questionForm.get('result');
    console.log("hhhh",formControl.get('questionId'));

    const control = <FormArray>formControl.get('questionId');
    console.log("aa",control);
    for (var i = 0; i < this.questionInfo.questionContent.questionOption.length; i++) {
      //control.push(this.initAns(i));

    }
  }

  initAns(i) {
    return new FormGroup({
      option: new FormControl(this.questionInfo.questionContent.questionOption[i].choiceText),
      correct: new FormControl(false),
      //ans: new FormControl(this.questionInfo.questionContent.questionOption[i].correct)
    });
  }


  collectAnswer() {
    this.questionNotAns = [];
    const userAnsArray = this.questionForm.value;
    console.log(userAnsArray);
    const finalArray: any[] = [];
    var userAns: any[] = [];
    var questionId = userAnsArray.result.questionId;
    for (var n = 0; n < userAnsArray.result.ans.length; n++) {
      if (userAnsArray.result.ans[n].correct == true) {
        userAns.push(userAnsArray.result.ans[n].option);
        this.inputAns.push(userAnsArray.result.ans[n].option);

          console.log("inputAns:",this.inputAns);
      }
    }
    if (userAns.length == 0) {
      this.questionNotAns.push(questionId);
    }
    finalArray.push({ questionId: questionId, ans: userAns });
    this.finalArray = finalArray;
    console.log(this.finalArray);
    this.checkAnswer();

    /*
    const finalArray: any[] = [];
    //console.log(userAns)
    for (var i = 0; i < userAnsArray.result.length; i++) {
      var userAns: any[] = [];
      var questionId = userAnsArray.result[i].questionId;
      //console.log(userAnsArray.result[i].ans.length)
      for (var n = 0; n < userAnsArray.result[i].ans.length; n++) {
        if (userAnsArray.result[i].ans[n].correct == true) {
          userAns.push(userAnsArray.result[i].ans[n].option);
          this.inputAns.push(userAnsArray.result[i].ans[n].option);
          //  console.log(userAns)
        }
      }
      if (userAns.length == 0) {
        this.questionNotAns.push(i);
      }
      finalArray.push({ questionId: questionId, ans: userAns });
    }
    if (this.questionNotAns.length != 0) {
    }
    this.finalArray = finalArray;
    this.checkAnswer();
    */
  }

  checkAnswer() {
    /*
    var score = 0;
    for (var i = 0; i < this.finalArray.length; i++) {
      if (this.finalArray[i].questionId == this.ansArray[i].questionId) {
        if (this.isEqArrays(this.finalArray[i].ans, this.ansArray[i].ans)) {
          this.correctAns.push(this.ansArray[i].ans);
          score++;
        }
      }
    }
    const dialogRef = this.dialog.open(FinishQuizComponent, {

      data: { score, total: this.quizArray.length }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      this.displayAnswer = true;
      $("input").prop("disabled", true);
    });*/
    this.displayAnswer = !this.displayAnswer;
    if(this.displayAnswer==true){
      $("input").prop("disabled", true);
    }else{
      this.refleshQuiz();
    }
  }

  isInArray(a, e) {
    for (var i = a.length; i--;) {
      if (a[i] === e) return true;
    }
    return false;
  }

  isEqArrays(a1, a2) {
    if (a1.length !== a2.length) {
      return false;
    }
    for (var i = a1.length; i--;) {
      if (!this.isInArray(a2, a1[i])) {
        return false;
      }
    }
    return true;
  }


  getQuestion(form) {
    return form.controls.result.controls;
  }

  getOptionContent(form) {
    return form.controls.ans.controls;
  }

  get ans() {
    return this.questionForm.get('result').get('ans') as FormArray;
  }


  choiceShuffle() {
    var i;
  //var quizArray = this.questionInfo;
    //for (let quiz of quizArray) {
      for (i = 0; i < this.questionInfo.questionContent.questionOption.length; i++) {
        this.questionInfo.questionContent.questionOption = this.shuffle(this.questionInfo.questionContent.questionOption);
      }
      //this.quizArray = quizArray;
    //}
  }

  shuffle(array) {
    var m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = array[m];
      //console.log("origin",array[m]);
      array[m] = array[i];
      //console.log(array[m]);
      array[i] = t;
    }
    this.shuffledResult = array;
    //console.log(this.shuffledResult);
    return array;
  }
  // up question
  moveQuestionUp() {
    this.upQuestion.emit(this.questionInfo.questionId);
  }

  // down question
  moveQuestionDown() {
    this.downQuestion.emit(this.questionInfo.questionId);
  }

  refleshQuiz() {
    $("input").prop("disabled", false);
    this.ansArray = [];
    this.finalArray = [];
    this.questionNotAns = [];
    this.inputAns = [];
    this.correctAns = [];
    this.displayAnswer = false;
    this.choiceShuffle();
    this.getQuizAns();
    this.createForm();
    //this.addQuestion();
  }
}
