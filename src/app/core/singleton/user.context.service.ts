import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserContextService {
  // ── reactive state ─────────────────────────────
  private readonly profileSubject =
    new BehaviorSubject<any | null>(null);

  private readonly notificationsSubject =
    new BehaviorSubject<Notification[]>([]);

  private readonly areasSubject =
    new BehaviorSubject<any[]>([]);

  
  // ─── public read-only streams ────────────────────
  readonly areas$: Observable<any[]> = 
    this.areasSubject.asObservable();

  

  readonly profile$: Observable<any | null> =
    this.profileSubject.asObservable();

  readonly notifications$: Observable<any[]> =
    this.notificationsSubject.asObservable();

  // ── write API ───────────────────────────────────
  setProfile(profile: any): void {
    this.profileSubject.next(profile);
  }

  setNotifications(notifications: any[]): void {
    this.notificationsSubject.next(notifications);
  }

  setAreas(areas: any[]): void {
    this.areasSubject.next(areas)  
  }

  

  // ── lifecycle helpers ───────────────────────────
  clear(): void {
    this.profileSubject.next(null);
    this.notificationsSubject.next([]);
    this.areasSubject.next([]);
  }
}
