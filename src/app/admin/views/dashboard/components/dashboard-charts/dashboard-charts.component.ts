import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard-charts',
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardChartsComponent implements OnInit,AfterViewInit {

  @ViewChild('myAreaChart') myAreaChart!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    Chart.register(...registerables);
    this.chart = new Chart(this.myAreaChart.nativeElement, {
      type: 'line',
      data: {
        labels: [
          'Mar 1',
          'Mar 2',
          'Mar 3',
          'Mar 4',
          'Mar 5',
          'Mar 6',
          'Mar 7',
          'Mar 8',
          'Mar 9',
          'Mar 10',
          'Mar 11',
          'Mar 12',
          'Mar 13',
        ],
        datasets: [
          {
            label: 'Sessions',
            //lineTension: 0.3,
            backgroundColor: 'rgba(2,117,216,0.2)',
            borderColor: 'rgba(2,117,216,1)',
            pointRadius: 5,
            pointBackgroundColor: 'rgba(2,117,216,1)',
            pointBorderColor: 'rgba(255,255,255,0.8)',
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(2,117,216,1)',
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: [
              10000,
              30162,
              26263,
              18394,
              18287,
              28682,
              31274,
              33259,
              25849,
              24159,
              32651,
              31984,
              38451,
            ],
          },
        ],
      },
      options: {
        scales: {
          x:
          {
            time: {
              unit: 'day',
            },
            grid: {
              display: false,
            },
            ticks: {
              maxTicksLimit: 7,
            },
          },

          y:
          {
            min: 0,
            max: 40000,
            ticks: {

              maxTicksLimit: 5,
            },
            grid: {
              color: 'rgba(0, 0, 0, .125)',
            },
          },

        },
        plugins: {
          legend: {
            display: false,
          },
        }

      },
    });

  }


}
