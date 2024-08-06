import { Directive,ElementRef} from '@angular/core';

@Directive({
  selector: '[appChangecolor]'
})
export class ChangecolorDirective {

  constructor(element:ElementRef) {
    // el.h5.style.color="red"

   }
}
