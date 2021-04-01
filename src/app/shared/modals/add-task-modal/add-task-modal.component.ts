import { FormGroup, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss']
})
export class AddTaskModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddTaskModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  taskForm: FormGroup;

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      'title': new FormControl(null),
      'text': new FormControl(null),
      'task_type':new FormControl(null),
      'deadline': new FormControl(null),

    });
  }

  closeDialog(){
    this.dialogRef.close()
  }
}