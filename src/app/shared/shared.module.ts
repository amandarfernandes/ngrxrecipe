import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        DropdownDirective
    ],
    exports: [
        CommonModule,
        DropdownDirective
    ]
})
// tslint:disable-next-line:no-unused-expression
export class SharedModule { }
