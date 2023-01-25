import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export let InjectorInstance: Injector;

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
  ]
})
export class UtilsModule {
  constructor(private injector: Injector) {
    InjectorInstance = this.injector;
  }
}
