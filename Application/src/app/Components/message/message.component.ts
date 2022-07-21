import { Component, OnInit, ViewChild } from '@angular/core';
import { DetailsService } from '../../auth/details.service';
import { IDetails } from '../../auth/details';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { IAssignee } from '../../auth/assignee';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


export interface User{
  username:string;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  myControl = new FormControl();
  form!: FormGroup;
  options: User[] = [
    {username: 'Mary'},
    {username: 'Shelley'},
    {username: 'Igor'}
  ];
  filteredOptions!: Observable<User[]>;
  user!: IAssignee[];
  public b: any;
  //style table highlight row on click
  selectedRow: any;
  //priority option
  selected = '';
  statusSelected = '';
  IncidentType = '';
  public Assignee :any;
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
  test!: IAssignee[];

  @ViewChild(MatSort) sort! :MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _detailService: DetailsService,private fb : FormBuilder) { }

  ngOnInit(): void {
  
    //Get the details to be displayed in the table row
    this._detailService.getDetails()
      .subscribe(data => {
        this.blocks = data
        this.dataSource = new MatTableDataSource<IDetails>(this.blocks);
        this.dataSource.sort=this.sort;
        this.dataSource.paginator = this.paginator;
        this.getName();
      }
      );

    this.getRecord;
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.options.slice())
    );
  }

  //Get the data to be displayed in the details section by passing id to get api
  getRecord(row: any) {
    this.div1Function();
    this._detailService.getDetailById(row.msg_id)
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

  getName(){
    this._detailService.getUser().subscribe(response => 
      {
        console.log("getuser resp",response);
        this.test=response;
        for(let i=0;i<response.length;i++){
          console.log(this.test[i].username)
           this.b = this.test[i].first_name+ " " +this.test[i].last_name;
           if(this.b != " "){
          console.log("Assignee Names: ", this.b)
          console.log(this.b);
          this.options.push({"username":this.b})
           }
        }                
      })
  }

  //update the details information using POST api
  post() {
  //test assignee
  //console.log("assignee post",this.myControl.value.username)

    //push the new comment to the list
    this.postcomment.push(this.comment);
    //Log details to console
    console.log(this.detail.msg_id);
    console.log(this.comment);
    console.log(this.selected);
    console.log(this.postcomment);
    if(this.myControl.value === null){
       this.Assignee=this.Assignee
       console.log("if block",this.Assignee)
     }
     else{
      this.Assignee=this.myControl.value.username
      console.log("if block",this.Assignee)
     }
    //assign the values to the key before calling post api
    var test = {
      "id": this.detail.id,
      "msg_id": this.detail.msg_id,
      "msg_from": this.detail.msg_from,
      "msg_date": this.detail.msg_date,
      "msg_subject": this.detail.msg_subject,
      "msg_body": this.detail.msg_body,
      "thread_index": this.detail.thread_index,
      "content_type": this.detail.content_type,
      "assigned": this.Assignee,
      //"assigned":this.myControl.value.username,
      "status": this.statusSelected,
      "priority": this.selected,
      "comments": this.detail.comments + '\n' + this.comment
    }
    console.log(test);
    // call the Update method in ServiceUIFrameContext.ts to update comment
    this._detailService.Update(test).subscribe(data => {
      this.detail = data

      console.log(this.detail);
      this.getRecord(this.detail);
      this.comment = "";
      // this.postcomment = [];
      // this.Assignee=this.Assignee,
      this.myControl.setValue('');
      // this.postcomment.push(this.detail.comments);
      window.alert("Details Updated Successfully!!");
    }
    );
  }

  displayFn(user: User): string {
    return user && user.username ? user.username : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.username.toLowerCase().includes(filterValue));
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
}
