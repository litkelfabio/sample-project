import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Logs{
  id?: string,
  name: string,
  date: number,
  location: string,
  
}

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private logs: Observable<Logs[]>;
  private LogsCollections: AngularFirestoreCollection<Logs>;

  constructor(private afs: AngularFirestore) {
    this.LogsCollections = this.afs.collection<Logs>('Logs');
    this.logs = this.LogsCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
   }
    
   getLogs(): Observable<Logs[]> {
    return this.logs;
  }

  getLog(id: string): Observable<Logs> {
    return this.LogsCollections.doc<Logs>(id).valueChanges().pipe(
      take(1),
      map(logs => {
        logs.id = id;
        return logs
      })
    );
  }

  addLogs(logs: Logs): Promise<DocumentReference> {
    return this.LogsCollections.add(logs);
  }
}
