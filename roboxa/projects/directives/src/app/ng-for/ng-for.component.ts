import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-for',
  templateUrl: './ng-for.component.html',
  styleUrls: ['./ng-for.component.css']
})
export class NgForComponent {
  public courses:string[] = 
  ["Typescript","Javascript","Angular","ReactJs"];

  public isDisplay:boolean = true;

}
