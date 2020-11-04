import {Component, OnInit} from '@angular/core';
import {Todo, TodoListService} from './todo-list.service';
import {Observable} from 'rxjs';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {map, skip} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {EditTodoDialogComponent} from '../edit-todo-dialog/edit-todo-dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  pendingTodos$: Observable<Todo[]>;
  completedTodos$: Observable<Todo[]>;

  constructor(
    private todoListService: TodoListService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.pendingTodos$ = this.todoListService.todos$.pipe(
      skip(1),
      map(todos => todos.filter(todo => !todo.completed))
    );

    this.completedTodos$ = this.todoListService.todos$.pipe(
      skip(1),
      map(todos => todos.filter(todo => todo.completed))
    );
  }

  updateTodoStatus(change: MatCheckboxChange, todo: Todo): void {
    const completed = change.checked;
    this.todoListService.updateTodoStatus(todo.id, completed).subscribe();
  }

  deleteTodo(todo: Todo): void {
    this.todoListService.deleteTodo(todo.id).subscribe();
  }

  openEditTodoDialog(todo: Todo): void {
    this.dialog.open(EditTodoDialogComponent, {
      data: { todo },
      width: '500px'
    });
  }

}
