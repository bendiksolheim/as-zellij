import { hostRunPluginCommand } from "./zellij";
import { EventType } from "./proto/event";
import { CommandName, PluginCommand } from "./proto/plugin_command";
import { PermissionType } from "./proto/plugin_permission";

export function subscribe(eventTypes: Array<EventType>): void {
  const payload: PluginCommand = {
    name: CommandName.Subscribe,
    subscribe_payload: {
      subscriptions: {
        event_types: eventTypes.map((ev: i32) => u32(ev)),
      },
    },
  };

  const bytes = payload.encode();
  const array = Uint8Array.wrap(bytes);
  writeArrayAsJson(array);

  hostRunPluginCommand();
}

export function unsubscribe(eventTypes: Array<EventType>): void {
  const payload: PluginCommand = {
    name: CommandName.Unsubscribe,
    unsubscribe_payload: {
      subscriptions: {
        event_types: eventTypes.map((ev: i32) => u32(ev)),
      },
    },
  };

  const bytes = payload.encode();
  const array = Uint8Array.wrap(bytes);
  writeArrayAsJson(array);

  hostRunPluginCommand();
}

export function setSelectable(selectable: bool): void {
  const payload: PluginCommand = {
    name: CommandName.SetSelectable,
    set_selectable_payload: selectable,
  };

  const bytes = payload.encode();
  const array = Uint8Array.wrap(bytes);
  writeArrayAsJson(array);

  hostRunPluginCommand();
}

export function requestPermission(permissions: Array<PermissionType>): void {
  const payload: PluginCommand = {
    name: CommandName.RequestPluginPermissions,
    request_plugin_permission_payload: {
      permissions: permissions.map((ev: i32) => u32(ev)),
    },
  };
  const bytes = payload.encode();
  const array = Uint8Array.wrap(bytes);
  writeArrayAsJson(array);

  hostRunPluginCommand();
}

function writeArrayAsJson(array: Uint8Array): void {
  const json = `[${array}]`;
  process.stdout.write(json);
}
