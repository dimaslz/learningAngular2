import {Injectable} from "angular2/core";
import {TodoModel} from "../models/model";
import {Task} from "../models/task";
// import {HTTP_BINDINGS} from 'angular2/http';
import {Http, Headers} from 'angular2/http';
import {HTTP_BINDINGS} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {
    todos$: Observable<Array<Task>>;
    private _todosObserver: any;
    private _dataStore : {
        todos: Array<Task>
    };
    
    public todos = [];
    
    constructor(public http: Http) {
        this.todos$ = new Observable(observer => this._todosObserver = observer).share();
        
        this._dataStore = { todos: [] };
    };
    
    // public todos = [
    //     new TodoModel("Item 1 - s"),
    //     new TodoModel("Item 2 - c", "completed"),
    //     new TodoModel("Item 3 - s"),
    //     new TodoModel("Item 4 - c", "completed"),
    //     new TodoModel("Item 5 - s"),
    // ];
    
    public getList() {
        this.http.get('http://localhost:8081/api/list')
        .map((response) => {
            // return response.json().data;
            var data: Array<Task> = [];
            response.json().data.forEach(function(value, index) {
                // console.log('index, value', index, value);
                data.push(new Task(value.id, value.name, value.description, value.status, value.date));
            });
            
            return data;
        })
        .subscribe((data) => {
            
            this._dataStore.todos = data;
            // console.log('data--->   ', data);
            
            this._todosObserver.next(this._dataStore.todos);
        }, error => console.error('Could not load todos'));
    }
    
    addTask(task:Task) {
        var str = '';
        Object.getOwnPropertyNames(task).forEach(function(val, idx, array) {
            str += val + '=' + task[val]+'&';
        });
        let creds = JSON.stringify(str);
        
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('http://localhost:8081/api/add', creds, { headers: headers })
            .map(response => response.json()).subscribe(data => {
            this._dataStore.todos.push(task);   
            this._todosObserver.next(this._dataStore.todos);
        }, error => console.log('Could not create todo.'));
    }
    
    public addTodo(todo: TodoModel) {
        if(todo) {
            this.todos = [...this.todos, todo];
        }
    }
    
    
    toggleTodo(task:Task) {
        task.toggle();
        
        const i = this.todos.indexOf(task);
        this.todos = [
            ...this.todos.slice(0, i),
            task,
            ...this.todos.slice(i + 1)
        ];
    }
}