import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { nextTick } from 'q';

@Injectable({
  providedIn: 'root'
})
export class CalendarSupportService {
  constructor() { }
  // change data to the events format
  // first1(res) {
  //   console.log(res);
  //   let sessionEvents: any = [];
  //   let freeEvents: any = [];
  //   // tslint:disable-next-line:forin
  //   for (let date in res) {
  //     //console.log(date);

  //     //console.log(res[date]);
  //     // free property and get free array
  //     //let freeTime = res[date]['free'];
  //     let freeTime = res[date];
  //     //console.log(freeTime);
  //     // tslint:disable-next- line:forin
  //     // start processing all the session data
  //     for (let sessionID in res[date]) {
  //       //if (sessionID !== 'free') {
  //         let sessionObject = res[date];
  //         let studentName = sessionObject.name;
  //         let sessionStatus = '';
  //         if (sessionObject['status']) {
  //           sessionStatus = sessionObject.status;
  //         }
  //         let sessionTime = sessionObject.time;
  //         //console.log(sessionTime);
  //         for (let sessionSlot of sessionTime) {
  //           // console.log(sessionSlot);
  //           let startTime1 = this.setTimeFormat(date, sessionSlot);
  //           let startTime = moment.utc(startTime1).local().format().slice(0, 19);
  //           let endTime = moment(startTime).add(30, 'minutes').format().substr(0, 19);
  //           let event = {
  //             id: sessionID,
  //             title: studentName + ' — ' + sessionStatus,
  //             start: startTime,
  //             end: endTime,
  //             color: '#0099ff'
  //           };
  //           sessionEvents.push(event);
  //           // delete the time from the free time, then the content in freetime will eventually become has no student
  //           this.deleteFromArray(freeTime, sessionSlot);
  //         }

  //       //}
  //       // end processing session date
  //       // start processing free time excluded the session time
  //       for (let free of freeTime) {
  //         let startTime2 = this.setTimeFormat(date, free);
  //         let startTime = moment.utc(startTime2).local().format().slice(0, 19);
  //         let endTime = moment(startTime).add(30, 'minutes').format().substr(0, 19);
  //         let event = {
  //           title: '',
  //           start: startTime,
  //           end: endTime,
  //           color: '#00ad2b'
  //         };
  //         freeEvents.push(event);
  //       }
  //     }
  //   }
  //   // this.showCalendar();
  //   let a = {
  //     session: sessionEvents,
  //     free: freeEvents
  //   };
  //   return a;
  // }
  //get all the event from the parameter data
  //freeTimeObj
  getEvent(freeTimeObj,SessionTimeArr){
    let freeEvents = this.getFreeEvent(freeTimeObj);
    let sessionEvents = this.getSessionEvent(SessionTimeArr); 
    let afterRidfreeEvents = this.ridOfIntersection(freeEvents,sessionEvents);
    let a = {
      session: sessionEvents,
      free: afterRidfreeEvents
    };    
    return  a;
  }
  //get rid of Intersection of free event data and session event data
  ridOfIntersection(freeEvents,sessionEvents){
    sessionEvents.forEach(sessionE=>{
      freeEvents=freeEvents.filter(e=>e.start!=sessionE.start);
    })
    return freeEvents;
  }
  getFreeEvent(freeTimeObj) {
    let freeEvents: any = [];
    for (let date in freeTimeObj) {
      if (freeTimeObj[date]===null) continue;
      freeTimeObj[date].forEach(freeTime => {
        let startTime2 = this.setTimeFormat(date, freeTime);
        let startTime = moment.utc(startTime2).local().format().slice(0, 19);
        let endTime = moment(startTime).add(30, 'minutes').format().substr(0, 19);
        let event = {
          title: '',
          start: startTime,
          end: endTime,
          color: '#00ad2b'
        };
        freeEvents.push(event);
      })
    }
    return freeEvents;
  }
  getSessionEvent(SessionTimeArr){
    let sessionEvents: any = [];
    SessionTimeArr.forEach(ele => {
      for (let i=0; i<ele.session_duration/0.5; i++){
        let sessionDate= moment.utc(ele.session_date).local().format().slice(0, 19);
        let startTime = moment(sessionDate).add(30*i, 'minutes').format().substr(0, 19);        
        let endTime = moment(sessionDate).add(30*(i+1), 'minutes').format().substr(0, 19); 
        let session_name;
        let swtich_color = "";
        switch (ele.session_status){
          case 0:
            session_name = 'Planned'
            swtich_color = "#b3d1ff" 
            break;
          case 1:
            session_name = 'Canceled'
            swtich_color = "#d9d9d9"
            break;
          case 2:
            session_name = 'Completed'
            swtich_color = "#99e699"
            break;
          case 3:
            session_name = 'Disputed'
            swtich_color = "#ff6666"          
            break;                    
        }


        let event = {
          title: ele.learner_first_name + '—' + session_name,
          start: startTime,
          end: endTime,
          color: swtich_color,
          id: ele.session_id,          
        }; 
        sessionEvents.push(event); 
      // delete the time from the free time, then the content in freetime will eventually become has no student
        // this.deleteFromArray(freeTime, sessionSlot);                            
      }
    }); 
    return sessionEvents;
  }
  // delete an element from array
  deleteFromArray(array: any, element: any) {
    let index = array.indexOf(element);
    array.splice(index, 1);
  }
  // set time format time: 1030
  setTimeFormat(day: string, time: string): string {
    const hour = time.substr(0, 2);
    const minutes = time.substr(2);
    const timeFormat = day + 'T' + hour + ':' + minutes + ':00';
    return timeFormat;
  }
  // set the fullcalendar for rect selection
  // get multiple days events, used for add free time
  getMultipleDaysEvents(start: moment.Moment, end: moment.Moment, calendarEvents: any[], chooseWeeks: number) {
    console.log(start.format(), end.format());
    let theEvents = [];
    let duration = end.diff(start, 'days');
    let days = duration + 1;
    // console.log(start.format(), end.format(), days);
    for (let x = 0; x < days; x++) {
      let source = this.getOneDayEvents(start, end, chooseWeeks);
      theEvents = theEvents.concat(source);
      console.log(source, theEvents);
      start.add(1, 'days');
      end.add(1, 'days');
    }
    console.log(theEvents);
    // filter the duplicates events in the calendar
    let newEvents = this.removeDuplicates(calendarEvents, theEvents);
    console.log(newEvents);
    return newEvents;
  }
  // get events used for remove events
  getAllDaysEvents(start: moment.Moment, end: moment.Moment, calendarEvents: any[], chooseWeeks: number) {
    let theEvents = [];
    let duration = end.diff(start, 'days');
    let days = duration + 1;
    // console.log(start.format(), end.format(), days);
    for (let x = 0; x < days; x++) {
      let source = this.getOneDayEvents(start, end, chooseWeeks);
      theEvents = theEvents.concat(source);
      console.log(source, theEvents);
      start.add(1, 'days');
      end.add(1, 'days');
    }
    console.log(theEvents);
    return theEvents;
  }
  // get one day events, but several weeks(optional)
  getOneDayEvents(start: moment.Moment, end: moment.Moment, chooseWeeks: number) {
    let source = [];
    let endMinutes = end.hour() * 60 + end.minute();
    let startMinutes = start.hour() * 60 + start.minute();
    let timeSlots = (endMinutes - startMinutes) / 30;
    let sourceIndex = 0;
    // update weeks
    for (let j = 0; j < chooseWeeks; j++) {
      for (let i = 0; i < timeSlots; i++) {
        // check if already has this event, if not then add to sources
        let allEvents = $('#calendar').fullCalendar('clientEvents');
        source[sourceIndex] = {
          title: '',
          start: start.format(),
          end: start.add(30, 'minutes').format(),
          color: '#00ad2b',
        };
        sourceIndex++;
      }
      // make start go back to original
      start.subtract(timeSlots * 30, 'minutes');
      // go to next week
      start.add(7, 'days');
    }
    // make day to go back to original
    start.subtract(7 * chooseWeeks, 'days');
    console.log('y1', source);
    return source;
  }
  // check if alreday has the events
  exist(calendarEvents: any[], newEvent: any) {
    for (let event of calendarEvents) {
      if (event.start.format() === newEvent.start) {
        return true;
      }
    }
    return false;
  }
  // remove duplicates
  removeDuplicates(calendarEvents: any[], allNewEvents: any[]) {
    let newArray = [];
    for (let newEvent of allNewEvents) {
      if (!this.exist(calendarEvents, newEvent)) {
        newArray.push(newEvent);
      }
    }
    return newArray;
  }
}
