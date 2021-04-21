import { DataFromServerService } from './../services/data-from-server.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthInterceptorService } from '../services/auth-interceptor.service';
import { HelperMethodService } from '../services/helper-method.service';
import { ChangePasswordModalComponent } from '../shared/modals/change-password-modal/change-password-modal.component';
import { Intern } from '../shared/models/intern.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Mentor } from '../shared/models/mentor.model';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [HelperMethodService,AuthInterceptorService]
})
export class UserProfileComponent implements OnInit {
  activeFilters: string[];

  userType: string;

  intern:Intern;
  mentor: Mentor;
  assignments;
  allAssignments;

  load: boolean =  false;

  edit = false;
  constructor(public dialog: MatDialog,
              public helperMethodService: HelperMethodService,
              public dataFromServerService: DataFromServerService,
              public route: ActivatedRoute) { }

  // public modalData: Intern;
  urlType: string;


  ngOnInit(): void {
    this.userType = this.helperMethodService.getDataFromAccesToken().type;
    // this.userType = this.helperMethodService.getDataFromAccesToken().type;
    if (this.userType === 'intern'){
     let {email,id} = this.helperMethodService.getDataFromAccesToken();
     this.intern = {email,full_name: '',id};
    } else {

      let {email,id} = this.helperMethodService.getDataFromAccesToken();
      this.mentor = {email,id,full_name:'',password:''};
      // console.log(this.mentor.email)
      this.intern = JSON.parse(localStorage.getItem("intern"));
    }

    if(this.urlType==='intern'){
      this.dataFromServerService.getInternAssignments(this.intern).subscribe(response => {
        this.assignments=response.payload;
      // console.log(this.assignments)

      }, error => console.log(error))
    }


    if(this.userType === 'mentor'){
      this.dataFromServerService.getMentorAssignments(this.mentor).subscribe(response => {
        this.allAssignments=response.payload;
        console.log(this.allAssignments)
      }, error => console.log(error))
    }


    if(this.userType === 'intern'){
      this.activeFilters = ["Completed"];
    } else if (this.userType === 'mentor'){

      this.activeFilters = ["Active"];
    }

    this.route.params.subscribe((params: Params) => {
      this.urlType = params['type'];
    }, error =>{
      console.log(error);
    })
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

  viewDocument(event: Event) {
    event.stopPropagation();

  }


  downloadDocument(event: Event){
    event.stopPropagation();

  }
}
