import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelperMethodService } from '../services/helperMethod.service';
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
  tasks: Task[] = [{title: 'Node js', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis iusto non vero assumenda deserunt facere, esse quam autem, nihil tempora repudiandae? Ut quasi incidunt quas pariatur, labore consequuntur sapiente optio est totam iure magnam fugit commodi. Similique iste itaque totam?', status: false, type: TaskType.BACK_END, progress: 30},
                   {title: 'Angular App', text: 'vise informacija', status: false, type: TaskType.FRONT_END, progress: 15},
                   {title: 'Full service', text: 'vise informacija', status: true, type: TaskType.FULL_STACK, progress: 60},
                   {title: 'Full service', text: 'vise informacija', status: false, type: TaskType.FULL_STACK, progress: 60},
                   {title: 'Full service', text: 'vise informacija', status: false, type: TaskType.FULL_STACK, progress: 60},
                   {title: 'Full service', text: 'vise informacija', status: false, type: TaskType.FULL_STACK, progress: 60},
                   {title: 'Full service', text: 'vise informacija', status: false, type: TaskType.FULL_STACK, progress: 60},
                   {title: 'Full service', text: 'vise informacija', status: false, type: TaskType.FULL_STACK, progress: 60},

                   {title: 'Task3', text: 'vise informacija', status: false, type: TaskType.FULL_STACK, progress: 80}];

  constructor(public dialog: MatDialog,
              public helperMethodService: HelperMethodService) { }

  ngOnInit(): void {
    this.modalActive=false;
  }

  public modalData: Task;
  public modalActive:boolean;


  showDetails(task:Task) {

    this.dialog.open(TaskInfoModalComponent,{data: {...task}});
    this.modalData=task;
  }

}
