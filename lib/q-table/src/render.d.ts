import type { ButtonProps } from "@arco-design/web-vue";
import { DefineSetupFnComponent, type Slot, type SlotsType } from "vue";

interface QActionsSlots {
  default?: Slot;
}
export const QActions: DefineSetupFnComponent<{}, {}, SlotsType<QActionsSlots>>;

interface QActionProps {
  type?: ButtonProps["type"];
}
interface QActionEmits {
  click?: () => void;
}
interface QActionSlots {
  default?: Slot;
}
export const QAction: DefineSetupFnComponent<QActionProps, QActionEmits, SlotsType<QActionSlots>>;
