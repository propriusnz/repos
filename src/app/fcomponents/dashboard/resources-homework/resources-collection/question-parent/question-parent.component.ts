import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Subscription } from 'rxjs';

import { ResourceRepositoryService } from '../../../../../services/repositories/resource-repository.service';
import { QuestionUtility } from './question-utility';

@Component({
  selector: 'app-question-parent',
  templateUrl: './question-parent.component.html',
  styleUrls: ['./question-parent.component.css']
})
export class QuestionParentComponent implements OnInit {

  questionArray: any[] = [];
  selectQuestionType:string;

  constructor(
    private resourceRepositoryService: ResourceRepositoryService
  ) {}

    accessPropertySubscription: Subscription;
    resourcesDataSignalSubject: Subscription;

    signalPropertySubscription: Subscription;
    questionArraySubscription: Subscription;

    // all question data for show
    @Input() questionData: any;

    // viewer type (tutor or learner)
    viewerType: string;
    // access type (modify or display)
    accessType: string;

    // array to store all questions

    questionCtrl: QuestionUtility;
    // total number of allowed questions
    questionAllowedNum: number = 20;

    @Input() mode:string;
    @Input() userType:string;

    ngOnInit() {
      if (this.questionData != undefined) {
        console.log("<<MultipleChoices Parent>> receives question collection:");
        console.log(typeof this.questionData);
        if (typeof this.questionData !== "object"){
          this.questionData = JSON.parse(this.questionData);
        }
        console.log("after", typeof this.questionData);

        this.questionArray = this.questionData;
      }

      // get access properties
      this.accessPropertySubscription = this.resourceRepositoryService.accessProperty.subscribe(
        msg => {
          if(Object.keys(msg).length != 0) {
            console.log("<<MultipleChoices Parent>> receives access message:");
            console.log(msg);
            this.viewerType = msg['viewerType'];
            this.accessType = msg['op'];
            console.log("ViewerType is: " + this.viewerType);
            console.log("AccessType is: " + this.accessType);
          }
        }
      );

      // handling signal
      this.resourcesDataSignalSubject =this.resourceRepositoryService.resourcesDataSignal.subscribe(
        res => {
          if(Object.keys(res).length != 0) {
            console.log('parent received signal...');
            console.log(res);
            let op = res['op'];
            if(op == 'request') { // is required to prepare and send data
              this.resourceRepositoryService.sendResourcesData(JSON.stringify(this.questionArray), { info: 'success', postType: 2 });
            }
          }
        }
      );
    }

    ngOnDestroy(): void {
      console.log("<<MultipleChoicesParentComponent>> [ngOnDestroy]");
      this.resourceRepositoryService.clearQuestionSourceSubject();
      this.accessPropertySubscription.unsubscribe();
    }

    // get prepared question object
    getQuestionObj(type: string, id: number, content: object) {
      this.questionCtrl = new QuestionUtility();
      return this.questionCtrl.prepareQuestionInfo(type, id, content);
    }

    // add question
    addQuestion(type) {
      if (this.questionArray.length === 0) {
        console.log("Please finish the uncompleted questions!!!!");
        this.selectQuestionType = type;
      } else {
        if (this.questionArray.length < this.questionAllowedNum) {
          if (this.questionArray[this.questionArray.length - 1].questionSaveStatus == "init") {
            alert("Please complete uncompleted question!!!");
          } else {
            var newQuizObj;
            if(type=="multi"){
              newQuizObj = this.getQuestionObj("multi", this.questionArray.length + 1, {});
            }
            if(type=="short"){
              newQuizObj = this.getQuestionObj("short", this.questionArray.length + 1, {});
            }
            if(type=="blank"){
              newQuizObj = this.getQuestionObj("blank", this.questionArray.length + 1, {});
            }
            newQuizObj.questionSaveStatus = "init";
            this.questionCtrl = new QuestionUtility();
            this.questionCtrl.addQuestion(this.questionArray, newQuizObj);
          }
        } else {
          alert("Can't add more questions...");
        }
      }
    }

    // handle question save
    handleSaveQuestion(questionObj) {
      if (questionObj.type == "new") {
        // remove pre insert question content
        this.questionArray.splice(-1, 1);
        // push question content to question array
        this.questionCtrl = new QuestionUtility();
        this.questionCtrl.addQuestion(this.questionArray, questionObj.quizContent);
      } else if (questionObj.type == "existed") {
        this.questionArray[questionObj.quizContent.questionId - 1] = questionObj.quizContent;
      }
    }

    // handle question edit
    handleEditQuestion(questionId: number) {
      // change question save status
      this.questionCtrl = new QuestionUtility();
      this.questionCtrl.changeQuestionStatus(this.questionArray, questionId, "unSaved");
    }

    // handle question delete
    handleDeleteQuestion(questionId: number) {
      this.questionCtrl = new QuestionUtility();
      this.questionCtrl.deleteQuestion(this.questionArray, questionId);
    }

    // handle question discard
    handleDiscardQuestion(questionId: number) {
      this.handleDeleteQuestion(questionId);
    }

    // handle question change position
    handleQuestionChangePosUp(questionId: number) {
      this.questionCtrl = new QuestionUtility();
      this.questionCtrl.questionUp(this.questionArray, questionId);
    }

    // handle question change position
    handleQuestionChangePosDown(questionId: number) {
      this.questionCtrl = new QuestionUtility();
      this.questionCtrl.questionDown(this.questionArray, questionId);
    }

    // display or show add question button
    displayAddQuizBtn() {
      this.questionCtrl = new QuestionUtility();
      return this.questionCtrl.hideOrDisplayAddBtn(this.questionArray);
    }

    showAns(){
      console.log("sending show answer signal");
      this.resourceRepositoryService.requestShowAns();
    }

}
