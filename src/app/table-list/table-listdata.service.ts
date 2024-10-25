import { Injectable } from '@angular/core';
import axios from 'axios';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8080/api/'; // Cambia esto por tu URL de API
   
  async getData() {
    try {
      const response = await axios.get(this.apiUrl+'clientesproductos/fondos/671a6001ab97356166535d08');
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }


  async mostrarMontoInversion(item){
    await Swal.fire({
      title: 'Ingrese su monto de inversion',

      html: `
      <input type="text" id="textInput" class="swal2-input" placeholder="Escribe algo...">
      <div>
        <label>Enviar confirmación por: </label>
        <label><input type="radio" name="radioOption" value="0"> SMS</label>
        <label><input type="radio" name="radioOption" value="1"> Email</label>
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      preConfirm: (inputValue) => {
        const textInput = (document.getElementById('textInput') as HTMLInputElement).value;
        const radioOption = document.querySelector('input[name="radioOption"]:checked') as HTMLInputElement | null;
    
        // Validación de campos obligatorios
        if (!textInput || !radioOption?.value) {
          Swal.showValidationMessage('Por favor completa todos los campos');
          return false;
        }
    
        return {
          text: textInput,
          option: radioOption.value
        };
      }
    }).then(async (result) => {
      // Si el usuario confirma y hay un valor válido
      if (result.isConfirmed && result.value) {
        item.montoInversion = result.value?.text;
        item.opcionEnvio = result.value?.option;

        if(item.id == "0"){
          await this.addClienteProducto(item); // Enviar datos usando Axios
          console.log("Crear")
        }else{
          await this.updateClienteProducto(item); // Enviar datos usando Axios
          console.log("Actualizar")
        }
      }
    });
  }

  async addClienteProducto(item){
    try {
      let request ={
          idCliente: item.idCliente,
          idProducto: item.idProducto, 
          montoInversion: item.montoInversion,
          opcionEnvio : item.opcionEnvio
        }

      const response = await axios.post(this.apiUrl+'clientesproductos', request)
      .then(response => {
        return response.data;
      }).catch(error => {
        Swal.fire({
          title: 'Fondos insuficientes',
          text: error.response.data,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return {}
      });

      return response;

    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async updateClienteProducto(item){
    try {
      let request ={
        id : item.id,
        idCliente: item.idCliente,
        idProducto: item.idProducto, 
        montoInversion: item.montoInversion,
        estado : item.estado,
        opcionEnvio : item.opcionEnvio
      }
      const response = await axios.put(this.apiUrl+'clientesproductos/estado', request)
      .then(response => {
        return response.data;
      }).catch(error => {
        console.log(error)
        Swal.fire({
          title: 'Fondos insuficientes',
          text: error.response.data,
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return {}
      });

      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

}
