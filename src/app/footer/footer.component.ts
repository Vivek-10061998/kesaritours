import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  menuItems: any[] | undefined;
  response :any[] |undefined;
  regionNames:any[] | undefined;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.menuItems$.subscribe(data => {
   
     
      this.menuItems = data?.SPECIALITY[0].TYPE;
      console.log(this.menuItems)
      this.response=data?.CORPORATE[0].TYPE;
      console.log(data);
      this.regionNames = data?.CRUISE_APP.map((region:any)=> region.name);
    });
  }

}
