import { InjectionToken } from '@angular/core';
import { Converter } from '@spartacus/core';
import { QueryServiceQualification } from '../../model';

export const QUERY_SERVICE_QUALIFICATION_NORMALIZER = new InjectionToken<Converter<any, QueryServiceQualification>>('QueryServiceQualificationNormalizer');
