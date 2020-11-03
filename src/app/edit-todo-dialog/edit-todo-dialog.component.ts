import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Todo, TodoListService} from '../todo-list/todo-list.service';

interface DialogData {
  todo: Todo;
}

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.css']
})
export class EditTodoDialogComponent implements OnInit {
  todo: Todo;

  constructor(
    private todoListService: TodoListService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.todo = {...this.data.todo};
  }

  editTodo(): void {
    this.todoListService.editTodo(this.todo).subscribe();
  }

}
