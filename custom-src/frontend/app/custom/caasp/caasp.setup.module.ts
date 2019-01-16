import { NgModule } from '@angular/core';

import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { CaaspStoreModule } from './caasp.store.module';
import { CaaspEffects } from './store/caasp.effects';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    SharedModule,
    CaaspStoreModule,
    EffectsModule.forFeature([
      CaaspEffects
    ])
  ],
  declarations: [
  ],
  entryComponents: [
  ]
})
export class CaaspSetupModule { }
