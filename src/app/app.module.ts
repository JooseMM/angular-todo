import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TaskListComponent } from './Components/task-list/task-list.component';
import { HomeComponent } from './Components/pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { TaskFormComponent } from './Components/task-form/task-form.component';
import { ApplicationComponent } from './Components/pages/application/application.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './Components/pages/about/about.component';
import { TaskItemComponent } from './Components/task-item/task-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    TaskFormComponent,
    ApplicationComponent,
    AboutComponent,
    TaskItemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
