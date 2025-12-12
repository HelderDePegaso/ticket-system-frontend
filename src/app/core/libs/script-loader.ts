import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScriptLoaderService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  loadScript(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = this.renderer.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      script.onload = () => resolve();
      script.onerror = () => reject(`Não foi possível carregar ${url}`);
      this.renderer.appendChild(document.body, script);
    });
  }
}
