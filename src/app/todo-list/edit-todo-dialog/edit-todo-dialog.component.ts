import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TodoService} from '../../shared/services/todo/todo.service';
import {Todo} from '../../shared/services/todo/todo.model';

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
  form: FormGroup;

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.todo = {...this.data.todo};

    this.form = this.formBuilder.group({
      todo: {
        title: this.todo.title,
        tags: [...this.todo.tags]
      }
    });
  }

  editTodo(): void {
    const todoFormValue = this.form.get('todo').value;
    const updatedTodo = {...this.todo, ...todoFormValue};
    this.todoService.updateTodo(updatedTodo).subscribe();
  }
}
