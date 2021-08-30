import { ModuleWithProviders, NgModule } from '@angular/core';
import { GeographicAddressService } from './facade';
import { GeographicAddressStoreModule } from './store/geographic-address-store.module';

@NgModule({
  imports: [GeographicAddressStoreModule]
})
export class GeographicAddressModule {
  static forRoot(): ModuleWithProviders<GeographicAddressModule> {
    return {
      ngModule: GeographicAddressModule,
      providers: [GeographicAddressService]
    };
  }
}
