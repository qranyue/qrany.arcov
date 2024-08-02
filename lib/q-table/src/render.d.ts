import { DefineSetupFnComponent, type Slot, type SlotsType } from "vue";

interface QActionsSlots {
  default?: Slot;
}
export const QActions: DefineSetupFnComponent<{}, {}, SlotsType<QActionsSlots>>;
