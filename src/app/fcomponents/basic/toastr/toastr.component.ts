import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlertNotificationService } from '../../../services/support/alert-notification.service';


@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.css']
})
export class ToastrComponent implements OnInit {

  defaltPosition = 'toast-top-right';
  defaultDuration = 3000;

  constructor(
    private toastr: ToastrService, 
    private alertservice: AlertNotificationService
  ) {
    // console.log('toastr component works!!!!!');
    this.alertservice.getAlert().subscribe((data: any) => {
      console.log("Toastr got the data from service!");
      switch(data.messageType.toUpperCase()) {
        case "ERROR" :
          this.showError(data.message, data.messageType, data.position, data.duration);
          break;
        case "INFO":
          this.showInfo(data.message, data.messageType, data.position, data.duration);
          break;
        case "WARNING":
          this.showWarning(data.message, data.messageType, data.position, data.duration);
          break;
        case "SUCCESS":
          this.showSuccess(data.message, data.messageType, data.position, data.duration);
          break;
        default:
          this.showDefaultError(data.message, data.messageType, data.position, data.duration);
      }

    })
   }

  ngOnInit() {
  }

  showSuccess(message = "The messageType is not valid, only error, info, success and warning are promitted, both small case and capital are OK. ", title = "Internal Error", position = this.defaltPosition, timeOut = this.defaultDuration) {
    this.toastr.success( message,title,{
      positionClass: position,
      closeButton: true,
      tapToDismiss: false,
      timeOut,
    });
  }

  showWarning(message = "need some info", title = "need a title", position = this.defaltPosition, timeOut = this.defaultDuration) {
    this.toastr.warning( message,title,{
      positionClass: position,
      closeButton: true,
      tapToDismiss: false,
      timeOut,
    });  
  }

  showInfo(message = "need some info", title = "need a title", position = this.defaltPosition, timeOut = this.defaultDuration) {
    this.toastr.info( message,title,{
      positionClass: position,
      closeButton: true,
      tapToDismiss: false,
      timeOut,
    });  
  }

  showError(message, title, position, timeOut) {
    this.toastr.error( message,title,{
      positionClass: position,
      closeButton: true,
      tapToDismiss: false,
      timeOut,
    });  
  }

  showDefaultError(message = "default error message", title = "default error title", position = this.defaltPosition, timeOut = this.defaultDuration) {
    this.toastr.error( message,title,{
      positionClass: position,
      closeButton: true,
      tapToDismiss: false,
      timeOut,
    });  
  }


}
