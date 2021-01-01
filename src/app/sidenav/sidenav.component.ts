import {Component, OnInit, ViewEncapsulation} from '@angular/core';

interface NavigationItem {
  path: string;
  label: string;
  icon: string;
  disabled?: boolean;
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
      icon: 'today',
      disabled: true
    },
    {
      path: '/tags',
      label: 'Tags',
      icon: 'label',
      disabled: true
    },
    {
      path: '/stats',
      label: 'Statistics',
      icon: 'insert_chart',
      disabled: true
    },
    {
      path: '/about',
      label: 'About',
      icon: 'info',
      disabled: true
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
