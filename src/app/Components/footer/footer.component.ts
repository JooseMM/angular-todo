import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<div class="w-full bg-very-dark-blue py-20 ">
    <ul
      class="flex flex-col space-y-8 justify-center items-center text-center | xl:items-start xl:space-y-0 xl:grid grid-cols-4 mx-auto max-w-2xl"
    >
      <li class="flex flex-col text-white">
        <a class="font-bold mb-4" href="">Todo App</a>
        <span>Sep 2023</span>
      </li>
      <li class="flex flex-col  text-white">
        <a class="font-bold mb-4" href="">Contact</a>
        <a class="mb-2" href="">Portfolio</a>
        <a class="mb-2" href="">Email</a>
      </li>
      <li class="flex flex-col  text-white">
        <a class="font-bold mb-4" href="">Pages</a>
        <a class="mb-2" href="">Home</a>
        <a class="mb-2" href="">App</a>
        <a href="">About</a>
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
export class FooterComponent {}
