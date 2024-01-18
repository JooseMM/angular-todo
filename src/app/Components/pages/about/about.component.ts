import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `<main>
    <!-- Intro -->
    <div class="flex flex-col text-very-dark-blue items-center justify-center">
      <h1 class="font-extrabold italic text-3xl">Jose Moreno</h1>
      <p class="text-dark-blue leading-6 mx-6 mt-3 text-center">
        Hola! Me alegro de verte por aca, te cuento un poco. Este proyecto fue
        realizado con intenciones de solidificar mis conocimientos basicos en el
        uso del Framework Angular para crear aplicaciones dinamicas, teniendo
        como inspiracion la implementacion de codigo limpio y sus conveciones
      </p>
      <h3 class="text-2xl font-extrabold italic mt-8">Creado Con:</h3>
      <div class="flex space-x-4">
       <div class="bg-very-dark-blue rounded-full"><a href=""><img src="" alt="" />cir</a></div>
       <div class="bg-very-dark-blue rounded-full"><a href=""><img src="" alt="" />cir</a></div>
       <div class="bg-very-dark-blue rounded-full"><a href=""><img src="" alt="" />cir</a></div>
       <div class="bg-very-dark-blue rounded-full"><a href=""><img src="" alt="" />cir</a></div>
       <div class="bg-very-dark-blue rounded-full"><a href=""><img src="" alt="" />cir</a></div>
      </div>
    </div>
    <!-- links -->
    <div>
      <h2>FIGMA</h2>
      <P>Por aca puedes ver un poco de como arme la interface usando Figma.</P>
      <Img src="" />
      <h2>GITHUB</h2>
      <P
        >Y por aca puedes echarle un vistazo al repositorio de la aplicacion y
        mi perfil</P
      >
      <Img src="" />
      <h2>CONTACTO</h2>
      <div>
        <span>Email:</span><a href="">josexmoreno1998@gmail.com</a
        ><span>Tlf:</span><a href="">+56 9 </a><span>CV:</span
        ><a href="">Portfolio.com</a>
      </div>
    </div>
  </main>`,
})
export class AboutComponent {}
