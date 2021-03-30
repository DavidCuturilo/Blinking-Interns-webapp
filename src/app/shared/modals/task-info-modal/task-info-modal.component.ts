import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HelperMethodService } from 'src/app/services/helperMethod.service';
import { Task, TaskType } from '../../models/task.model';

@Component({
  selector: 'app-task-info-modal',
  templateUrl: './task-info-modal.component.html',
  styleUrls: ['./task-info-modal.component.scss'],
  providers: [HelperMethodService]
})
export class TaskInfoModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Task, public dialogRef: MatDialogRef<TaskInfoModalComponent>,
              public helperMethodService: HelperMethodService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

}
