import { Component, OnInit, Input } from '@angular/core';
import { LearnerService } from '../../../services/servercalls/learner.service';
import { Title } from '@angular/platform-browser';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

export interface courseList {
  courseName: string;
  selected: boolean;

}
@Component({
  selector: 'app-new-user-welcome',
  templateUrl: './new-user-welcome.component.html',
  styleUrls: ['./new-user-welcome.component.css']
})
export class NewUserWelcomeComponent implements OnInit {
  selected1 = '';
  YearLevel = false;
  CoursePage = false;
  highCourse = true;
  uniCourse = false;
  namePage = true;
  addLearner = false;
  maxLearner = false;

  options: FormGroup;

  isFirstLearner = true;

  afterNumber={
    1:"first", 2:"second", 3:"third", 4:"fourth"
  }

  max_learner = 4;
  learner_num = 1;
  isMaxLearner = false;

  nameFormControl: FormControl = new FormControl('', [Validators.required]);
  yearLevelControl: FormControl = new FormControl('', [Validators.required]);

  selectedCourse = [];
  courses: courseList[] = [
    { courseName: 'Math', selected: false, },
    { courseName: 'English', selected: false, },
    { courseName: 'Science', selected: false, },
    { courseName: 'Calculus', selected: false, },
    { courseName: 'Chemistry', selected: false, },
    { courseName: 'Physics', selected: false, },
    { courseName: 'Biology', selected: false, },
    { courseName: 'Economics', selected: false, },
    { courseName: 'Accounting', selected: false, },
    { courseName: 'German', selected: false, },
    { courseName: 'Chinese', selected: false, },
    { courseName: 'Maori', selected: false, },
    { courseName: 'Spanish', selected: false, },
    { courseName: 'French', selected: false, },
    { courseName: 'Arts', selected: false, },
    { courseName: 'Music', selected: false, },
    { courseName: 'ESOL', selected: false, },
    { courseName: 'Social Studies', selected: false, },
    { courseName: 'Geography', selected: false, },
    { courseName: 'History', selected: false, },
    { courseName: 'ICT', selected: false, },
    { courseName: 'Computer Studies', selected: false, },
    { courseName: 'Media Studies', selected: false, },
    { courseName: 'Graphics', selected: false, },
    { courseName: 'Drama', selected: false, },
    { courseName: 'Design', selected: false, },
    { courseName: 'Japanese', selected: false, },
  ];
  constructor(
    private learnerService: LearnerService,
    private titleService: Title,
    private fb: FormBuilder,
    private router:Router,
  ) {
    this.titleService.setTitle('Learnspace | Welcome');
    this.options = this.fb.group({
      isLearner: false,
    });
  }

  ngOnInit() {
  }

  addCourse() {
    this.selectedCourse = [];
    for (let course of this.courses) {
      if (course.selected == true) {
        this.selectedCourse.push(course.courseName);
      }
      if (this.selectedCourse.some(x => x === course.courseName)) {
        let index = this.selectedCourse.indexOf(course.courseName)
        this.selectedCourse.slice(index, 1);
      }
    };

    let data = {
      learner_first_name: this.nameFormControl.value,
      grade: this.selected1,
      subject: this.selectedCourse,
    };

    console.log(data)

    this.learnerService.storeLearnerProfile(data).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err);
    });


    this.learner_num += 1;
    this.isFirstLearner = false;

    if (!this.options.value.isLearner) {
      //user is not learner
      if (this.learner_num > this.max_learner) {
        this.isMaxLearner = true;
        this.maxLearner = true;
        this.CoursePage = false;
      } else {
        this.addLearner = true;
        this.CoursePage = false;
      }
    } else {
      //go to find tutor
      this.router.navigate(["/app/find-tutor"])
    }
  }

  showNamePage() {
    this.namePage = true;
    this.YearLevel = false;
  }
  showCourse() {
    if (this.yearLevelControl.hasError('required')) {
      console.log("You muse select a year level");
    } else {
      this.YearLevel = false;
      this.CoursePage = true;
    }
  }
  showYearLevel() {
    if (this.nameFormControl.hasError('required')) {
      console.log("You must enter a value")
    } else {
      this.YearLevel = true;
      this.CoursePage = false;
      this.namePage = false;
    }
  }
  showHighCourse() {
    this.highCourse = true;
    this.uniCourse = false;
  }
  showUniCourse() {
    this.uniCourse = true;
    this.highCourse = false;
  }
  getErrorMessage(type: string) {
    if (type == "name") {
      return 'You must enter a value';
    } else if (type == "year") {
      return 'You muse select a year level';
    }
  }

  addAnotherLearner() {
    this.yearLevelControl.reset();
    this.addLearner = false;
    this.namePage = true;

    this.selectedCourse = [];
    this.nameFormControl.reset();

    for (let course of this.courses) {
      course.selected = false;
    }
  }

  finished(){
    this.router.navigate(["/app/find-tutor"])
  }
  goApply(){
    this.router.navigate(['/app/apply/teach']);
  }
}
