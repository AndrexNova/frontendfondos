import { Component, OnInit } from '@angular/core';
import { DataService } from './table-listdata.service';
import { EventEmitterService } from '../general/event-emitter.service';


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  data: any[] = []; // Aquí almacenarás los datos de la tabla

  constructor(private dataService: DataService,
    private eventEmitterService: EventEmitterService
  ) { }

  async ngOnInit() {
    await this.loadData();

  }

  async gestionarClienteProducto(item){
    try {

      if(!item.estado){
        await this.dataService.mostrarMontoInversion(item);
      }else{
        await this.dataService.updateClienteProducto(item);
      }

      await this.loadData();

    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  async loadData() {
    try {
      debugger
      this.data = await this.dataService.getData();
      this.eventEmitterService.callMethod();  

    } catch (error) {
      console.error('Error loading data:', error);
    }
  }
  
}
