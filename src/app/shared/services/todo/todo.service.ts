import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Todo} from './todo.model';

const TODO_API_BASE_ENDPOINT = '/api/todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
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
    return this.httpClient.get<Todo[]>(TODO_API_BASE_ENDPOINT).pipe(
      tap(todos => {
        this.data.todos = todos;
        this.cache$.next(this.data.todos);
      })
    );
  }

  addTodo(newTodo: Todo): Observable<any> {
    return this.httpClient.post<Todo>(TODO_API_BASE_ENDPOINT, {...newTodo}).pipe(
      tap(todo => {
        this.data.todos.push(todo);
        this.cache$.next([...this.data.todos]);
      })
    );
  }

  updateTodo(editedTodo: Todo): Observable<any> {
    const index = this.data.todos.findIndex(item => item.id === editedTodo.id);
    if (index < 0) {
      return;
    }

    const todo = {...this.data.todos[index], ...editedTodo};
    this.data.todos[index] = todo;

    return this.httpClient.put(`${TODO_API_BASE_ENDPOINT}/${todo.id}`, {...todo}).pipe(
      tap(_ => this.cache$.next([...this.data.todos]))
    );
  }

  deleteTodo(id: number): Observable<any> {
    this.data.todos = this.data.todos.filter(item => item.id !== id);

    return this.httpClient.delete(`${TODO_API_BASE_ENDPOINT}/${id}`).pipe(
      tap(_ => this.cache$.next([...this.data.todos]))
    );
  }
}
