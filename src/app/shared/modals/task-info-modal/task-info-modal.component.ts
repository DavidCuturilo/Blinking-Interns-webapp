import { DataFromServerService } from './../../../services/data-from-server.service';
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
              public helperMethodService: HelperMethodService,
              public dataFromServerService: DataFromServerService) { }

  ngOnInit(): void {
    if(this.data.task_status === "Active") this.statusColor="blue"
    else if(this.data.task_status === "Completed") this.statusColor="green"
    else this.statusColor="red"
  }

  closeModal() {
    this.dialogRef.close();
  }

  viewFile(){
    this.dataFromServerService.getFile(this.data.task.task_id).subscribe(buffer=>{
      console.log(buffer)
      this.download(new Blob([new Uint8Array(buffer, 0, buffer.byteLength)], {type:'application/pdf'}));
    }, error=>{
      console.log(error);
    })
  }

  downloadFile(){
    this.dataFromServerService.getFile(this.data.task.task_id).subscribe(buffer=>{
      console.log(buffer)
      this.download(new Blob([new Uint8Array(buffer, 0, buffer.byteLength)], {type:'application/pdf'}));
    }, error=>{
      console.log(error);
    })
  }

  download(data: any) {
    console.log(data);
    const a = document.createElement('a');
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(data);
    a.href = url;
    a.download = this.data.task.title;
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

}
