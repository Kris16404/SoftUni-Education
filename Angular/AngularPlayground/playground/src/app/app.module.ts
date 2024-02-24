import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GeneratedTestComponent } from './generated-test/generated-test.component';
import { Test } from './test/test.component';

@NgModule({
  declarations: [AppComponent, GeneratedTestComponent, Test],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
