import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import TaskListModel from './models/taskListModel';
import TaskModel from './models/taskModel';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  API_URL = 'http://localhost:3000';

  constructor(private httpC : HttpClient) { }

  getTaskLists(url : string ){
    return this.httpC.get<TaskListModel[]>(`${this.API_URL}/${url}`);
  }

  getTasks(url : string ){
    return this.httpC.get<TaskModel[]>(`${this.API_URL}/${url}`);
  }

  post(url : string, data : Object){
    return this.httpC.post<TaskListModel>(`${this.API_URL}/${url}`, data);
  }

  put(url : string, data : Object){
    return this.httpC.put(`${this.API_URL}/${url}`, data);
  }

  patch(url : string, data : Object){
    return this.httpC.put(`${this.API_URL}/${url}`, data);
  }

  deleteTaskList(url : string){
    return this.httpC.delete<TaskListModel>(`${this.API_URL}/${url}`);
  }

  deleteTask(url : string){
    return this.httpC.delete<TaskModel>(`${this.API_URL}/${url}`);
  }


}
