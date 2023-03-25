import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.kesari.in/route/webHeaderMenu/';
  private menuItemsSubject$ = new BehaviorSubject<any>(null);

  menuItems$ = this.menuItemsSubject$.asObservable();

  constructor(private http: HttpClient) {}

  getMenuItems(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap(data => this.menuItemsSubject$.next(data))
    );
  }
}
