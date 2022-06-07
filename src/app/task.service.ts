import TaskListModel  from 'src/app/models/taskListModel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import TaskModel from './models/taskModel';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiConfigService : ApiConfigService) { }

  getAllTaskLists() : Observable<TaskListModel[]> {
     return this.apiConfigService.getTaskLists('tasklists')
  }

  getAllTasks(taskListId : string) : Observable<TaskModel[]> {
    return this.apiConfigService.getTasks(`tasklists/${taskListId}`)
 }

  createTaskListBucket(title : string) : Observable<TaskListModel>{
    let data = {'title' : title};
    return this.apiConfigService.post('tasklists', data);
  }

  //fetch all tasks from tasklist
  getAllTasksForTaskList(taskListId : string){
    return this.apiConfigService.getTasks(`tasklists/${taskListId}/tasks`)
  }

  //create a task inside a tasklist
  createTaskForTaskList(taskListId : string , title : string){
    return this.apiConfigService.post(`tasklists/${taskListId}/tasks`, {title});

  }

  //delete a task
  deleteTaskList(taskListId : string){
    return this.apiConfigService.deleteTaskList(`tasklists/${taskListId}`);  
  }
  //deletes a task from a tasklist
  deleteTask(taskListId : string, taskId: string) : Observable<TaskModel> {
    return this.apiConfigService.deleteTask(`tasklists/${taskListId}/tasks/${taskId}`);
  }

  updateTaskStatus(taskListId : string, taskObject: TaskModel){
    let updateData = { 'completed' : !taskObject.completed};//toggle value in db
    return this.apiConfigService.patch(`tasklists/${taskListId}/tasks/${taskObject._id}`, updateData);
  }

}
