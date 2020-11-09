import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(MatDrawer, {static: true})
  private drawer: MatDrawer;

  drawerMode = 'over';

  constructor(private breakpointObserver: BreakpointObserver) {
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
      }
    });
  }

  private activateTabletLayout(): void {
    this.drawerMode = 'over';
    this.drawer.close();
  }

  private activateDesktopLayout(): void {
    // setTimeout is a hack - without it, this throws an
    // ExpressionHasChangedAfterItWasChecked error for some reasons...
    setTimeout(() => {
      this.drawerMode = 'side';
      this.drawer.open();
    });
  }

  toggleDrawer(): void {
    this.drawer.toggle();
  }
}
