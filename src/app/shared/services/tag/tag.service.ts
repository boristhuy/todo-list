import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Tag} from './tag.model';


@Injectable({
  providedIn: 'root'
})
export class TagService {
  private data = {
    loaded: false,
    tags: [] as Tag[]
  };
  private cache$ = new BehaviorSubject<Tag[]>([]);

  constructor(private httpClient: HttpClient) {}

  get tags$(): Observable<Tag[]> {
    if (!this.data.loaded) {
      this.fetchTags().subscribe();
      this.data.loaded = true;
    }

    return this.cache$.asObservable();
  }

  private fetchTags(): Observable<Tag[]> {
    return this.httpClient.get<Tag[]>('/tags').pipe(
      tap(tags => {
        this.data.tags = tags;
        this.cache$.next(this.data.tags);
      })
    );
  }
}
