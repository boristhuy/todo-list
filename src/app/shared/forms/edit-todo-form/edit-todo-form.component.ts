import {Component, ElementRef, forwardRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Tag} from '../../services/tag/tag.model';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TagService} from '../../services/tag/tag.service';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-edit-todo-form',
  templateUrl: './edit-todo-form.component.html',
  styleUrls: ['./edit-todo-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditTodoFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EditTodoFormComponent),
      multi: true
    }
  ]
})
export class EditTodoFormComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private readonly unsubscribe$ = new Subject<void>();

  readonly TODO_TITLE_MAX_LENGTH = '60';

  availableTags$: Observable<Tag[]>;

  @ViewChild('tagInput')
  tagInput: ElementRef<HTMLInputElement>;

  form: FormGroup;

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(
    private tagService: TagService,
    private formBuilder: FormBuilder
  ) {
  }

  get valid(): boolean {
    return this.form.valid;
  }

  get tagsControl(): AbstractControl {
    return this.form.get('tags');
  }

  ngOnInit(): void {
    this.availableTags$ = this.tagService.tags$;

    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      tags: ['']
    });

    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(value => {
      this.onChange(value);
      this.onTouched();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  removeTag(removedTag: Tag): void {
    let tags = this.tagsControl.value as Tag[];
    tags = tags.filter(tag => tag.id !== removedTag.id);

    this.tagsControl.setValue(tags);
  }

  addTag(event: MatChipInputEvent): void {
    const {input, value} = event;
    const tags = this.tagsControl.value as Tag[];

    if ((value || '').trim()) {
      const index = tags.findIndex(tag => tag.title === value);
      if (index < 0) {
        tags.push({title: value});
      }
    }

    if (input) {
      input.value = '';
    }
  }

  selectTag(event: MatAutocompleteSelectedEvent): void {
    const selectedTag = event.option.value;
    const tags = this.tagsControl.value as Tag[];

    const index = tags.findIndex(tag => tag.id === selectedTag.id);
    if (index < 0) {
      tags.push(selectedTag);
    }

    this.tagInput.nativeElement.value = '';
  }

  registerOnChange(fn): void {
    this.onChange = fn;
  }

  writeValue(value): void {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();

    this.form.updateValueAndValidity();
  }

  registerOnTouched(fn): void {
    this.onTouched = fn;
  }

  validate(_: FormControl): ValidationErrors | null  {
    return this.form.valid ? null : { invalid: true };
  }
}
