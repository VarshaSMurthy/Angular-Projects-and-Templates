import { Component, OnInit } from '@angular/core';
import { DetailsService } from '../../auth/details.service';
import { IDetails } from '../../auth/details';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  //style table highlight row on click
  selectedRow: any;
  //priority option
  selected = '';
  statusSelected = '';
  Assignee = '';
  // Table
  displayedColumns: string[] = ['msg_from', 'msg_subject', 'msg_date'];
  blocks: IDetails[] = [];
  dataSource!: MatTableDataSource<IDetails>;

  public id: number | undefined;
  public name: string | undefined;
  public body = "";
  public date: string | undefined;
  public subject: string | undefined;
  fxFlexForCol1: number = 100;
  div1!: boolean;

  public detail: any = [];

  //comment 
  postcomment: string[] = [];
  comment = "";


  constructor(private _detailService: DetailsService) { }

  ngOnInit(): void {
    //Get the details to be displayed in the table row
    this._detailService.getDetails()
      .subscribe(data => {
        this.blocks = data
        this.dataSource = new MatTableDataSource<IDetails>(this.blocks);
      }
      );

    this.getRecord;

  }

  //Get the data to be displayed in the details section by passing id to get api
  getRecord(row: any) {
    this._detailService.getDetailById(row.id)
      .subscribe(data => {
        this.detail = data
        this.selectedRow = row;
        console.log(this.detail);
        this.postcomment = [];
        this.postcomment.push(this.detail.comments);
        this.selected = this.detail.priority;
        this.statusSelected = this.detail.status;
        this.Assignee = this.detail.assigned;
      }
      );
  }

  //Show the details section on clicking table row
  div1Function() {
    this.div1 = true;
  }

  //close the details section on clicking close
  div2Function() {
    this.div1 = !this.div1;
    this.selectedRow = "";
  }

  //update the details information using POST api
  post() {
    //push the new comment to the list
    this.postcomment.push(this.comment);
    //Log details to console
    console.log(this.detail.msg_id);
    console.log(this.comment);
    console.log(this.selected);
    console.log(this.postcomment);

    //assign the values to the key before calling post api
    const test = {
      "id": this.detail.id,
      "msg_id": this.detail.msg_id,
      "msg_from": this.detail.msg_from,
      "msg_date": this.detail.msg_date,
      "msg_subject": this.detail.msg_subject,
      "msg_body": this.detail.msg_body,
      "thread_index": this.detail.thread_index,
      "content_type": this.detail.content_type,
      "assigned": this.Assignee,
      "status": this.statusSelected,
      "priority": this.selected,
      "comments": this.detail.comments + '\n' + this.comment
    }
    console.log(test);
    // call the Update method in ServiceUIFrameContext.ts to update comment
    this._detailService.Update(test).subscribe(data => {
      this.detail = data
      console.log(this.detail);
      this.comment = "";
      this.postcomment = [];
      this.getRecord;
      this.postcomment.push(this.detail.comments);

    }
    );
  }
}
