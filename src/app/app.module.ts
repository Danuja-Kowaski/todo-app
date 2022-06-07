import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskScreenComponent } from './screen/task-screen/task-screen.component';
import { NewTaskListComponent } from './screen/new-task-list/new-task-list.component';
import { NewTaskComponent } from './screen/new-task/new-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskScreenComponent,
    NewTaskListComponent,
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
