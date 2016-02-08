import {bootstrap} from "angular2/platform/browser";
import {Component, Input, Output, EventEmitter} from "angular2/core";

@Component({
    selector: 'todo-item',
    templateUrl: './directives/item.tpl.html'
})

export class TodoItem{
    @Input() item;
    @Output() toggle = new EventEmitter();
}