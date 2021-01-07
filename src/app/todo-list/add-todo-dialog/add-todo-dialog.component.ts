import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Todo} from '../../shared/services/todo/todo.model';
import {TodoService} from '../../shared/services/todo/todo.service';

const newTodoTemplate: Todo = {
  title: '',
  tags: [],
  completed: false
};

@Component({
  selector: 'app-add-todo-dialog',
  templateUrl: './add-todo-dialog.component.html',
  styleUrls: ['./add-todo-dialog.component.css']
})
export class AddTodoDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      todo: {
        title: '',
        tags: []
      }
    });
  }

  addTodo(): void {
    const todoFormValue = this.form.get('todo').value;
    const newTodo = {...newTodoTemplate, ...todoFormValue};
    this.todoService.addTodo(newTodo).subscribe();
  }
}
