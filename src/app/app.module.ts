import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { StoreModule } from '@ngrx/store';

import { reducers } from './app.reducer';
import { PostsComponent } from './pages/posts/posts.component';
import { UsermenuComponent } from './components/topbar/usermenu/usermenu.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { PostComponent } from './pages/posts/post/post.component';
import { NewPostComponent } from './pages/posts/new-post/new-post.component';
import { CommentsComponent } from './pages/posts/comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    LoginComponent,
    CreateAccountComponent,
    PostsComponent,
    UsermenuComponent,
    PostComponent,
    NewPostComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
	MaterialModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule,
	StoreModule.forRoot(reducers),
 	AngularFireModule.initializeApp(environment.firebase),
  	AngularFireStorageModule,
   provideFirebaseApp(() => initializeApp(environment.firebase)),
   provideFirestore(() => getFirestore()),
   provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
