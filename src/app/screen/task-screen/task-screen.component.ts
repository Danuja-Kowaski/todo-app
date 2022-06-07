import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import TaskListModel from 'src/app/models/taskListModel';
import TaskModel from 'src/app/models/taskModel';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'task-screen',
  templateUrl: './task-screen.component.html',
  styleUrls: ['./task-screen.component.css']
})
export class TaskScreenComponent implements OnInit {
  taskList : TaskListModel[] = [];
  tasks : TaskModel[] = [];
  taskListId : string = "";

  constructor(
    private taskService: TaskService,
    private activatedRoute : ActivatedRoute,
    private router : Router)  { }

  ngOnInit(): void {
    this.taskService.getAllTaskLists()
      .subscribe((tasklists) => {
        this.taskList = tasklists
        //loads the tasklist with associated tasks on default
        //this.router.navigate(['task-list' , this.taskLists[0]['_id']]);
      });

      this.activatedRoute.params.subscribe(
        (params : Params) => {
          this.taskListId = params['taskListId'];
          if (this.taskListId){
            this.taskService.getAllTasksForTaskList(this.taskListId).subscribe(
              (tasks : TaskModel[]) => this.tasks = tasks
            )
          }
        });       
  }

  taskClicked(task : TaskModel){
    this.taskService.updateTaskStatus(this.taskListId, task)
    .subscribe(() => task.completed = ! task.completed);
  }

  deleteTask(task: TaskModel){
    this.taskService.deleteTask(this.taskListId, task._id)
    .subscribe( 
      (taskDeleted : TaskModel) => {
        this.tasks = this.tasks.filter(t => t._id != taskDeleted._id);
      }
    );

  }

  deleteTaskList(taskList : TaskListModel){
      this.taskService.deleteTaskList(taskList._id)
      .subscribe(
        (taskListDeleted : TaskListModel) => {
          this.taskList = this.taskList.filter(tl => tl._id != taskListDeleted._id);
        }
      )
  }

  AddNewTask(){
    if (this.taskListId){
      //routes user to add-task-screen for selected task
      this.router.navigate(['./new-task'], { relativeTo : this.activatedRoute }) 
    }else{
      alert('Seleted a tasklist');
    }
  }
}
