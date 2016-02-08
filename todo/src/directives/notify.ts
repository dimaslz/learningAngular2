import {bootstrap} from "angular2/platform/browser";
import {Component, Input} from "angular2/core";
import {Notification} from "../services/notify";

@Component({
    selector: 'notify',
    templateUrl: './directives/notify.tpl.html',
})
export class Notify{
    private notify: Boolean;
    timeout = null;
    
    constructor (public notification: Notification) {
        this.notification.notify.subscribe(uploaded => {
            this.notify = uploaded;
            this.createTimeout();
        });
    };
    
    private clear() {
        console.log('dfasdf');
        clearTimeout(this.timeout);
    }
    
    private createTimeout() {
        this.timeout = setTimeout(() => {
            this.notify = !this.notify;
        }, 2000);
    }
}