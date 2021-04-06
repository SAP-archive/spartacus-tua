import { ModuleWithProviders, NgModule } from '@angular/core';
import { QueryServiceQualificationService } from './facade';
import { QueryServiceQualificationStoreModule } from './store/query-service-qualification-store.module';

@NgModule({
  imports: [QueryServiceQualificationStoreModule]
})
export class QueryServiceQualificationModule {
  static forRoot(): ModuleWithProviders<QueryServiceQualificationModule> {
    return {
      ngModule: QueryServiceQualificationModule,
      providers: [QueryServiceQualificationService]
    };
  }
}
