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

  // ── non-reactive state ──────────────────────────
  private areas: any[] = [];

  // ── public read-only streams ────────────────────
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
    this.areas = areas;
  }

  // ── snapshot reads ──────────────────────────────
  getProfileSnapshot(): any | null {
    return this.profileSubject.value;
  }

  getNotificationsSnapshot(): Notification[] {
    return this.notificationsSubject.value;
  }

  getAreas(): any[] {
    return this.areas;
  }

  // ── lifecycle helpers ───────────────────────────
  clear(): void {
    this.profileSubject.next(null);
    this.notificationsSubject.next([]);
    this.areas = [];
  }
}
