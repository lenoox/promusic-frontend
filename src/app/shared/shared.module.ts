import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuillModule} from 'ngx-quill';

@NgModule({
  declarations: [
    TextEditorComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ],
  exports: [
    NgbModule,
    TextEditorComponent
  ]
})
export class SharedModule {
}
