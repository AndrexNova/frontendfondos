import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { DataService } from './data.service';
import { GeneralDataService } from '../general/generaldata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  data: any[] = []; // Aquí almacenarás los datos de la tabla

  constructor(private dataService: DataService, 
    private generalDataService: GeneralDataService ) { }
 
  ngOnInit() {
    this.loadData();      
  }
  
  async loadData() {
    try {
      debugger
      this.data = await this.dataService.getData();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

}
