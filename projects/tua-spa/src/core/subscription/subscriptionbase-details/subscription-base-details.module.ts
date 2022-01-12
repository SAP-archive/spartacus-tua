import { ModuleWithProviders, NgModule } from '@angular/core';
import { SubscriptionBaseDetailsStoreModule } from './store/subscription-base-details.store.module';
import { SubscriptionBaseDetailsService } from './facade';

@NgModule({
  imports: [SubscriptionBaseDetailsStoreModule],
})
export class SubscriptionBaseDetailsModule {
  static forRoot(): ModuleWithProviders<SubscriptionBaseDetailsModule> {
    return {
      ngModule: SubscriptionBaseDetailsModule,
      providers: [SubscriptionBaseDetailsService],
    };
  }
}
