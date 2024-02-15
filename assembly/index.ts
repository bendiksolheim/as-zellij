export { ZellijPlugin, registerPlugin } from "./zellij-plugin";
export { Event, EventType, TabInfo } from "./proto/event";
export { InputMode } from "./proto/input_mode";
export { PermissionType } from "./proto/plugin_permission";
export {
  subscribe,
  unsubscribe,
  setSelectable,
  requestPermission,
} from "./shim";
