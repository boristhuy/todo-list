import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {NotificationService} from './shared/services/notification/notification.service';
import {MatSnackBar} from '@angular/material/snack-bar';

const DEFAULT_SNACKBAR_ACTION = 'DISMISS';

const DEFAULT_SNACKBAR_CONFIG = {
  duration: 5000
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSidenav, {static: true})
  private sidenav: MatSidenav;

  viewMode: 'handset' | 'web' = 'handset';
  sidenavMode: 'over' | 'push' | 'side' = 'over';

  constructor(
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit(): void {
    this.notificationService.notification$.subscribe(notification => {
      const message = notification.message;
      const action = notification.action || DEFAULT_SNACKBAR_ACTION;
      const config = Object.assign((notification.config || {}), DEFAULT_SNACKBAR_CONFIG);

      this.snackBar.open(message, action, config);
    });
  }

  ngAfterViewInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.Medium,
      Breakpoints.Large
    ])
    .subscribe(result => {
      if (result.matches) {
        this.activateWebLayout();
      } else {
        this.activateHandsetLayout();
      }
    });
  }

  private activateHandsetLayout(): void {
    this.viewMode = 'handset';
    this.sidenavMode = 'over';
    this.sidenav.close();
  }

  private activateWebLayout(): void {
    // setTimeout is a hack - without it, this throws an
    // ExpressionHasChangedAfterItWasChecked error for some reasons...
    setTimeout(() => {
      this.viewMode = 'web';
      this.sidenavMode = 'side';
      this.sidenav.open();
    });
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }
}
