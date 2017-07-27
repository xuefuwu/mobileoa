import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as echarts from 'echarts';

@Component({
  selector: 'index-sjdc',
  templateUrl: 'indexdc.html'
})
export class Index_dc {
  @ViewChild('container1') container: ElementRef;//与html中div #container1对应
  chart :any;
  constructor(public navCtrl: NavController) {
    //let basic_lines = echarts.init(document.getElementById(this.chartId));
  }
  ionViewDidLoad() {

    let ctx = this.container.nativeElement;
    this.chart = echarts.init(ctx);
    this.chart.setOption(
      {
        backgroundColor: '#fff',

        title: {
          text: 'Customized Pie',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 274, name: '联盟广告' },
              { value: 235, name: '视频广告' },
              { value: 400, name: '搜索引擎' }
            ].sort(function (a, b) { return a.value - b.value }),
            roseType: 'angle',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    );

    // $('#p').html("hwphvaovj");        jquery 使用

  }
}
