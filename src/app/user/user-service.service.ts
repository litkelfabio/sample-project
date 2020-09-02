import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';

export interface User{
  id?: string,
  name: string,
  barangay: string,
  street: string,
  houseno: number;
  municipality: string;
  role: string;
  email: string;
  password: string;
  createdAt: number;
  cp: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private user: Observable<User[]>;
  private UserCollections: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.UserCollections = this.afs.collection<User>('Users');
    this.user = this.UserCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
   }
    
   getUsers(): Observable<User[]> {
    return this.user;
  }

  getUser(id: string): Observable<User> {
    return this.UserCollections.doc<User>(id).valueChanges().pipe(
      take(1),
      map(user => {
        user.id = id;
        return user
      })
    );
  }

  addUser(User: User): Promise<DocumentReference> {
    return this.UserCollections.add(User);
  }
 
  updateUser(User: User): Promise<void> {
    return this.UserCollections.doc(User.id).update({ name: User.name, 
      barangay: User.barangay, 
      street: User.street,
      houseno: User.houseno,
      municipality: User.municipality,
      role: User.role ,
      email:User.email,
      password: User.password,
      cp: User.cp
    });
  }
 
  deleteUser(id: string): Promise<void> {
    return this.UserCollections.doc(id).delete();
  }
  
  getUserByEmail(email: string): Observable<User[]> {
    this.UserCollections = this.afs.collection<User>('Users', ref => ref.where('email', '==' , email ))
    this.user = this.UserCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id; 
          return { id, ...data };
        });
      })
    );
    return this.user; 
  }
}
