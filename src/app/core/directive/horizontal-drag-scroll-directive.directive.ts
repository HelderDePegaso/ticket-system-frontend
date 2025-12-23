
  import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appHorizontalDragScrollDirective]',
  standalone: true
})
export class HorizontalDragScrollDirective {




  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;
  private speed = 1.5;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isDown = true;
    this.startX = event.pageX - this.el.nativeElement.offsetLeft;
    this.scrollLeft = this.el.nativeElement.scrollLeft;
    this.renderer.addClass(this.el.nativeElement, 'dragging');
  }

  @HostListener('mouseleave')
  @HostListener('mouseup')
  stopDrag() {
    this.isDown = false;
    this.renderer.removeClass(this.el.nativeElement, 'dragging');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDown) return;
    event.preventDefault();

    const x = event.pageX - this.el.nativeElement.offsetLeft;
    const walk = (x - this.startX) * this.speed;
    this.el.nativeElement.scrollLeft = this.scrollLeft - walk;
  }

  /* Touch support */
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].pageX;
    this.scrollLeft = this.el.nativeElement.scrollLeft;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    const x = event.touches[0].pageX;
    const walk = (x - this.startX) * this.speed;
    this.el.nativeElement.scrollLeft = this.scrollLeft - walk;
  }
}
