import {bootstrap} from "angular2/platform/browser";
import {Component, OnInit} from "angular2/core";
import {TodoList} from "./list.ts";
import {TodoService} from "../services/service";
import {Task} from "../models/task";
import {HTTP_BINDINGS} from 'angular2/http';
import {Notify} from '../directives/notify';
import {Notification} from '../services/notify';

@Component({
    selector: 'todo',
    templateUrl: './directives/todo.tpl.html',
    directives: [TodoList, Notify]
})


class Todo implements OnInit {
    taskInput:Task = new Task("", "", "", "", new Date());
    public type;
    public componentTodos;
    
    ngOnInit() {
        this.todoService.todos$.subscribe(uploadedTodos => {
            console.log('ddddddddd', uploadedTodos);
            this.componentTodos = uploadedTodos;
        });
        this.todoService.getList();
    }
    
    constructor(public todoService: TodoService, public notification: Notification) {
        // todoService.todos$.subscribe(uploadedTodos => this.componentTodos = uploadedTodos);
        // todoService.getList();
        
        // console.log('this.componentTodos', this.componentTodos);
    };
    
    /**
     * addItem
     */
    public addItem() {
        // console.log('taskInput', this.taskInput);
        this.todoService.addTask(this.taskInput);
        this.taskInput = new Task("", "", "", "", new Date());
        this.notification.show();
    }
    
    public selectType(type:string) {
        this.type = type;
    }
}

bootstrap(Todo, [TodoService, Notification, HTTP_BINDINGS]).catch(console.error);