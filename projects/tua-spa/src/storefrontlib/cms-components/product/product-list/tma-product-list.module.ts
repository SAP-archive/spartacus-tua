import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ConfigModule,
  I18nModule,
  UrlModule,
  FeaturesConfigModule,
} from '@spartacus/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {
  defaultScrollConfig,
  IconModule,
  ItemCounterModule,
  ListNavigationModule,
  MediaModule,
  ProductListModule,
  SpinnerModule,
  StarRatingModule,
  ViewConfigModule,
} from '@spartacus/storefront';
import { TmaProductListComponent } from './container/tma-product-list.component';
import { TmaProductListItemComponent } from './product-list-item/tma-product-list-item.component';
import { TmaProductGridItemComponent } from './product-grid-item/tma-product-grid-item.component';
import { TmaProductScrollComponent } from './container/product-scroll/tma-product-scroll.component';
import { TmaAddToCartModule } from '../../cart';
import { TmaProductViewComponent } from './product-view/tma-product-view.component';
import { TmaPriceDisplayModule } from '../price/price-display/tma-price-display.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(defaultScrollConfig),
    ConfigModule.withConfig({
      cmsComponents: {
        CMSProductListComponent: {
          component: TmaProductListComponent,
        },
        ProductGridComponent: {
          component: TmaProductListComponent,
        },
        SearchResultsListComponent: {
          component: TmaProductListComponent,
        }
      },
    }),
    RouterModule,
    MediaModule,
    TmaAddToCartModule,
    ItemCounterModule,
    ListNavigationModule,
    UrlModule,
    I18nModule,
    StarRatingModule,
    IconModule,
    SpinnerModule,
    InfiniteScrollModule,
    ViewConfigModule,
    FeaturesConfigModule,
    TmaPriceDisplayModule,
  ],
  declarations: [
    TmaProductListComponent,
    TmaProductListItemComponent,
    TmaProductGridItemComponent,
    TmaProductViewComponent,
    TmaProductScrollComponent,
  ],
  exports: [
    TmaProductListComponent,
    TmaProductListItemComponent,
    TmaProductGridItemComponent,
    TmaProductViewComponent,
    TmaProductScrollComponent,
  ],
  entryComponents: [TmaProductListComponent],
})
export class TmaProductListModule extends ProductListModule {}
