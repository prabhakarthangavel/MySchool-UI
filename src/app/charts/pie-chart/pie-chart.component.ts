import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnChanges, OnInit {
  constructor(private ref: ChangeDetectorRef) { }
  @Input('present') present: number;
  @Input('absent') absent: number;
  public chartType: string;
  public chartDatasets: Array<any>;
  public chartLabels: Array<any>;
  public chartColors: Array<any>;
  public chartOptions: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.present.currentValue || changes.absent.currentValue) {
      this.init(this.present, this.absent);
    }
  }

  ngOnInit() {
    this.init();
  }

  init(present?,absent?) {
    this.chartType = 'pie';
    this.chartDatasets = [{ data: [absent, present], label: 'Attandance Record' }];
    this.chartLabels = ['Absent', 'Present'];
    this.chartColors = [{
      backgroundColor: ['#F7464A', '#46BFBD'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1'],
      borderWidth: 2,
    }];
    this.chartOptions = { responsive: true };
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}

// , '#FDB45C', '#949FB1', '#4D5360'
// , '#FFC870', '#A8B3C5', '#616774'