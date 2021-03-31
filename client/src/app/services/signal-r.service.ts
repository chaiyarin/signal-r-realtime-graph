import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  hubConnection: any;

  constructor() { }

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/chart') // นี่คือท่อ DataHub ที่เรา Initial ไว้ที่ NetCore ตอนแรกใน Startup.cs
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('เชื่อมต่อท่อสำเร็จ'))
      .catch((err: any) => console.log('มีปัญหาในการเชื่อมต่อท่อ: ' + err))
  }

}
