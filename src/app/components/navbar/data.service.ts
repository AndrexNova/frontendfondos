// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080/api/'; // Cambia esto por tu URL de API

  async getData() {
    try {
      const response = await axios.get(this.apiUrl+'clientes/671a6001ab97356166535d08');
      console.log(response)
      return response.data.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
