// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080/api/transacciones'; // Cambia esto por tu URL de API

  async getData() {
    try {
      const response = await axios.get(this.apiUrl);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
