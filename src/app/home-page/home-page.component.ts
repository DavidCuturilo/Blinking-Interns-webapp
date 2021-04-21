import { Intern } from './../shared/models/intern.model';
import { AddTaskModalComponent } from './../shared/modals/add-task-modal/add-task-modal.component';
import { DataFromServerService } from './../services/data-from-server.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelperMethodService } from '../services/helper-method.service';
import { TaskInfoModalComponent } from '../shared/modals/task-info-modal/task-info-modal.component';
import { Task } from '../shared/models/task.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [HelperMethodService]
})
export class HomePageComponent implements OnInit {

  constructor(public dialog: MatDialog,
              public helperMethodService: HelperMethodService,
              public dataFromServer: DataFromServerService,
              public addTaskDialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    const { type } = this.helperMethodService.getDataFromAccesToken();

    // console.log(type)

    if(type === "intern"){
      this.dataFromServer.getAssignments();
    }else if( type === "mentor"){
      this.dataFromServer.getInternsById();
    }
    this.modalActive=false;
  }

  public modalData: Task;
  public modalActive:boolean;

  addTaskModal(interns){
    const dialogRef = this.addTaskDialog.open(AddTaskModalComponent,{data:interns});
  }

  showDetails(assignment:Task) {

    this.dialog.open(TaskInfoModalComponent,{data: {...assignment}});
    this.modalData=assignment;
  }

  seeMore(intern: Intern) {
    localStorage.setItem("intern",JSON.stringify(intern))
    //this.router.navigate(['/user-profile']);
  }
}
