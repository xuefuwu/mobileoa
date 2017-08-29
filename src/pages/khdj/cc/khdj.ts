import { ModalController, Platform, NavParams, NavController, ViewController } from 'ionic-angular';
import { Component, ComponentFactoryResolver, ViewChildren, ViewContainerRef, QueryList } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { KHDJService } from "../khdjService";
import _ from 'underscore/underscore';
import { KHDJ } from "../../../modules/khdj";
import { FileUpdater } from "../../../providers/FileUpdater";
import { UploadImg } from "../../../components/uploadimg.component";
@Component({
    selector: 'khdj-Modal',
    templateUrl: 'khdj.html'
})
export class KHDJModal {
    currentItem: any;
    khcs: any;
    csid: string;
    khjd: string;
    items: any = [];
    jcjg: any = [];
    khdj: KHDJ = new KHDJ();
    showupload: any;
    khxc: any = [];
    @ViewChildren('domImgs', { read: ViewContainerRef }) domImgs: QueryList<ViewContainerRef>;
    constructor(
        public platform: Platform,
        public params: NavParams,
        public navCtrl: NavController,
        public viewController: ViewController,
        public khdjService: KHDJService,
        private vcr: ViewContainerRef,
        private cfr: ComponentFactoryResolver
    ) {
        this.khcs = this.params.get("khcs");
        this.csid = this.params.get("csid");
        this.khjd = this.params.get("khjd");
        this.initKHX(this.khjd, this.csid);
        this.currentItem = { khid: this.csid, khjd: this.khjd, imgkey: 'khxc', status: this.khcs.STATUS };
    }

    addComponent(item: any) {
        let com = this.cfr.resolveComponentFactory(UploadImg);
        this.domImgs.forEach(e => {
            if (e.element.nativeElement.className == "domImg" + item.id) {
                let component = e.createComponent(com);
                if (item.imgs != null) {
                    component.instance.imgsList = true;
                    component.instance.Imgs = item.imgs;
                }
                component.instance.Item = item;
            }
        })
    }
    removeComponent(item: any) {
        this.domImgs.forEach(e => {
            if (e.element.nativeElement.className == "domImg" + item.id) {
                let component = e.clear();
            }
        })
    }

    initKHX(khjd: string, csid: string) {
        this.khdjService.getkhtz(khjd, csid).subscribe(res => {
            var jcnr = _.sortBy(_.filter(res, function (item) { return item.nrx != null }), function (item) { return parseInt(item.nrpx); });
            _.each(jcnr, function (item, key) {
                var unqualifieditem = _.has(_.find(res, function (e) { return _.has(e, "xzgx") }).xzgx,"unqualified").unqualified;
                this.items.push({
                    khid: csid,
                    id: item.nrpx,
                    key: "KHX" + item.nrpx,
                    imgkey: "khximg" + item.nrpx,
                    text: item.nrx,
                    value: item.khx,
                    imgs: item.imgs,
                    jcdf: item.khx == "合格" ? item.nrxval : 0,
                    jcpf: item.nrxval,
                    correction: { enable: item.khx == "不合格", completed: _.find(unqualifieditem, function (e) { return e.id == item.nrpx }) == null ? _.find(unqualifieditem, function (e) { return e.id == item.nrpx }) == null : _.find(unqualifieditem, function (e) { return e.id == item.nrpx }).status }
                });
            }, this);
            _.each(_.filter(res, function (e) { return _.has(e, "imgs") && !_.has(e, "nrpx") }), function (item, key) {
                this.currentItem.imgs = item.imgs;
            }, this);
            this.jcjg.push({
                khid: csid,
                id: 'jcr',
                key: 'jcr',
                text: '检查人',
                value: _.find(res, function (e) { return _.has(e, "jcr") }).jcr == "null" ? "" : _.find(res, function (e) { return _.has(e, "jcr") }).jcr
            });
            this.jcjg.push({
                khid: csid,
                id: 'ysr',
                key: 'ysr',
                text: '审核人',
                value: _.find(res, function (e) { return _.has(e, "ysr") }).ysr == "null" ? "" : _.find(res, function (e) { return _.has(e, "ysr") }).ysr
            });
            this.jcjg.push({
                khid: csid,
                id: 'status',
                key: 'status',
                text: '检查结果',
                value: this.currentItem.status
            })
            this.currentItem.status = _.find(res, function (e) { return _.has(e, "status") }).status;
        });
    }
    dismiss() {
        this.viewController.dismiss();
    }
    submit() {
        var res = { 'jcnr': this.items, 'jcjg': this.jcjg };
        this.khdjService.postkhdj(JSON.stringify(res)).subscribe(res => {
            console.log(res);
        });
        this.viewController.dismiss();
    }
    upload(fileid: string) {
        this.navCtrl.push(FileUpdater, { "fileid": "khximg" + fileid });
    }
    optionchange(ev, item) {
        if (ev == "不合格") {
            this.addComponent(item);
            let changeitem = this.items.find(e => {
                return e.key == item.key;
            });
            changeitem.jcdf = 0;
            changeitem.correction.enable = true;
            let jcstatus = this.jcjg.find(e => {
                return e.key == "status";
            });
            jcstatus.value = "待整改";
        } else if (ev == "合格") {
            this.removeComponent(item);
            let changeitem = this.items.find(e => {
                return e.key == item.key;
            });
            changeitem.jcdf = changeitem.jcpf;
            changeitem.correction.enable = false;
        }
    }
    correct(ev, item) {

        let changeitem = this.items.find(e => {
            return e.key == item.key;
        });
        changeitem.correction.completed = ev.checked;
        if (!ev.checked) {
            let jcstatus = this.jcjg.find(e => {
                return e.key == "status";
            });
            jcstatus.value = "待整改";
        }
    }

}