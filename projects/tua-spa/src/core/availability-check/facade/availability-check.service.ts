import { ResourceRef } from '../../model';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as AvailabilityCheckActions from '../store/actions/availability-check.action';
import { Store, select } from '@ngrx/store';
import * as AvailabilityCheckSelectors from '../store/selectors';
import { take, filter, takeUntil } from 'rxjs/operators';
import { StateWithAvailabilityCheck } from '../store';

@Injectable()
export class AvailabilityCheckService implements OnDestroy {
  protected destroyed$ = new Subject();

  constructor(protected store: Store<StateWithAvailabilityCheck>) {
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * This method is used to get list of available resources of the given logical resource type.
   *
   * @param capacityDemandAmount
   *          The amount of capacity that is planned to be consumed or has been consumed
   * @param  type
   *           Type of Logical Resource
   * @return
   *           List of Available Resources
   */
  getResourceCheckAvailability(
    capacityDemandAmount: number,
    type: string
  ): Observable<ResourceRef[]> {
    this.loadResources(capacityDemandAmount, type);
    return this.store.pipe(
      select(AvailabilityCheckSelectors.getLogicalResourceForType, {
        capacityDemandAmount,
        type
      })
    );
  }

  /**
   * This method is used to load the resources.
   *
   * @param capacityDemandAmount
   *          The amount of capacity that is planned to be consumed or has been consumed
   * @param type
   *           Type of Logical Resource
   */
  loadResources(capacityDemandAmount: number, type: string): void {
    this.store.dispatch(
      new AvailabilityCheckActions.LoadAvailabilityCheck({
        capacityDemandAmount,
        type
      })
    );
  }

  /**
   * This method is used to set the logical resource selected by user.
   *
   * @param resource
   *          The ResourceRef that is selected
   */
  setSelectedLogicalResource(resource: ResourceRef): void {
    this.store.dispatch(
      new AvailabilityCheckActions.SelectedLogicalResourceSuccess({
        resource
      })
    );
  }

  /**
   * This method is used to get the selected logical resource.
   *
   * @return
*          the selected logical resource
   */
  getSelectedLogicalResource(): ResourceRef {
    let selectedLogicalResource: ResourceRef;
    this.store
      .select(AvailabilityCheckSelectors.getSelectedLogicalResource)
      .pipe(
        filter((result: ResourceRef) => !!result),
        take(1),
        takeUntil(this.destroyed$)
      )
      .subscribe((result: ResourceRef) => {
        selectedLogicalResource = result;
      });
    return selectedLogicalResource;
  }

  /**
   * This method is used to determine if any error is there in fetching the availability check details.
   *
   * @return
*           the error message indicating error occurred in fetching the availability check details
   */
  getAvailabilityCheckError(): Observable<string> {
    return this.store.pipe(
      select(AvailabilityCheckSelectors.getAvailabilityCheckError)
    );
  }

  /**
   * This method is used to clear the AvailabilityCheck state.
   */
  clearAvailabilityCheckState(): void {
    this.store.dispatch(
      new AvailabilityCheckActions.ClearAvailabilityCheckState()
    );
  }

  /**
   * This method is used to clear the AvailabilityCheck error.
   */
  clearAvailabilityCheckError(): void {
    this.store.dispatch(
      new AvailabilityCheckActions.ClearAvailabilityCheckError()
    );
  }
}
