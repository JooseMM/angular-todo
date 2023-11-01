import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `<main>
    <!-- Intro -->
    <div>
      <h1>Jose Moreno</h1>
      <p>
        Hola! Me alegro de verte por aca, te cuento un poco. Este proyecto fue
        realizado con intenciones de solidificar mis conocimientos basicos en el
        uso del Framework Angular para crear aplicaciones dinamicas, teniendo
        como inspiracion la implementacion de codigo limpio y sus conveciones
      </p>
      <h3>Creado Con:</h3>
      <div>
        <a href=""><img src="" alt="" /></a>
        <a href=""><img src="" alt="" /></a>
        <a href=""><img src="" alt="" /></a>
        <a href=""><img src="" alt="" /></a>
        <a href=""><img src="" alt="" /></a>
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
