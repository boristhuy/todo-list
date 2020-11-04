import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddTodoDialogComponent} from '../add-todo-dialog/add-todo-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openAddTodoDialog(): void {
    this.dialog.open(AddTodoDialogComponent, {
      width: '500px'
    });
  }

}
