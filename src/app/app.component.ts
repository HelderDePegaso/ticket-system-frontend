import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScriptLoaderService } from './core/libs/script-loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ticket-system-frontend';

  constructor(private scriptLoader: ScriptLoaderService) { }  
  async ngOnInit() {
    try {
      await this.scriptLoader.loadScript('https://buttons.github.io/buttons.js');
      console.log('Script carregado com sucesso!');
    } catch (err) {
      console.error(err);
    }
  }
}
