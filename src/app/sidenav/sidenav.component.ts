import {Component, OnInit, ViewEncapsulation} from '@angular/core';

interface NavigationItem {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit {

  readonly navigationItems: NavigationItem[] = [
    {
      path: '/tasks',
      label: 'Tasks',
      icon: 'fact_check'
    },
    {
      path: '/calendar',
      label: 'Calendar',
      icon: 'today'
    },
    {
      path: '/tags',
      label: 'Tags',
      icon: 'label'
    },
    {
      path: '/stats',
      label: 'Statistics',
      icon: 'insert_chart'
    },
    {
      path: '/about',
      label: 'About',
      icon: 'info'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
