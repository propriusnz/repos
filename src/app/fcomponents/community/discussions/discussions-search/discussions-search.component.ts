import { Component, OnInit, Pipe, Output, EventEmitter} from '@angular/core';
import { RouterModule, Router, ActivatedRoute} from '@angular/router';
// import { DiscussionTypeModel } from '../../../../models/TutorProfileModel';
import { AuthService } from '../../../../services/security/auth.service';
import { UserService } from '../../../../services/servercalls/user.service';
import { environment } from '../../../../../environments/environment.prod';
import { CommonSupportService } from '../../../../services/support/common-support.service';
// import { DateDiscussionReformPipe } from '../date-discussion-reform.pipe';

declare var require: any;

@Component({
  selector: 'app-discussions-search',
  templateUrl: './discussions-search.component.html',
  styleUrls: ['./discussions-search.component.css']
})

export class DiscussionsSearchComponent implements OnInit {
  discussionList=[];
  displayDiscussions=[];
  defaultImgUrl = 'http://proprius.co.nz/api/public/userimg/default-cp.jpeg';
  defaultSubIcon = "../../../../../assets/icons/categoryIcon.png";
  userFilter:any;
  selectedType:any;
  errorFlag:boolean;
  errorInfo:string;
  p: number = 1;
  total: number;
  loading: boolean;  
  discussionType: any;
  data: any='';
  dataBase: any;
  discussionTypes = [
    {id:0,text:'All Discussion Types'},
    {id:1,text:'Arts'},
    {id:2,text:'Physics'}, 
    {id:3,text:'Chemistry'} , 
    {id:4,text:'Biology'},
    {id:5,text:'Science'},
    {id:6,text:'Geography'},
    {id:7,text:'Math'},
    {id:8,text:'Information System'},
    {id:9,text:'Social Studies'},
    {id:10,text:'Economics'},
    {id:11,text:'Finance'},
    {id:12,text:'Accounting'},
    {id:13,text:'English'},
    {id:14,text:'French'},
    {id:15,text:'German'},
    {id:16,text:'Spanish'},
    {id:17,text:'Chinese'},
    {id:18,text:'Maori'},
    {id:19,text:'Japanese '},
    {id:20,text:'Design '},
    {id:21,text:'Graphics '}

  ];
  // discussionTypes: DiscussionTypeModel;
  isLogin = false;
  // discussionDetail:any;
  creator: string;
  userName: string;

  @Output('_selectChange') private _selectChange = new EventEmitter();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService:AuthService,
    private userService:UserService,
    private commonSupport: CommonSupportService
  ){ }

  ngOnInit() {
    this.userFilter = 'All';
    this.selectedType = 'All Discussion Types';
    this.data = 'All Discussion Types';
    this.getPage(1); 
    this.userLoginStatus();
  }

  // make website turn to this specific page
  getPage(page: number) {
    this.loading = true;
    console.log(this.selectedType, this.userFilter, page);
    this.userService.showDiscussions(this.selectedType, this.userFilter, page).subscribe(
      (res)=>{
        console.log(res);
        this.discussionList = res['data'];
        this.getData(this.discussionList);
        this.displayDiscussions.length = 0;
        this.discussionList.forEach(element=>{
          this.displayDiscussions.push(element);
          // console.log('-----------this.displayDiscussions----------------')
          // console.log(this.displayDiscussions);
          if ((element.discussion_comments===null)||(element.discussion_comments==='')) {element.commentsCount= 0 ;}
          else {element.commentsCount=element.discussion_comments.length; }
        });
        this.total=res['total'];
        this.p=page;
        this.loading = false;
      },
      (err)=>{
        console.warn(err)
        this.errorFlag = true;
        this.errorInfo = err;
      });
  }

  // check user status is login or not
  userLoginStatus() {
    if(this.authService.getAuth()){
      this.isLogin = true;
      this.userName = localStorage.getItem('lsaUserName');
    } else {
      this.isLogin = false;
      this.userName = 'comments';
    }
  }

  // when user Profile img not being edited, put default img into it.
  public onError(e){
    e.target.src=this.defaultImgUrl;
  }

  // when subjectIcon cannot match to subject name, put default subIcon into it.
  subjectIcon(e){
    e.target.src = this.defaultSubIcon;
  }

  // Once sorting data selected changes, refreshData automatically.
  onChangeSelect(text: string) {
    this.selectedType = text;
    this.refreshData();
  }

  // Sort by category way when data selected changes
  changeSelect(value:any) {
    for (let i=0; i < value['discussionTypes'].length; i++) {
      if (value['discussionTypes'][i].text === this.data) {
        this.onChangeSelect(value['discussionTypes'][i].text);
        break;
      }
    }
  }

  // Sort by Creator(mine) way when data selected changes and user has logined
  sortByCreator(event){
    const newVal = event.target.value;
    console.log(newVal);
    if (newVal === 'Mine') {
      console.log('User has logined or not: ', this.isLogin);
      this.userName = localStorage.getItem('lsaUserName');
      console.log('userName is ', this.userName);
    }
  } 

  // if button selected, trigger this method
  refreshData(){
    console.log('refreshData');
    this.getPage(1);
  }

  // get Data value from userService.showDiscussions method of getPage function
  getData(dataVal) {
    // console.log('did getData function!!!!');
    this.dataBase = dataVal;
  }


  goToSearch(search:string){
    // this.router.navigateByUrl(`/search?${search}`)
    console.log(this.dataBase);
    for (let i=0; i<this.dataBase.length; i++){
      // console.log('Values: ', Object.values(this.dataBase[i]));
      for (let j=0; j<Object.values(this.dataBase[i]).length; j++){
        if (Object.values(this.dataBase[i])[j]){
          let objValueStr = Object.values(this.dataBase[i])[j].toString();
          objValueStr = objValueStr.toLowerCase();
          if (objValueStr.indexOf(search.toLowerCase()) !== -1) {
            console.log('search value is the same as the value of object');
            console.log(search.toLowerCase());
            console.log(objValueStr);
          } 
        } 
      }
    }
  }


}
