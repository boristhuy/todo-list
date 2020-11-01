import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private data = {
    loaded: false,
    todos: [] as Todo[]
  };

  private cache$ = new BehaviorSubject<Todo[]>([]);

  constructor(private httpClient: HttpClient) {}

  get todos$(): Observable<Todo[]> {
    if (!this.data.loaded) {
      this.fetchTodos().subscribe();
      this.data.loaded = true;
    }

    return this.cache$.asObservable();
  }

  private fetchTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>('/todos').pipe(
      tap(todos => {
        this.data.todos = todos;
        this.cache$.next(this.data.todos);
      })
    );
  }

  updateTodoStatus(id: number, completed: boolean): Observable<any> {
    const todo = this.data.todos.find(item => item.id === id);
    todo.completed = completed;

    return this.httpClient.put(`/todos/${id}`, {...todo}).pipe(
      tap(_ => this.cache$.next([... this.data.todos]))
    );
  }

  deleteTodo(id: number): Observable<any> {
    this.data.todos = this.data.todos.filter(item => item.id !== id);

    return this.httpClient.delete(`/todos/${id}`).pipe(
      tap(_ => this.cache$.next([...this.data.todos]))
    );
  }
}
