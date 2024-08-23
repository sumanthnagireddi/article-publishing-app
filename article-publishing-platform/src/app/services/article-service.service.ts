import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import {
  arrayUnion,
  collection,
  doc,
  Firestore,
  getDocs,
  increment,
  query,
  QuerySnapshot,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { arrayRemove } from 'firebase/firestore';
import { forkJoin, from, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleServiceService {
  firestore = inject(Firestore);
  constructor(private http: HttpClient) { }

  createArticle(payload: any): Observable<any> {
    const docRef = doc(this.firestore, 'articles', payload._id);
    if (docRef.id) {
      updateDoc(doc(this.firestore, 'userAccounts', "krcyLA6daAOrcoAMzDHgTrGC3Xk2"), {
        articles: arrayUnion(docRef.id)
      })
    }
    return from(setDoc(docRef, payload))
  }

  getArticlesFromFirestore(): Observable<any[]> {
    return from(getDocs(collection(this.firestore, 'articles'))).pipe(
      tap(querySnapShot => console.log(querySnapShot)),
      map(querySnapshot =>
        querySnapshot.docs.map(doc => doc.data())
      )
    );
  }

  getArticlesBasedOnQuery(queryToFetch: string, uid?: string): Observable<any[]> {
    const articleRef = collection(this.firestore, 'articles');
    const articlesQuery = query(articleRef, where("status", "==", queryToFetch && queryToFetch));
    return from(getDocs(articlesQuery)).pipe(map(res =>
      res.docs.map(doc => doc.data())
    ))
  }
  getArticlesByMe(category: string, uid: string): Observable<any[]> {
    const articleRef = collection(this.firestore, 'articles');
    const articlesQuery = query(articleRef, where("status", "==", category && category), where("authorId", "==", uid && uid));

    return from(getDocs(articlesQuery)).pipe(map(res =>
      res.docs.map(doc => doc.data())
    ))
  }

  getArticleById(category: string, id: string): Observable<any[]> {
    const articleRef = collection(this.firestore, 'articles');
    const articlesQuery = query(articleRef, where("status", "==", category), where("_id", "==", id));

    return from(getDocs(articlesQuery)).pipe(map(res =>
      res.docs.map(doc => doc.data())
    ))
  }
  getArticlesByIds(articleIds: string[]): Observable<any[]> {
    const articleRequests = articleIds.map(id => this.getArticleById("published", id))
    return forkJoin(articleRequests)
  }
  getRealTimeViewsByID(id: any): Observable<any[]> {
    const articleRef = collection(this.firestore, 'articles');
    const articlesQuery = query(articleRef, where("_id", "==", id && id));
    return from(getDocs(articlesQuery)).pipe(map(res =>
      res.docs.map(doc => doc.data())
    ))
  }

  // Comments

  createComment(payload: any) {
    const docRef = doc(this.firestore, 'comments', payload._id);
    if (docRef.id) {
      return from(updateDoc(doc(this.firestore, 'articles', payload.articleId), {
        comments: arrayUnion(payload)
      }))
    }
    return from([])
    // return from(setDoc(docRef, payload))
  }

  getComments(articleId: string) {
    const commentsRef = collection(this.firestore, 'articles');
    const commentsQuery = query(commentsRef, where("articleId", "==", articleId && articleId));
    return from(getDocs(commentsQuery)).pipe(map(res =>
      res.docs.map(doc => doc.data())
    ))
  }

  handlePageViews(articleId: any) {
    return from(updateDoc(doc(this.firestore, 'articles', articleId), {
      views: increment(1)
    }))
  }
  // saved

  addToSaved(articleId: any, uid: any): Observable<any> {
    const docRef = doc(this.firestore, 'userAccounts', "krcyLA6daAOrcoAMzDHgTrGC3Xk2");
    return from(updateDoc(docRef, {
      saved: arrayUnion(articleId)
    }))
  }
  removeFromSaved(articleId: any, uid: any) {
    const docRef = doc(this.firestore, 'userAccounts', "krcyLA6daAOrcoAMzDHgTrGC3Xk2");
    return from(updateDoc(docRef, {
      saved: arrayRemove(articleId)
    }))
  }
  getSaved(id:any): Observable<any[]> {
    const accountsRef = collection(this.firestore, 'userAccounts');
    const savedRef = query(accountsRef, where("userUid", "==", id));
    return from(getDocs(savedRef)).pipe(map(res =>
      res.docs.map(doc => doc.data())
    ))
  }

  isSavedArticle(userId:any,id: any) {
    const userAccounts = collection(this.firestore, 'userAccounts',userId);
    const isSavedQuery = query(userAccounts, where("saved", "array-contains", id ));
    return from(getDocs(isSavedQuery)).pipe(
      map(querySnapshot => {
        return !querySnapshot.empty;
      })
    )
  }
  
}
