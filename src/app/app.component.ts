import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AddTodoDialogComponent} from './add-todo-dialog/add-todo-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(MatSidenav, {static: true})
  private sidenav: MatSidenav;

  sidenavMode: 'over' | 'push' | 'side' = 'over';

  constructor(
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {
  }

  ngAfterViewInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.TabletLandscape,
      Breakpoints.WebLandscape
    ])
    .subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.TabletLandscape]) {
          this.activateTabletLayout();
        }

        if (result.breakpoints[Breakpoints.WebLandscape]) {
          this.activateDesktopLayout();
        }
      } else {
        this.sidenavMode = 'over';
        this.sidenav.close();
      }
    });
  }

  private activateTabletLayout(): void {
    this.sidenavMode = 'over';
    this.sidenav.close();
  }

  private activateDesktopLayout(): void {
    // setTimeout is a hack - without it, this throws an
    // ExpressionHasChangedAfterItWasChecked error for some reasons...
    setTimeout(() => {
      this.sidenavMode = 'side';
      this.sidenav.open();
    });
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }

  openAddTodoDialog(): void {
    this.dialog.open(AddTodoDialogComponent, {
      width: '500px'
    });
  }
}
