import TaskListModel from 'src/app/models/taskListModel';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.css']
})
export class NewTaskListComponent implements OnInit {

  constructor(
    private router : Router,
    private taskService : TaskService
  ) { }

  ngOnInit(): void {
  }

  addNewTaskList(id : string ){
    if(id){
      this.taskService.createTaskListBucket(id)
      .subscribe(
        (newTaskListCreated : TaskListModel) => {
          this.router.navigate(['/task-list',newTaskListCreated._id]);
        }
      )
    }else{
      alert("Title cannot be empty");
      return;
    }
  }

}
