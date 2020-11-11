import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Todo} from '../shared/services/todo/todo.model';
import {TodoService} from '../shared/services/todo/todo.service';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {TagService} from '../shared/services/tag/tag.service';
import {Observable} from 'rxjs';
import {Tag} from '../shared/services/tag/tag.model';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

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
  readonly TODO_TITLE_MAX_LENGTH = '60';

  @ViewChild('tagInput')
  tagInput: ElementRef<HTMLInputElement>;

  availableTags$: Observable<Tag[]>;
  form: FormGroup;

  constructor(
    private tagService: TagService,
    private todoService: TodoService,
    private formBuilder: FormBuilder
  ) {
  }

  get tagsControl(): AbstractControl {
    return this.form.get('tags');
  }

  ngOnInit(): void {
    this.availableTags$ = this.tagService.tags$;

    this.form = this.formBuilder.group({
      title: [''],
      tags: [[]]
    });
  }

  addTodo(): void {
    const todoFormValue = this.form.value;
    const newTodo = {...newTodoTemplate, ...todoFormValue};
    this.todoService.addTodo(newTodo).subscribe();
  }

  removeTag(removedTag: Tag): void {
    let tags = this.tagsControl.value as Tag[];
    tags = tags.filter(tag => tag.id !== removedTag.id);

    this.tagsControl.setValue(tags);
  }

  addTag(event: MatAutocompleteSelectedEvent): void {
    const selectedTag = event.option.value;
    const tags = this.tagsControl.value as Tag[];

    const index = tags.findIndex(tag => tag.id === selectedTag.id);
    if (index < 0) {
      tags.push(selectedTag);
    }

    this.tagInput.nativeElement.value = '';
  }
}
