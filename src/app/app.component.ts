import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmpresaComponent } from "./module/empresa/empresa.component";
import { MainComponent } from "./shared/main/main.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmpresaComponent, MainComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'reservacion-frontend';
}
