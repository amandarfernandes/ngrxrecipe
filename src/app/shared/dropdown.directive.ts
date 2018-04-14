import { Directive, ElementRef, HostBinding, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open')isOpen:boolean=false;  
  constructor(private elementRef:ElementRef, private renderer:Renderer2) {  }

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;

  }
}
