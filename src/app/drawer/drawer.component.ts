import {Component, OnInit} from '@angular/core';

interface NavigationItem {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit {

  readonly navigationItems: NavigationItem[] = [
    { path: 'tasks', label: 'Tasks', icon: 'fact_check' },
    { path: '', label: 'Calendar', icon: 'today' },
    { path: '', label: 'Tags', icon: 'label' },
    { path: '', label: 'Statistics', icon: 'insert_chart' },
    { path: '', label: 'Trash', icon: 'delete' },
    { path: '', label: 'About', icon: 'info' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
