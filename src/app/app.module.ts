import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {TodoListComponent} from './todo-list/todo-list.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {HttpClientModule} from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {EditTodoFormComponent} from './shared/forms/edit-todo-form/edit-todo-form.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {RouterModule} from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TagListComponent} from './tag-list/tag-list.component';
import {AddTodoDialogComponent} from './todo-list/add-todo-dialog/add-todo-dialog.component';
import {EditTodoDialogComponent} from './todo-list/edit-todo-dialog/edit-todo-dialog.component';

const routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: TodoListComponent
  },
  {
    path: 'tags',
    component: TagListComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    ToolbarComponent,
    EditTodoDialogComponent,
    AddTodoDialogComponent,
    EditTodoFormComponent,
    SidenavComponent,
    TagListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
