import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentPipe } from './pipes/comment.pipe';

@NgModule({
  declarations: [MenuComponent, CommentPipe],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    MenuComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    CommentPipe,
  ],
  providers: [],
  bootstrap: [],
})
export class SharedModule {}
