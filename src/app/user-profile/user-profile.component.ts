import { DataFromServerService } from './../services/data-from-server.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthInterceptorService } from '../services/auth-interceptor.service';
import { HelperMethodService  } from '../services/helper-method.service';
import { ChangePasswordModalComponent } from '../shared/modals/change-password-modal/change-password-modal.component';
import { Intern } from '../shared/models/intern.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Mentor } from '../shared/models/mentor.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { TaskInfoModalComponent } from '../shared/modals/task-info-modal/task-info-modal.component'


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [HelperMethodService,AuthInterceptorService]
})
export class UserProfileComponent implements OnInit {
  activeFilters: string[];

  userType: string;

  isClosed=false;
  intern:Intern;
  mentor: Mentor;
  assignments;
  allAssignments;

  load: boolean =  false;

  edit = false;
  constructor(
              public dialog: MatDialog,
              public helperMethodService: HelperMethodService,
              public dataFromServerService: DataFromServerService,
              public route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private sanitizer: DomSanitizer
              ) { }

  urlType: string;
  filePreview=false;
  newBase64;


  ngOnInit(): void {
    this.userType = this.helperMethodService.getDataFromAccesToken().type;

    if (this.userType === 'intern'){
      //Podaci interna iz tokena
     let {email,id} = this.helperMethodService.getDataFromAccesToken();
     this.intern = {email,full_name: '',id};
    } else {
      //Podaci mentora iz tokena
      let {email,id} = this.helperMethodService.getDataFromAccesToken();
      this.mentor = {email,id,full_name:'',password:''};

      //Podaci interna iz local storage-a
      this.intern = JSON.parse(localStorage.getItem("intern"));
    }

    this.route.params.subscribe((params: Params) => {
      this.urlType = params['type'];
    }, error =>{
      console.log(error);
    })

    //Preuzimanje assignemnt-a za odredjenog interna
    if(this.userType === 'intern' || this.urlType==='intern'){
      this.dataFromServerService.getInternAssignments(this.intern).subscribe(response => {
        this.assignments=response.payload;
        this.assignments.reverse();
      }, error => console.log(error))
    }

    //Filter za interne
    if(this.userType === 'intern'){
      this.activeFilters = ["Completed"];
    } else if (this.userType === 'mentor'){

      this.activeFilters = ["Active"];
    }

    //Prikazivanje svih kreiranih taskova
    if(this.userType === 'mentor'){
      this.dataFromServerService.getMentorAssignments(this.mentor).subscribe(response => {
        this.allAssignments=response.payload;
        this.allAssignments.reverse();
      }, error => console.log(error))
    }

    console.log(this.intern)
  }

  editStatus(){
    this.edit = !this.edit;
  }

  changePassword(intern: Intern) {
    this.dialog.open(ChangePasswordModalComponent,{data: {...intern}});
  }

  statusActive(filter: string){
    this.load= !this.load;
    setTimeout(() => {
      this.load= !this.load;
      if(this.activeFilters.includes(filter)){
        this.activeFilters = this.activeFilters.filter(el => el !== filter);
      }
      else{
        this.activeFilters.push(filter);
      }
    },300);
  }

  
  isMentor(){
    if(!this.urlType && this.userType==='mentor'){
      return true;
    }
    return false;
  }

  isIntern(){
    if(this.urlType === 'intern' || this.userType==='intern'){
      return true;
    }
    return false;
  }

  viewDocument(event: Event,assignemnt) {
    this.isClosed=false;

    this.loadFileFromServer(assignemnt)
    .then(res => {
      const base64string = res.payload;
      if(base64string){
        this.filePreview=true
       return this.newBase64 = this.sanitizer.bypassSecurityTrustResourceUrl(base64string);
      };
      return this.snackBar.open("No file for this task", '',{duration:2000});;
    })
    .catch(console.log);
  }


  downloadFile(event: Event,assignemnt) {

    this.loadFileFromServer(assignemnt)
    .then(res => {
      const base64string = res.payload;
      if(base64string) return this.decodeFile(res.payload);
      return null;
    })
    .then(blob => {
      if(blob)return this.download(blob,assignemnt);
      let snackBarRef = this.snackBar.open("No file for this task", '',{duration:3000});
      return null;
    })
    .catch(console.log);
  }


   //loads base64 encoded FILE from server (by task id)
   async loadFileFromServer(assignemnt){
    return this.dataFromServerService.getFile(assignemnt.task.task_id).toPromise();
  }

  //Converts base64 string to BLOB object
  async decodeFile(base64String){
    console.log(base64String)
    const res = await fetch(base64String);
    const blob = await res.blob();
    return blob;
  }

  //Popups download dialog with file
  download(data: Blob,assignemnt) {
    console.log(data)
    const a = document.createElement('a');
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(data);
    a.href = url;
    a.download = assignemnt.task.title;
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  close(){
    this.isClosed=true;
  }
 
}
