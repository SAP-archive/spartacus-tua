import * as SearchTimeSlotActions from '../store/actions/search-time-slot.action';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchTimeSlot, TimeSlot, RelatedPlaceRefOrValue } from '../../model';
import { Store, select } from '@ngrx/store';
import * as SearchTimeSlotSelectors from '../store/selectors/search-time-slot.selector';
import { StateWithSearchTimeSlot } from '../store';
import { JourneyChecklistConfig } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class SearchTimeSlotService {
  constructor(
    protected store: Store<StateWithSearchTimeSlot>,
    protected config?: JourneyChecklistConfig
  ) {
  }

  /**
   * Returns the available time slot for the requested place.
   *
   * @param place
   *           The appointment place of {@link RelatedPlaceRefOrValue}
   * @returns Observable<SearchTimeSlot>
   *                the available time slots
   */
  getAvailableSearchTimeSlot(
    place?: RelatedPlaceRefOrValue
  ): Observable<SearchTimeSlot> {
    this.loadSearchTimeSlot(place);
    return this.store.pipe(
      select(SearchTimeSlotSelectors.getAllSearchTimeSlots)
    );
  }

  /**
   * Loads the available time slots for the requested place.
   *
   * @param place
   *            The appointment place of {@link RelatedPlaceRefOrValue}
   */
  loadSearchTimeSlot(place: RelatedPlaceRefOrValue): void {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(
      startDate.getDate() +
      this.config.journeyChecklist.appointment.end_date_of_timeslots
    );

    const searchTimeSlotRequest: SearchTimeSlot = {
      requestedTimeSlot: [
        {
          validFor: {
            startDateTime: startDate,
            endDateTime: endDate
          }
        }
      ],
      relatedPlace: place
    };
    this.store.dispatch(
      new SearchTimeSlotActions.LoadSearchTimeSlot({
        requestedTimeSlot: searchTimeSlotRequest
      })
    );
  }

  /**
   * Sets the selected time slot.
   *
   * @param  timeSlot The selected time slot of {@link TimeSlot}
   * @param  place The selected place of {@link RelatedPlaceRefOrValue}
   */
  setSelectedTimeSlot(timeSlot: TimeSlot, place: RelatedPlaceRefOrValue): void {
    if (!!timeSlot) {
      this.store.dispatch(
        new SearchTimeSlotActions.SelectedTimeSlotSucess({
          requestedTimeSlot: timeSlot,
          relatedPlace: place
        })
      );
    }
  }

  /**
   * Gets the selected time slot
   *
   * @returns Observable<SearchTimeSlot>
   *                The selected time slot
   */
  getSelectedTimeSlot(): Observable<SearchTimeSlot> {
    return this.store.select(SearchTimeSlotSelectors.getSelectedTimeSlots);
  }

  /**
   * Gets the error occurred during fetching of time slots
   *
   * @returns Observable<string>
   *                The search time slot error
   */
  getSearchTimeSlotError(): Observable<string> {
    return this.store.select(SearchTimeSlotSelectors.getSearchTimeSlotError);
  }

  /**
   * Clears the search time slot state.
   */
  clearSearchTimeSlotState(): void {
    this.store.dispatch(new SearchTimeSlotActions.ClearSearchTimeSlotState());
  }

  /**
   * Clears the search time slot error state.
   */
  clearSearchTimeSlotErrorState(): void {
    this.store.dispatch(
      new SearchTimeSlotActions.ClearSearchTimeSlotErrorState()
    );
  }

  /**
   * Clears the selected search time slot state.
   */
  clearSelectedSearchTimeSlotState(): void {
    this.store.dispatch(
      new SearchTimeSlotActions.ClearSelectedSearchTimeSlotState()
    );
  }
}
