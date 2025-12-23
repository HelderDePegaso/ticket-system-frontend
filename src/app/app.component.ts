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

      var win = navigator.platform.indexOf('Win') > -1;
      if (win && document.querySelector('#sidenav-scrollbar')) {
        var options = {
          damping: '0.5'
        };

        (window as any).Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
      }
    } catch (err) {
      console.error(err);
    }
  }
}
