// event-emitter.service.ts
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  invokeMethod = new EventEmitter();  // EventEmitter to invoke methods

  callMethod() {
    this.invokeMethod.emit();  // Emit event to notify subscribers
  }
}
