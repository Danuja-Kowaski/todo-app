import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent{
  taskListId : string = "";

  constructor(
    private actviatedRoute : ActivatedRoute,
    private taskService : TaskService,
    private router : Router
  ) {
    this.actviatedRoute.params.
    subscribe(
      (params : Params) => {
        this.taskListId = params['taskListId'];
      }
    )
   }
   AddNewTask(task : string){
     this.taskService.createTaskForTaskList(this.taskListId, task)
     .subscribe(
       () => { 
         this.router.navigate(['../'], { relativeTo : this.actviatedRoute })
       }
     )
   }
  // addNewTask(title : string){
  //   if (title){
  //     this.taskService.createTaskForTaskList(this.taskId, title)
  //     .subscribe(
  //       ()=>{
  //         this.router.navigate(['../'], { relativeTo: this.actviatedRoute } )
  //       }
  //     );
  //     console.log(title);
  //   }else{
  //     alert("Missing data");
  //     return;
  //   }
  // }
}
