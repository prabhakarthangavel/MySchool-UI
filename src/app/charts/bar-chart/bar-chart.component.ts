import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnChanges, OnInit {
  public chartType: string;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  public chartColors: Array<any>;
  public chartOptions: any;
  @Input('t1') t1: number;
  @Input('qy') qy: number;
  @Input('t2') t2: number;
  @Input('hy') hy: number;
  @Input('t3') t3: number;
  @Input('ft') ft: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.t1.currentValue || changes.qy.currentValue || changes.t2.currentValue || changes.hy.currentValue
      || changes.t3.currentValue || changes.ft.currentValue) {
      this.init(this.t1, this.qy, this.t2, this.hy, this.t3, this.ft);
    }
  }

  ngOnInit() {
    this.init();
  }

  init(t1?, qy?, t2?, hy?, t3?, ft?) {
    this.chartType = 'bar';

    this.chartDatasets = [
      { data: [t1, qy, t2, hy, t3, ft], label: 'Performance Report' }
    ];

    this.chartLabels = ['T1', 'QY', 'T2', 'HY', 'T3', 'FT'];

    this.chartColors = [
      {
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2,
      }
    ];

    this.chartOptions = {
      responsive: true
    };
  }
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}
