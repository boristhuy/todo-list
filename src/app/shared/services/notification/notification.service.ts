import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {AppNotification} from './notification.model';

const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private cache$ = new ReplaySubject<AppNotification>(CACHE_SIZE);

  get notification$(): Observable<AppNotification> {
    return this.cache$.asObservable();
  }

  sendNotification(notification: AppNotification): void {
    this.cache$.next(notification);
  }
}
