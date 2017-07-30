import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as echarts from 'echarts';
import { KHDJService } from "./khdjService";

@Component({
	selector: 'index-zjpc',
	templateUrl: 'indexpc.html'
})
export class Index_pc {
	@ViewChild('container1') container: ElementRef;//与html中div #container1对应
	chart: any;
	initDQ: any;
	constructor(public navCtrl: NavController, public khdjService: KHDJService) {
		this.initDQ = ["瓯江口", "经开区", "苍南县", "泰顺县", "平阳县", "文成县", "永嘉县", "乐清市", "瑞安市", "洞头区", "瓯海区", "龙湾区", "鹿城区"];


	}

	ionViewDidLoad() {
		let ctx = this.container.nativeElement;
		this.chart = echarts.init(ctx);
		this.chart.setOption({
			title: {
				x: "center",
				text: '消防检查考核评分'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				x: "left",
				data: ['结果评分']
			},
			//calculable : true,
			yAxis: {
				type: "value",
				boundaryGap: [0, 0.01],
				min: 0,
				max: 100
			},
			xAxis: {
				type: 'category',
				data: this.initDQ
			},
			series: [{
				name: '结果评分',
				type: 'bar',
				data: [],
				itemStyle: {
					//柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
					emphasis: {
						barBorderRadius: 30
					},
					normal: {
						//柱形图圆角，初始化效果
						barBorderRadius: [10, 10, 0, 0],
						label: {
							show: true,//是否展示
							position: 'top',
							textStyle: {
								fontWeight: 'bolder',
								fontSize: '12',
								fontFamily: '微软雅黑'
							}
						},
						color: function (params) {
							if (params.value > 90) {
								return "#2b821d";
							} else if (params.value > 75 && params.value <= 90) {
								return "#005eaa";
							} else if (params.value > 60 && params.value <= 75) {
								return "#e5cf0d";
							} else if (params.value <= 60) {
								return "#c12e34";
							}
						}
					}
				},
				markLine: {
					data: [
						{ type: 'average', name: '平均值' }
					],
					itemStyle: {
						normal: {
							color: "#5ab1ef"
						}
					}
				}
			}]
		});

		// $('#p').html("hwphvaovj");        jquery 使用
		var jsondata = this.khdjService.getcsbyssqx();
	}
}
