// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class GeneralDataService {

  
  private apiUrl = 'http://localhost:8080/api/'; 

  async getDataCliente(idCliente) {
    try {
      const response = await axios.get(this.apiUrl+'clientes/'+idCliente);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
