import { NewTaskListComponent } from './screen/new-task-list/new-task-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskScreenComponent } from './screen/task-screen/task-screen.component';
import { NewTaskComponent } from './screen/new-task/new-task.component';

const routes: Routes = [
  { path:'', redirectTo: 'task-list', pathMatch: 'full' },
  { path: 'task-list' , component: TaskScreenComponent},
  { path: 'task-list/:taskListId', component: TaskScreenComponent},
  { path: 'new-task-list', component : NewTaskListComponent },
  { path: 'task-list/:taskListId/new-task', component : NewTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
