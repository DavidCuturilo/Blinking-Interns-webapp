import { TaskStatus } from './../shared/models/task.model';
import { DataFromServerService } from './../services/data-from-server.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelperMethodService } from '../services/helper-method.service';
import { TaskInfoModalComponent } from '../shared/modals/task-info-modal/task-info-modal.component';
import { Task } from '../shared/models/task.model';

import { TaskType } from '../shared/models/task.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [HelperMethodService]
})
export class HomePageComponent implements OnInit {

  assignments:{
    date:string,
    deadline:string,
    progress:number,
    task_status: TaskStatus,

    mentor:{
      full_name:string,
      email:string
    }

    task:{
      title:string,
      text:string,
      task_type:TaskType
    }
  }[] = []

  constructor(public dialog: MatDialog,
              public helperMethodService: HelperMethodService,
              private dataFromServer: DataFromServerService) { }

  ngOnInit(): void {
    this.dataFromServer.getAssignments().subscribe(data => {
      this.assignments = data.payload;
      console.log(this.assignments)
    }, err => console.log("Error: ",err))
    this.modalActive=false;
  }

  public modalData: Task;
  public modalActive:boolean;


  showDetails(assignment:Task) {

    this.dialog.open(TaskInfoModalComponent,{data: {...assignment}});
    this.modalData=assignment;
  }

}
