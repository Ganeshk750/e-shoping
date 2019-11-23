import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'product-mart';
  searchTeam = '';
  isCollpased = true;

  get token(){
    return localStorage.getItem('token');
  }

  collapse(){
    this.isCollpased = true;
  }

  closeDropdown(dropdown){
    dropdown.close();
  }

  logut(){}

  search(){}
}
