import {AfterViewInit, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {

  @ViewChild(MatSidenav, {static: true})
  private sidenav: MatSidenav;

  viewMode: 'handset' | 'web' = 'handset';
  sidenavMode: 'over' | 'push' | 'side' = 'over';

  constructor(private breakpointObserver: BreakpointObserver) {
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
