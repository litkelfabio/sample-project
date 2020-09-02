import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';

export interface Citizen{
  id?: string,
  qr: string,
  name: string,
  date: number,
  barangay: string,
  street: string,
  houseno: number;
  municipality: string;
  status: string;
  cp: string;
  imgURL: string;
  imgID: string;
}

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  private citizen: Observable<Citizen[]>;
  private citizenCollections: AngularFirestoreCollection<Citizen>;

  constructor(private afs: AngularFirestore) {
    this.citizenCollections = this.afs.collection<Citizen>('Citizens');
    this.citizen = this.citizenCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
   }
   getAllCitizens(): Observable<Citizen[]> {
    this.citizenCollections = this.afs.collection<Citizen>('Citizens')
    this.citizen = this.citizenCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );  
    return this.citizen;
  }
    
   getCitizens(): Observable<Citizen[]> {
    this.citizen = this.afs.collection<Citizen>('Citizens', ref => ref.orderBy('name')
    .startAt('a' || 'A').endAt('z' ||'Z' + "\uf8ff")).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.citizen;
  }

  getCitizen(id: string): Observable<Citizen> {
    return this.citizenCollections.doc<Citizen>(id).valueChanges().pipe(
      take(1),
      map(Citizen => {
        Citizen.id = id;
        return Citizen
      })
    );
  }

  addCitizen(citizen: Citizen): Promise<DocumentReference> {
    return this.citizenCollections.add(citizen);
  }

  Addcitizen(citizen: Citizen): Promise<DocumentReference> {
    return this.citizenCollections.add(citizen);
  }
 
  updateCitizen(citizen: Citizen): Promise<void> {
    return this.citizenCollections.doc(citizen.id).update({ name: citizen.name,
       barangay: citizen.barangay, 
       street: citizen.street,
        houseno: citizen.houseno, 
        municipality: citizen.municipality, 
        status: citizen.status,
        cp: citizen.cp,
        imgID : citizen.imgID
      });
  }
 
  deleteCitizen(id: string): Promise<void> {
    return this.citizenCollections.doc(id).delete();
  }

  getCitizenByQR(qr: string): Observable<Citizen[]> {
    this.citizenCollections = this.afs.collection<Citizen>('Citizens', ref => ref.where ('qr', '==',qr ))
    this.citizen = this.citizenCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );  
    return this.citizen; 
  }

  getCitizenPui(): Observable<Citizen[]> {
    this.citizenCollections = this.afs.collection<Citizen>('Citizens', ref => ref.where ('status', '==','PUI' ))
    this.citizen = this.citizenCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );  
    return this.citizen; 
  }

  getCitizenCovid(): Observable<Citizen[]> {
    this.citizenCollections = this.afs.collection<Citizen>('Citizens', ref => ref.where ('status', '==','Covid Patient' ))
    this.citizen = this.citizenCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );  
    return this.citizen; 
  }

  getCitizenByName(name: string): Observable<Citizen[]> {
    this.citizenCollections = this.afs.collection<Citizen>('Citizens', ref => ref.where ('name', '>=',name ))
    this.citizen = this.citizenCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );  
    return this.citizen; 
  }

  

  getCitizenByExactName(name: string): Observable<Citizen[]> {
    this.citizenCollections = this.afs.collection<Citizen>('Citizens', ref => ref.where ('name', '==',name ))
    this.citizen = this.citizenCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );  
    return this.citizen; 
  }

  getCitizenNoCovid(): Observable<Citizen[]> {
    this.citizenCollections = this.afs.collection<Citizen>('Citizens', ref => ref.where ('status', '==','No Covid' ))
    this.citizen = this.citizenCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );  
    return this.citizen; 
  }

  addcitizen(citizen:Citizen){
    this.citizen = this.citizenCollections.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );  
    return this.citizen; 
  }
}
