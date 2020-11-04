import {Component, OnInit} from '@angular/core';
import {Todo, TodoListService} from '../todo-list/todo-list.service';

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.css']
})
export class AddTodoDialogComponent implements OnInit {

  todo: Todo = { id: undefined, title: '', completed: false };

  constructor(private todoListService: TodoListService) { }

  ngOnInit(): void {
  }

  addTodo(): void {
    if (this.todo.title) {
      this.todoListService.addTodo(this.todo).subscribe();
    }
  }
}
