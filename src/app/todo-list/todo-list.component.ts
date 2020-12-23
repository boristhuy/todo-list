import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {MatDialog} from '@angular/material/dialog';
import {EditTodoDialogComponent} from '../edit-todo-dialog/edit-todo-dialog.component';
import {TodoService} from '../shared/services/todo/todo.service';
import {Todo} from '../shared/services/todo/todo.model';
import {NotificationService} from '../shared/services/notification/notification.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<Todo[]>;

  constructor(
    private todoService: TodoService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.todos$ = this.todoService.todos$;
  }

  updateTodoStatus(change: MatCheckboxChange, todo: Todo): void {
    const completed = change.checked;
    this.todoService.updateTodo({...todo, completed}).subscribe();
  }

  deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo.id).subscribe(val => {
      this.notificationService.sendNotification({message: 'Task was successfully deleted'});
    });
  }

  openEditTodoDialog(todo: Todo): void {
    this.dialog.open(EditTodoDialogComponent, {
      data: { todo },
      width: '500px'
    });
  }

}
