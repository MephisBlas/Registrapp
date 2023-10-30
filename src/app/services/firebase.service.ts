import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { initializeApp } from 'firebase/app'; // Importa initializeApp desde Firebase
import { User } from '../models/user.model';
import firebase from 'firebase/compat/app'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, setDoc, doc, getDoc, collectionData, query, deleteDoc, } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {getStorage, uploadString, ref, getDownloadURL,deleteObject} from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
  
})
export class FirebaseService {
  [x: string]: any;
  
  getAuth() {
    throw new Error('Method not implemented.');
  }
  sendPasswordResetEmail(email: string) {
      throw new Error("Method not implemented.");
  }
  UpdateUser(name: string) {
    throw new Error('Method not implemented.');
  }
  create(arg0: { spinner: any; }) {
    throw new Error('Method not implemented.');
  }
  signIn(arg0: User) {
    throw new Error('Method not implemented.');
  }
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  storage = inject(AngularFireStorage)
  modal = inject(ModalController);






/////AUTENTICACION///
getAuht(){
  return getAuth();
}



  ///ACCESO///
  singIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  ///Crear Usuario///

  singUp(user: Partial<User>) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  /// Actualizar usuario///
  updateProfile(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  /// recuprecion contraseña///
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);

  }

  ///BASE DE DATOS///

  /////obtener documentos de una coleccion////

  getCollectionData(path: string, collectionQuery?:any ){
    const ref = collection(getFirestore(), path)
    return collectionData(query(ref,collectionQuery), {idField:'id'});

  }
///eliminar datos///

deleteDocument(path: string) {
  return deleteDoc(doc(getFirestore(), path));


}

  //SETEAR DATOS//
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);

  }
  //obtener datos//

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }
////agregrar datos////
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

////cierre sesion/////
signOut() {
  return getAuth().signOut();
}

//////cierre modal ////
dismissModal() {
  if (this.modal) {
    this.modal.dismiss();
  }
}
  /////////////almacenamiento////////////////////

  //////////////subir imagen//////////////
  async uploadImage(path:string, data_url: string){
    return uploadString(ref(getStorage(),path), data_url, 'data_url').then(()=>{
      return getDownloadURL(ref(getStorage(),path)) 
    })
  }
//////////obtener url imagen/////////

async getFilePath(url:string){
  return ref(getStorage(),url).fullPath
}
////////borrar documento//////////
deleteFile(path:string){
  return deleteObject(ref(getStorage(),path));

}

}
