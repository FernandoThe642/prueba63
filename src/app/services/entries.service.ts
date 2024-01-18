import { Injectable } from '@angular/core';
import {
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { collection, getDocs } from '@firebase/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Entrie } from '../commons/interfaces/entrie.interface';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  private entrieSource = new BehaviorSubject<any | null>(null);
  entries$ = this.entrieSource.asObservable();

  constructor(private firestore: Firestore) {}

  addEntrie(entrie: Entrie) {
    const entriesRef = collection(this.firestore, 'entries');
    return addDoc(entriesRef, entrie);
  }

  getEntries(filter = '') {
    const entriesRef = collection(this.firestore, 'entries');
    let q = query(entriesRef);
    if (filter) {
      q = query(entriesRef, where('name', '==', filter));
    }
    return collectionData(q) as unknown as Observable<Entrie[]>;
  }

  async updateEntrie(entrie: Entrie) {
    const entriesRef = collection(this.firestore, 'entries');
    let q = query(entriesRef, where('id', '==', entrie.id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'entries', document.id);
      await updateDoc(docRef, { ...entrie });
    });
  }

  async deleteEntrie(id: string) {
    const entriesRef = collection(this.firestore, 'entries');
    let q = query(entriesRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (document) => {
      const docRef = doc(this.firestore, 'entries', document.id);
      deleteDoc(docRef);
    });
  }
}