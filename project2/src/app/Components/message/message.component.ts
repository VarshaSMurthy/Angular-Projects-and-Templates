import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  // Table
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = ELEMENT_DATA;
  public id: number | undefined;
  public name: string | undefined;
  public weight: any;
  public symbol: any;
  // div1: boolean = false;
  fxFlexForCol1: number = 100;
  div1!: boolean;

  //comment 
  postcomment : string[] = ["test comment"];
  comment="";
  

  constructor() { }

  ngOnInit(): void {
  }

  getRecord(row: any) {
    this.id = row.position;
    this.name = row.name;
    this.weight = row.weight;
    this.symbol = row.symbol;
    this.fxFlexForCol1 = 50;
    console.log(row);
  }

  div1Function() {
    this.div1 = true;
  }
  div2Function() {
    this.div1 = !this.div1;
  }

  post(){
    
    this.postcomment.push(this.comment)
    this.comment=" ";
    
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
