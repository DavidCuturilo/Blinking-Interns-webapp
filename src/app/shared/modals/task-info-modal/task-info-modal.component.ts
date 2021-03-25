import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task, TaskType } from '../../models/task.model';

@Component({
  selector: 'app-task-info-modal',
  templateUrl: './task-info-modal.component.html',
  styleUrls: ['./task-info-modal.component.scss']
})
export class TaskInfoModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Task, public dialogRef: MatDialogRef<TaskInfoModalComponent>) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

  getImageUrl(taskType: TaskType) {
    let imageUrl = '../../assets/pictures/';
    switch(taskType){
      case TaskType.BACK_END: imageUrl += 'back.jpg'
      break;
      case TaskType.FRONT_END: imageUrl += 'front.jpeg'
      break;
      case TaskType.FULL_STACK: imageUrl += 'full.jpeg'
      break;

      default: imageUrl += 'Angular.png';
    }
    return imageUrl;
  }

}
