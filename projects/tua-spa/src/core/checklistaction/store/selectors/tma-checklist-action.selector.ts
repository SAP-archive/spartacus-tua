import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
  MemoizedSelectorWithProps,
} from '@ngrx/store';
import {
  TMA_CHECKLIST_ACTION_FEATURE,
  TmaChecklistActionMap,
  TmaChecklistActionsState,
  TmaStateWithChecklistAction,
} from '../tma-checklist-action.state';
import { TmaChecklistAction } from '../../../model';

export const getTmaChecklistActionsFeatureState: MemoizedSelector<
  TmaStateWithChecklistAction,
  TmaChecklistActionsState
> = createFeatureSelector<TmaChecklistActionsState>(
  TMA_CHECKLIST_ACTION_FEATURE
);

export const getAllChecklistActions: MemoizedSelector<
  TmaStateWithChecklistAction,
  TmaChecklistActionMap[]
> = createSelector(
  getTmaChecklistActionsFeatureState,
  (state: TmaChecklistActionsState) => state.checklistActionsMap
);

export const getChecklistActionForProductCode: MemoizedSelectorWithProps<
  TmaStateWithChecklistAction,
  any,
  TmaChecklistAction[]
> = createSelector(
  getAllChecklistActions,
  (state: TmaChecklistActionMap[], props) => {
    const checklistAction = state
      ? state.find(
          (ca: TmaChecklistActionMap) =>
            ca.productId === props.productCode &&
            ca.baseSiteId === props.baseSiteId &&
            ca.processType === props.processType
        )
      : undefined;
    if (!!checklistAction) {
      return checklistAction.checklistAction;
    }
  }
);
