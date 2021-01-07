import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddTodoDialogComponent} from '../todo-list/add-todo-dialog/add-todo-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output()
  menuClick = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openAddTodoDialog(): void {
    this.dialog.open(AddTodoDialogComponent, {
      width: '500px'
    });
  }

}
