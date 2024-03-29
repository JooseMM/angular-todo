import { Component } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-task-form',
  template: ` <main class="flex flex-col items-center split-background">
    <h2
      class="hidden my-12 font-bold text-5xl italic text-very-dark-blue | lg:block lg:mt-20 lg:text-6xl"
    >
      JM
    </h2>
    <img class="my-10 : lg:hidden" src="../../../assets/Images/profile-pic.svg"/>
<form
      (submit)="submit()"
      #basicForm="ngForm"
      class="py-6  w-[90%] max-w-5xl rounded-lg background-mb drop-shadow-2xl relative | sm:px-6 sm:py-7 | md:background | lg:px-10 lg:mt-2 shadow-xl"
    >
      <label for="new-task"
        ><h1
          class="text-2xl font-medium text-white italic pl-4 | sm:mt-5 md:text-3xl"
        >
        Ingreso de tareas
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
          class="text-shadow outline-2 outline-white/30 tracking-wider  transition duration-200 bg-orange-btn ml-3 py-2 px-5 rounded-md text-white font-bold text-shadow | lg:hover:outline sm:px-14 sm:py-3 lg:hover:bg-very-dark-blue sm:rounded lg:text-base"
        >
          Agregar
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
