import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';



interface CountryOption {
  label: string;
  options: {
    label: string;
    value: string;
    subCities?: SubCityOption[];
    options: {
      label: string;
      value: string;
      subCities?: SubCityOption[];
    }[];
  }[];
  hover: boolean;
}

interface CityOption {
  label: string;
  value: string;
  subCities?: SubCityOption[];
  options: {
    label: string;
    value: string;
    subCities?: SubCityOption[];
  }[];
}

interface SubCityOption {
  label: string;
  value: string;
}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menuItems: string[] = [];
  regionNames: string[] = [];
  corporate: string[] = [];
  countryOptions: CountryOption[] = [];

  constructor(private apiService: ApiService, private http: HttpClient) { }

  ngOnInit() {
    this.apiService.getMenuItems().subscribe((response: any)=> {
      this.menuItems = response.SPECIALITY[0].TYPE;
    //  console.log(response);
     // console.log(response.SPECIALITY[0].TYPE);
      this.regionNames = response.CRUISE_APP.map((region:any)=> region.name);
    //  console.log(this.regionNames);
      this.corporate = response.CORPORATE.map((corp:any)=> corp.TYPE);
     // console.log(this.corporate);
      this.countryOptions = response.FIT.reduce((options: CountryOption[], countryGroup: any) => {
        const existingGroup = options.find((group: { label: any; }) => group.label === countryGroup._id);
        if (existingGroup) {
          const existingCountry = existingGroup.options.find((country: { label: any; }) => country.label === countryGroup.COUNTRY);
          if (existingCountry) {
            existingCountry.options.push({ label: countryGroup.COUNTRY_CITY, value: countryGroup.CITY, subCities: countryGroup.CITY_SUB_CITY });
          } else {
            existingGroup.options.push({
              label: countryGroup.COUNTRY,
              value: countryGroup.COUNTRY,
              subCities: countryGroup.COUNTRY_SUB_CITY,
              options: [
                {
                  label: countryGroup.COUNTRY_CITY,
                  value: countryGroup.CITY,
                  subCities: countryGroup.CITY_SUB_CITY
                }
              ]
            });
          }
        } else {
          options.push({
            label: countryGroup._id,
            hover: false,
            options: [
              {
                label: countryGroup.COUNTRY,
                value: countryGroup.COUNTRY,
                subCities: countryGroup.COUNTRY_SUB_CITY,
                options: [
                  {
                    label: countryGroup.COUNTRY_CITY,
                    value: countryGroup.CITY,
                    subCities: countryGroup.CITY_SUB_CITY
                  }
                ]
              }
            ]
          });
        }
        return options;
      }, []);
     // console.log(this.countryOptions);
  
    });
  }
}
