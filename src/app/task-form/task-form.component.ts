import { Component, inject } from '@angular/core';
import { ListType } from '../list-type';
import { DataService } from '../data.service';

@Component({
  selector: 'app-task-form',
  template: ` <main class="flex flex-col items-center ">
    <h2 class="my-12 font-bold text-5xl italic text-very-dark-blue">JM</h2>
    <form
      (submit)="submit()"
      #basicForm="ngForm"
      class="py-6  w-[90%] rounded-md background drop-shadow-2xl"
    >
      <label for="new-task"
        ><h1 class="text-2xl font-medium text-white italic pl-4">
          New task
        </h1></label
      >

      <div class="flex flex-nowrap items-center mt-4 px-4 w-full">
        <input
          [(ngModel)]="newTask"
          name="task"
          required
          type="text"
          id="Task"
          placeholder="Ex: Wash dishes"
          class="py-2 px-4 rounded-md w-full"
        />
        <button
          type="submit"
          class="bg-orange-btn ml-3 py-2 px-5 rounded-md text-white font-medium italic text-shadow"
        >
          ADD
        </button>
      </div>
    </form>
  </main>`,
})
export class TaskFormComponent {
  public newTask: string;
  list: ListType[] = [];
  dataService: DataService = inject(DataService);
  constructor() {
    this.newTask = '';
  }

  submit() {
    this.dataService.addData(this.newTask);
    this.list = this.dataService.getAllData();
    this.newTask = '';
  }
}
