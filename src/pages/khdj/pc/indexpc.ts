import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController,Nav,NavParams } from 'ionic-angular';
import  echarts from 'echarts';
import { CSList } from "./cslist";
import { KHDJService } from "../khdjService";
import { StorageService } from '../../../providers/StorageService';
import { Owner } from "../../login/user";

@Component({
	selector: 'index-zjpc',
	templateUrl: 'indexpc.html'
})
export class Index_pc {
	@ViewChild('container1') container: ElementRef;//与html中div #container1对应
	chart: echarts;
	initDQ: any;
	khjd: string;
	constructor(
		public navCtrl: NavController,
		public khdjService: KHDJService,
		private storageService: StorageService,
		public navParams: NavParams
	) {
		this.initDQ = ["瓯江口", "经开区", "苍南县", "泰顺县", "平阳县", "文成县", "永嘉县", "乐清市", "瑞安市", "洞头区", "瓯海区", "龙湾区", "鹿城区"];
		this.khjd = this.navParams.get("khjd");
	}

	ionViewDidLoad() {
		let ctx = this.container.nativeElement;
		this.chart = echarts.init(ctx);
		this.chart.on("click", this.eConsole,this);
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
			xAxis: {
				type: "value",
				boundaryGap: [0, 0.01],
				min: 0,
				max: 100
			},
			yAxis: {
				type: 'category',
				axisLabel:{
					margin:2,
					textStyle:{
						align:'right'
					}
				}
				//data: this.initDQ
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
						barBorderRadius: [0, 10, 10, 0],
						label: {
							show: true,//是否展示
							position: 'right',
							textStyle: {
								fontWeight: 'bolder',
								fontSize: '12',
								fontFamily: '微软雅黑',
								
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
		let user = this.storageService.read<Owner>('user');
		this.khdjService.getcsbyssqx(user.SSQXID).subscribe(data => {
			var zf = { yAxis: { type: 'category', data: [] }, series: [{ data: [] }] };
			data.forEach(ssqx => {
				this.khdjService.getAllcsCount(ssqx).subscribe(
					res => {
						var cszs = 0;
						if (res.count != "null") {
							cszs = parseInt(res.count);
							this.khdjService.getAmountAllNotCompleted(this.khjd, ssqx).subscribe(resData => {
								var wwctj = 0;
								if (resData.amount != null) {
									wwctj = parseInt(resData.amount);
								}
								var zpf = 100 - (wwctj / cszs * 100);
								zf.yAxis.data.push(res.ssqx);
								zf.series[0].data.push({value:zpf.toFixed(2),name: res.ssqx,khjd: this.khjd});
								this.chart.setOption(zf);
							})
						}
					}
				)
			});

		});
	}

	eConsole(param) {
		this.navCtrl.push(CSList, { "ssqx": param.data.name, "khjd":param.data.khjd });
	}
}
