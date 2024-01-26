import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  template: `<div class="w-full bg-very-dark-blue py-20 ">
    <ul
      class="flex flex-col space-y-8 justify-center items-center text-center
      | xl:items-start xl:space-y-0 xl:grid grid-cols-4 xl:mx-auto xl:max-w-2xl
      | lg:flex-row lg:text-center lg:space-y-0 lg:items-start lg:space-x-16"
    >
      <li class="flex flex-col text-white | lg:ml-16">
        <a class="font-bold mb-4 " routerLink="/home" >Todo App</a>
        <span>Sep 2023</span>
      </li>
      <li class="flex flex-col  text-white">
        <p class="font-bold mb-4">Contacto</p>
        <a class="mb-2" href="">Portafolio</a>
        <a class="mb-2" href="">Email</a>
      </li>
      <li class="flex flex-col  text-white">
        <p class="font-bold mb-4">Páginas</p>
        <a class="mb-2" routerLink="/home">Inicio</a>
        <a class="mb-2" routerLink="/application">App</a>
        <a href="">Nosotros</a>
      </li>
      <li class="flex flex-col  text-white">
        <span class="font-bold mb-4">Images on Freepik by</span>
        <a
          class="mb-2"
          href="https://www.freepik.com/free-psd/isolated-realistic-laptop_28427060.htm#query=laptop%20mockup%20png&position=5&from_view=search&track=ais"
          >Vectonauta</a
        >

        <a
          href="https://www.freepik.com/free-vector/realistic-front-view-smartphone-mockup-mobile-iphone-purple-frame-with-blank-white-display-vector_33632332.htm#query=phone%20mockup%20png&position=0&from_view=keyword&track=ais"
          >svstudioart</a
        >
      </li>
    </ul>
  </div>`,
})
export class FooterComponent {

  constructor(public Router: Router) {}
}
