import { Component } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-task-form',
  template: ` <main class="flex flex-col items-center split-background">
    <h2
      class="my-12 font-bold text-5xl italic text-very-dark-blue | lg:mt-20 lg:text-6xl"
    >
      JM
    </h2>

    <form
      (submit)="submit()"
      #basicForm="ngForm"
      class="py-6  w-[90%] max-w-5xl rounded-lg background drop-shadow-2xl relative | sm:px-6 sm:py-7 | lg:px-10 lg:mt-2 shadow-xl"
    >
      <label for="new-task"
        ><h1
          class="text-2xl font-medium text-white italic pl-4 | sm:mt-5 md:text-3xl"
        >
          Nueva Tarea
        </h1></label
      >

      <div class="flex flex-nowrap items-center mt-4 px-4 w-full">
        <input
          [(ngModel)]="newTask"
          name="task"
          required
          type="text"
          id="Task"
          placeholder="Ejem. Lavar los platos"
          class="py-2 px-4 rounded-md w-full | sm:w-[85%] sm:py-2.5 sm:rounded sm:text-lg"
        />
        <button
          type="submit"
          class="transition duration-200 bg-orange-btn ml-3 py-2 px-5 rounded-md text-white font-medium italic text-shadow | sm:px-14 sm:py-3 lg:hover:bg-white lg:hover:text-very-dark-blue sm:rounded"
        >
          AGREGAR
        </button>
      </div>
    </form>
  </main>`,
})
export class TaskFormComponent {
  public newTask: string;
  constructor(private dataService: DataService) {
    this.newTask = '';
  }

  submit() {
    this.dataService.addData(this.newTask);
    this.newTask = '';
  }
}
