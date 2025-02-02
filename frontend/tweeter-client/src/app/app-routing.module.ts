import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TweetListComponent } from './components/tweet-list/tweet-list.component';
import { TweetNewComponent } from './components/tweet-new/tweet-new.component';
import { TweetEditComponent } from './components/tweet-edit/tweet-edit.component';
import { TweetUserComponent } from './components/tweet-user/tweet-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SignInComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'tweet',
    component: TweetListComponent,
  },
  {
    path: 'tweet/new',
    component: TweetNewComponent,
  },
  {
    path: 'tweet/edit/:id',
    component: TweetEditComponent,
  },
  {
    path: 'tweet/users/:tweeterId',
    component: TweetUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
