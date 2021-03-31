import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {

  countChart1: number = 0;
  countChart2: number = 0;

  public barChartLabels: Label[] = ['Real Time Graph'];
  public barChartType: ChartType = 'bar';

  public barChartData: ChartDataSets[] = [
    { data: [5], label: 'Graph 1' },
    { data: [5], label: 'Graph 2' }
  ];

  constructor(public signalRService: SignalRService) { }

  ngOnInit(): void {
    this.signalRService.startConnection();

    this.signalRService.hubConnection.on('chartStation1', (result: any) => {
      this.countChart1 += result;
      this.barChartData[0].data = [this.countChart1];
    });

    this.signalRService.hubConnection.on('chartStation2', (result: any) => {
      this.countChart2 += result;
      this.barChartData[1].data = [this.countChart2];
    });
  }

}
