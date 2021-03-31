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

  constructor(public dialog: MatDialog,
              public helperMethodService: HelperMethodService,
              public dataFromServer: DataFromServerService) { }

  ngOnInit(): void {
    this.dataFromServer.getAssignments();
    this.modalActive=false;
  }

  public modalData: Task;
  public modalActive:boolean;


  showDetails(assignment:Task) {

    this.dialog.open(TaskInfoModalComponent,{data: {...assignment}});
    this.modalData=assignment;
  }

}
