import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HelperMethodService } from 'src/app/services/helper-method.service';

@Component({
  selector: 'app-task-info-modal',
  templateUrl: './task-info-modal.component.html',
  styleUrls: ['./task-info-modal.component.scss'],
  providers: [HelperMethodService]
})
export class TaskInfoModalComponent implements OnInit {

  statusColor = "red"
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<TaskInfoModalComponent>,
              public helperMethodService: HelperMethodService) { }

  ngOnInit(): void {

    if(this.data.task_status === "Active") this.statusColor="blue"
    else if(this.data.task_status === "Completed") this.statusColor="green"
    else this.statusColor="red"

  }

  closeModal() {
    this.dialogRef.close();
  }

}
