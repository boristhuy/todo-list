import {Component, OnInit} from '@angular/core';
import {Todo, TodoListService} from './todo-list.service';
import {Observable} from 'rxjs';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {skip, tap} from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(private todoListService: TodoListService) {
  }

  ngOnInit(): void {
    this.todos$ = this.todoListService.todos$.pipe(skip(1));
  }

  todoStatusChanged(change: MatCheckboxChange, todoId: number): void {
    const completed = change.checked;
    this.todoListService.updateTodoStatus(todoId, completed).subscribe();
  }
}
