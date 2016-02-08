import {bootstrap} from "angular2/platform/browser";
import {Component, Input} from "angular2/core";
import {TodoItem} from "./item";
import {TodoService} from '../services/service';
import {StatusPipe} from '../pipes/status';

@Component({
    selector: 'todo-list',
    pipes: [StatusPipe],
    templateUrl: './directives/list.tpl.html',
    directives: [TodoItem]
})
export class TodoList{
    @Input() status;
    @Input() tasks;
    public componentTodos;
    
    constructor (public todoService: TodoService) {
        
        // this.todoService.todos$.subscribe(uploadedTodos => {
        //     console.log(uploadedTodos);
        //     this.componentTodos = uploadedTodos
        // });
        // this.todoService.getList();
        // todoService.todos$.subscribe(uploadedTodos => this.componentTodos = uploadedTodos);
        // todoService.getList();
        
        // console.log('this.componentTodos', this.componentTodos);
    };
}

// bootstrap(TodoList);