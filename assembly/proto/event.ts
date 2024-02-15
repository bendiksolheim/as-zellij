import { Encoder, Decoder, Sizer } from "./Encoding";
import { Action, Position } from "./action";
import { Key } from "./key";
import { Style } from "./style";

export enum EventType {
  // / The input mode or relevant metadata changed
  ModeUpdate = 0,
  // / The tab state in the app was changed
  TabUpdate = 1,
  // / The pane state in the app was changed
  PaneUpdate = 2,
  // / A key was pressed while the user is focused on this plugin's pane
  Key = 3,
  // / A mouse event happened while the user is focused on this plugin's pane
  Mouse = 4,
  // / A timer expired set by the `set_timeout` method exported by `zellij-tile`.
  Timer = 5,
  // / Text was copied to the clipboard anywhere in the app
  CopyToClipboard = 6,
  // / Failed to copy text to clipboard anywhere in the app
  SystemClipboardFailure = 7,
  // / Input was received anywhere in the app
  InputReceived = 8,
  // / This plugin became visible or invisible
  Visible = 9,
  // / A message from one of the plugin's workers
  CustomMessage = 10,
  // / A file was created somewhere in the Zellij CWD folder
  FileSystemCreate = 11,
  // / A file was accessed somewhere in the Zellij CWD folder
  FileSystemRead = 12,
  // / A file was modified somewhere in the Zellij CWD folder
  FileSystemUpdate = 13,
  // / A file was deleted somewhere in the Zellij CWD folder
  FileSystemDelete = 14,
  PermissionRequestResult = 15,
  SessionUpdate = 16,
  RunCommandResult = 17,
  WebRequestResult = 18,
} // EventType
export enum CopyDestination {
  Command = 0,
  Primary = 1,
  System = 2,
} // CopyDestination
export enum MouseEventName {
  MouseScrollUp = 0,
  MouseScrollDown = 1,
  MouseLeftClick = 2,
  MouseRightClick = 3,
  MouseHold = 4,
  MouseRelease = 5,
} // MouseEventName
export class EventNameList {
  public event_types: Array<u32> = new Array<u32>();

  // Decodes EventNameList from an ArrayBuffer
  static decode(buf: ArrayBuffer): EventNameList {
    return EventNameList.decodeDataView(new DataView(buf));
  }

  // Decodes EventNameList from a DataView
  static decodeDataView(view: DataView): EventNameList {
    const decoder = new Decoder(view);
    const obj = new EventNameList();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const endPos = decoder.pos + decoder.uint32();
          while (decoder.pos <= endPos) {
            obj.event_types.push(decoder.uint32());
          }

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode EventNameList

  public size(): u32 {
    let size: u32 = 0;

    if (this.event_types.length > 0) {
      const packedSize = __size_uint32_repeated_packed(this.event_types);
      if (packedSize > 0) {
        size += 1 + Sizer.varint64(packedSize) + packedSize;
      }
    }

    return size;
  }

  // Encodes EventNameList to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes EventNameList to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.event_types.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(__size_uint32_repeated_packed(this.event_types));

      for (let n: i32 = 0; n < this.event_types.length; n++) {
        encoder.uint32(this.event_types[n]);
      }
    }

    return buf;
  } // encode EventNameList
} // EventNameList

export class Event {
  public name: u32;
  public mode_update_payload: ModeUpdatePayload | null;
  public tab_update_payload: TabUpdatePayload | null;
  public pane_update_payload: PaneUpdatePayload | null;
  public key_payload: Key | null;
  public mouse_event_payload: MouseEventPayload | null;
  public timer_payload: f32;
  public copy_to_clipboard_payload: u32;
  public visible_payload: bool;
  public custom_message_payload: CustomMessagePayload | null;
  public file_list_payload: FileListPayload | null;
  public permission_request_result_payload: PermissionRequestResultPayload | null;
  public session_update_payload: SessionUpdatePayload | null;
  public run_command_result_payload: RunCommandResultPayload | null;
  public web_request_result_payload: WebRequestResultPayload | null;

  public __payload: string = "";
  public __payload_index: u8 = 0;

  static readonly PAYLOAD_MODE_UPDATE_PAYLOAD_INDEX: u8 = 2;
  static readonly PAYLOAD_TAB_UPDATE_PAYLOAD_INDEX: u8 = 3;
  static readonly PAYLOAD_PANE_UPDATE_PAYLOAD_INDEX: u8 = 4;
  static readonly PAYLOAD_KEY_PAYLOAD_INDEX: u8 = 5;
  static readonly PAYLOAD_MOUSE_EVENT_PAYLOAD_INDEX: u8 = 6;
  static readonly PAYLOAD_TIMER_PAYLOAD_INDEX: u8 = 7;
  static readonly PAYLOAD_COPY_TO_CLIPBOARD_PAYLOAD_INDEX: u8 = 8;
  static readonly PAYLOAD_VISIBLE_PAYLOAD_INDEX: u8 = 9;
  static readonly PAYLOAD_CUSTOM_MESSAGE_PAYLOAD_INDEX: u8 = 10;
  static readonly PAYLOAD_FILE_LIST_PAYLOAD_INDEX: u8 = 11;
  static readonly PAYLOAD_PERMISSION_REQUEST_RESULT_PAYLOAD_INDEX: u8 = 12;
  static readonly PAYLOAD_SESSION_UPDATE_PAYLOAD_INDEX: u8 = 13;
  static readonly PAYLOAD_RUN_COMMAND_RESULT_PAYLOAD_INDEX: u8 = 14;
  static readonly PAYLOAD_WEB_REQUEST_RESULT_PAYLOAD_INDEX: u8 = 15;

  // Decodes Event from an ArrayBuffer
  static decode(buf: ArrayBuffer): Event {
    return Event.decodeDataView(new DataView(buf));
  }

  // Decodes Event from a DataView
  static decodeDataView(view: DataView): Event {
    const decoder = new Decoder(view);
    const obj = new Event();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.name = decoder.uint32();
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.mode_update_payload = ModeUpdatePayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__payload = "mode_update_payload";
          obj.__payload_index = 2;
          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.tab_update_payload = TabUpdatePayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__payload = "tab_update_payload";
          obj.__payload_index = 3;
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.pane_update_payload = PaneUpdatePayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__payload = "pane_update_payload";
          obj.__payload_index = 4;
          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.key_payload = Key.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__payload = "key_payload";
          obj.__payload_index = 5;
          break;
        }
        case 6: {
          const length = decoder.uint32();
          obj.mouse_event_payload = MouseEventPayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__payload = "mouse_event_payload";
          obj.__payload_index = 6;
          break;
        }
        case 7: {
          obj.timer_payload = decoder.float();
          obj.__payload = "timer_payload";
          obj.__payload_index = 7;
          break;
        }
        case 8: {
          obj.copy_to_clipboard_payload = decoder.uint32();
          obj.__payload = "copy_to_clipboard_payload";
          obj.__payload_index = 8;
          break;
        }
        case 9: {
          obj.visible_payload = decoder.bool();
          obj.__payload = "visible_payload";
          obj.__payload_index = 9;
          break;
        }
        case 10: {
          const length = decoder.uint32();
          obj.custom_message_payload = CustomMessagePayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__payload = "custom_message_payload";
          obj.__payload_index = 10;
          break;
        }
        case 11: {
          const length = decoder.uint32();
          obj.file_list_payload = FileListPayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__payload = "file_list_payload";
          obj.__payload_index = 11;
          break;
        }
        case 12: {
          const length = decoder.uint32();
          obj.permission_request_result_payload =
            PermissionRequestResultPayload.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            );
          decoder.skip(length);

          obj.__payload = "permission_request_result_payload";
          obj.__payload_index = 12;
          break;
        }
        case 13: {
          const length = decoder.uint32();
          obj.session_update_payload = SessionUpdatePayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__payload = "session_update_payload";
          obj.__payload_index = 13;
          break;
        }
        case 14: {
          const length = decoder.uint32();
          obj.run_command_result_payload =
            RunCommandResultPayload.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            );
          decoder.skip(length);

          obj.__payload = "run_command_result_payload";
          obj.__payload_index = 14;
          break;
        }
        case 15: {
          const length = decoder.uint32();
          obj.web_request_result_payload =
            WebRequestResultPayload.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            );
          decoder.skip(length);

          obj.__payload = "web_request_result_payload";
          obj.__payload_index = 15;
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Event

  public size(): u32 {
    let size: u32 = 0;

    size += this.name == 0 ? 0 : 1 + Sizer.uint32(this.name);

    if (this.mode_update_payload != null) {
      const f: ModeUpdatePayload = this
        .mode_update_payload as ModeUpdatePayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.tab_update_payload != null) {
      const f: TabUpdatePayload = this.tab_update_payload as TabUpdatePayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.pane_update_payload != null) {
      const f: PaneUpdatePayload = this
        .pane_update_payload as PaneUpdatePayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.key_payload != null) {
      const f: Key = this.key_payload as Key;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.mouse_event_payload != null) {
      const f: MouseEventPayload = this
        .mouse_event_payload as MouseEventPayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += this.timer_payload == 0 ? 0 : 1 + 4;
    size +=
      this.copy_to_clipboard_payload == 0
        ? 0
        : 1 + Sizer.uint32(this.copy_to_clipboard_payload);
    size += this.visible_payload == 0 ? 0 : 1 + 1;

    if (this.custom_message_payload != null) {
      const f: CustomMessagePayload = this
        .custom_message_payload as CustomMessagePayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.file_list_payload != null) {
      const f: FileListPayload = this.file_list_payload as FileListPayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.permission_request_result_payload != null) {
      const f: PermissionRequestResultPayload = this
        .permission_request_result_payload as PermissionRequestResultPayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.session_update_payload != null) {
      const f: SessionUpdatePayload = this
        .session_update_payload as SessionUpdatePayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.run_command_result_payload != null) {
      const f: RunCommandResultPayload = this
        .run_command_result_payload as RunCommandResultPayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.web_request_result_payload != null) {
      const f: WebRequestResultPayload = this
        .web_request_result_payload as WebRequestResultPayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes Event to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes Event to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.name != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.name);
    }

    if (this.mode_update_payload != null) {
      const f = this.mode_update_payload as ModeUpdatePayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.tab_update_payload != null) {
      const f = this.tab_update_payload as TabUpdatePayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.pane_update_payload != null) {
      const f = this.pane_update_payload as PaneUpdatePayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.key_payload != null) {
      const f = this.key_payload as Key;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.mouse_event_payload != null) {
      const f = this.mouse_event_payload as MouseEventPayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.timer_payload != 0) {
      encoder.uint32(0x3d);
      encoder.float(this.timer_payload);
    }
    if (this.copy_to_clipboard_payload != 0) {
      encoder.uint32(0x40);
      encoder.uint32(this.copy_to_clipboard_payload);
    }
    if (this.visible_payload != 0) {
      encoder.uint32(0x48);
      encoder.bool(this.visible_payload);
    }

    if (this.custom_message_payload != null) {
      const f = this.custom_message_payload as CustomMessagePayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x52);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.file_list_payload != null) {
      const f = this.file_list_payload as FileListPayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x5a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.permission_request_result_payload != null) {
      const f = this
        .permission_request_result_payload as PermissionRequestResultPayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x62);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.session_update_payload != null) {
      const f = this.session_update_payload as SessionUpdatePayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x6a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.run_command_result_payload != null) {
      const f = this.run_command_result_payload as RunCommandResultPayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x72);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.web_request_result_payload != null) {
      const f = this.web_request_result_payload as WebRequestResultPayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x7a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode Event
} // Event

export class SessionUpdatePayload {
  public session_manifests: Array<SessionManifest> =
    new Array<SessionManifest>();
  public resurrectable_sessions: Array<ResurrectableSession> =
    new Array<ResurrectableSession>();

  // Decodes SessionUpdatePayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionUpdatePayload {
    return SessionUpdatePayload.decodeDataView(new DataView(buf));
  }

  // Decodes SessionUpdatePayload from a DataView
  static decodeDataView(view: DataView): SessionUpdatePayload {
    const decoder = new Decoder(view);
    const obj = new SessionUpdatePayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.session_manifests.push(
            SessionManifest.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            ),
          );
          decoder.skip(length);

          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.resurrectable_sessions.push(
            ResurrectableSession.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            ),
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SessionUpdatePayload

  public size(): u32 {
    let size: u32 = 0;

    for (let n: i32 = 0; n < this.session_manifests.length; n++) {
      const messageSize = this.session_manifests[n].size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    for (let n: i32 = 0; n < this.resurrectable_sessions.length; n++) {
      const messageSize = this.resurrectable_sessions[n].size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes SessionUpdatePayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes SessionUpdatePayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    for (let n: i32 = 0; n < this.session_manifests.length; n++) {
      const messageSize = this.session_manifests[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        this.session_manifests[n].encodeU8Array(encoder);
      }
    }

    for (let n: i32 = 0; n < this.resurrectable_sessions.length; n++) {
      const messageSize = this.resurrectable_sessions[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        this.resurrectable_sessions[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode SessionUpdatePayload
} // SessionUpdatePayload

export class RunCommandResultPayload {
  public exit_code: i32;
  public stdout: Array<u8> = new Array<u8>();
  public stderr: Array<u8> = new Array<u8>();
  public context: Array<ContextItem> = new Array<ContextItem>();

  public ___exit_code: string = "";
  public ___exit_code_index: u8 = 0;

  static readonly EXIT_CODE_EXIT_CODE_INDEX: u8 = 1;

  // Decodes RunCommandResultPayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): RunCommandResultPayload {
    return RunCommandResultPayload.decodeDataView(new DataView(buf));
  }

  // Decodes RunCommandResultPayload from a DataView
  static decodeDataView(view: DataView): RunCommandResultPayload {
    const decoder = new Decoder(view);
    const obj = new RunCommandResultPayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.exit_code = decoder.int32();
          obj.___exit_code = "exit_code";
          obj.___exit_code_index = 1;
          break;
        }
        case 2: {
          obj.stdout = decoder.bytes();
          break;
        }
        case 3: {
          obj.stderr = decoder.bytes();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.context.push(
            ContextItem.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            ),
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode RunCommandResultPayload

  public size(): u32 {
    let size: u32 = 0;

    size += this.exit_code == 0 ? 0 : 1 + Sizer.int32(this.exit_code);
    size +=
      this.stdout.length > 0
        ? 1 + Sizer.varint64(this.stdout.length) + this.stdout.length
        : 0;
    size +=
      this.stderr.length > 0
        ? 1 + Sizer.varint64(this.stderr.length) + this.stderr.length
        : 0;

    for (let n: i32 = 0; n < this.context.length; n++) {
      const messageSize = this.context[n].size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes RunCommandResultPayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes RunCommandResultPayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.exit_code != 0) {
      encoder.uint32(0x8);
      encoder.int32(this.exit_code);
    }
    if (this.stdout.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.stdout.length);
      encoder.bytes(this.stdout);
    }
    if (this.stderr.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.stderr.length);
      encoder.bytes(this.stderr);
    }

    for (let n: i32 = 0; n < this.context.length; n++) {
      const messageSize = this.context[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        this.context[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode RunCommandResultPayload
} // RunCommandResultPayload

export class WebRequestResultPayload {
  public status: i32;
  public headers: Array<Header> = new Array<Header>();
  public body: Array<u8> = new Array<u8>();
  public context: Array<ContextItem> = new Array<ContextItem>();

  // Decodes WebRequestResultPayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): WebRequestResultPayload {
    return WebRequestResultPayload.decodeDataView(new DataView(buf));
  }

  // Decodes WebRequestResultPayload from a DataView
  static decodeDataView(view: DataView): WebRequestResultPayload {
    const decoder = new Decoder(view);
    const obj = new WebRequestResultPayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.status = decoder.int32();
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.headers.push(
            Header.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            ),
          );
          decoder.skip(length);

          break;
        }
        case 3: {
          obj.body = decoder.bytes();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.context.push(
            ContextItem.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            ),
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode WebRequestResultPayload

  public size(): u32 {
    let size: u32 = 0;

    size += this.status == 0 ? 0 : 1 + Sizer.int32(this.status);

    for (let n: i32 = 0; n < this.headers.length; n++) {
      const messageSize = this.headers[n].size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.body.length > 0
        ? 1 + Sizer.varint64(this.body.length) + this.body.length
        : 0;

    for (let n: i32 = 0; n < this.context.length; n++) {
      const messageSize = this.context[n].size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes WebRequestResultPayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes WebRequestResultPayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.status != 0) {
      encoder.uint32(0x8);
      encoder.int32(this.status);
    }

    for (let n: i32 = 0; n < this.headers.length; n++) {
      const messageSize = this.headers[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        this.headers[n].encodeU8Array(encoder);
      }
    }

    if (this.body.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.body.length);
      encoder.bytes(this.body);
    }

    for (let n: i32 = 0; n < this.context.length; n++) {
      const messageSize = this.context[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        this.context[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode WebRequestResultPayload
} // WebRequestResultPayload

export class ContextItem {
  public name: string = "";
  public value: string = "";

  // Decodes ContextItem from an ArrayBuffer
  static decode(buf: ArrayBuffer): ContextItem {
    return ContextItem.decodeDataView(new DataView(buf));
  }

  // Decodes ContextItem from a DataView
  static decodeDataView(view: DataView): ContextItem {
    const decoder = new Decoder(view);
    const obj = new ContextItem();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.name = decoder.string();
          break;
        }
        case 2: {
          obj.value = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ContextItem

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.name.length > 0
        ? 1 + Sizer.varint64(this.name.length) + this.name.length
        : 0;
    size +=
      this.value.length > 0
        ? 1 + Sizer.varint64(this.value.length) + this.value.length
        : 0;

    return size;
  }

  // Encodes ContextItem to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes ContextItem to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.name.length);
      encoder.string(this.name);
    }
    if (this.value.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.value.length);
      encoder.string(this.value);
    }

    return buf;
  } // encode ContextItem
} // ContextItem

export class Header {
  public name: string = "";
  public value: string = "";

  // Decodes Header from an ArrayBuffer
  static decode(buf: ArrayBuffer): Header {
    return Header.decodeDataView(new DataView(buf));
  }

  // Decodes Header from a DataView
  static decodeDataView(view: DataView): Header {
    const decoder = new Decoder(view);
    const obj = new Header();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.name = decoder.string();
          break;
        }
        case 2: {
          obj.value = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Header

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.name.length > 0
        ? 1 + Sizer.varint64(this.name.length) + this.name.length
        : 0;
    size +=
      this.value.length > 0
        ? 1 + Sizer.varint64(this.value.length) + this.value.length
        : 0;

    return size;
  }

  // Encodes Header to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes Header to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.name.length);
      encoder.string(this.name);
    }
    if (this.value.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.value.length);
      encoder.string(this.value);
    }

    return buf;
  } // encode Header
} // Header

export class PermissionRequestResultPayload {
  public granted: bool;

  // Decodes PermissionRequestResultPayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): PermissionRequestResultPayload {
    return PermissionRequestResultPayload.decodeDataView(new DataView(buf));
  }

  // Decodes PermissionRequestResultPayload from a DataView
  static decodeDataView(view: DataView): PermissionRequestResultPayload {
    const decoder = new Decoder(view);
    const obj = new PermissionRequestResultPayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.granted = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode PermissionRequestResultPayload

  public size(): u32 {
    let size: u32 = 0;

    size += this.granted == 0 ? 0 : 1 + 1;

    return size;
  }

  // Encodes PermissionRequestResultPayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes PermissionRequestResultPayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.granted != 0) {
      encoder.uint32(0x8);
      encoder.bool(this.granted);
    }

    return buf;
  } // encode PermissionRequestResultPayload
} // PermissionRequestResultPayload

export class FileListPayload {
  public paths: Array<string> = new Array<string>();

  // Decodes FileListPayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): FileListPayload {
    return FileListPayload.decodeDataView(new DataView(buf));
  }

  // Decodes FileListPayload from a DataView
  static decodeDataView(view: DataView): FileListPayload {
    const decoder = new Decoder(view);
    const obj = new FileListPayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.paths.push(decoder.string());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode FileListPayload

  public size(): u32 {
    let size: u32 = 0;

    size += __size_string_repeated(this.paths);

    return size;
  }

  // Encodes FileListPayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes FileListPayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.paths.length > 0) {
      for (let n: i32 = 0; n < this.paths.length; n++) {
        encoder.uint32(0xa);
        encoder.uint32(this.paths[n].length);
        encoder.string(this.paths[n]);
      }
    }

    return buf;
  } // encode FileListPayload
} // FileListPayload

export class CustomMessagePayload {
  public message_name: string = "";
  public payload: string = "";

  // Decodes CustomMessagePayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): CustomMessagePayload {
    return CustomMessagePayload.decodeDataView(new DataView(buf));
  }

  // Decodes CustomMessagePayload from a DataView
  static decodeDataView(view: DataView): CustomMessagePayload {
    const decoder = new Decoder(view);
    const obj = new CustomMessagePayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.message_name = decoder.string();
          break;
        }
        case 2: {
          obj.payload = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode CustomMessagePayload

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.message_name.length > 0
        ? 1 +
          Sizer.varint64(this.message_name.length) +
          this.message_name.length
        : 0;
    size +=
      this.payload.length > 0
        ? 1 + Sizer.varint64(this.payload.length) + this.payload.length
        : 0;

    return size;
  }

  // Encodes CustomMessagePayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes CustomMessagePayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.message_name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.message_name.length);
      encoder.string(this.message_name);
    }
    if (this.payload.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.payload.length);
      encoder.string(this.payload);
    }

    return buf;
  } // encode CustomMessagePayload
} // CustomMessagePayload

export class MouseEventPayload {
  public mouse_event_name: u32;
  public line_count: u32;
  public position: Position | null;

  public __mouse_event_payload: string = "";
  public __mouse_event_payload_index: u8 = 0;

  static readonly MOUSE_EVENT_PAYLOAD_LINE_COUNT_INDEX: u8 = 2;
  static readonly MOUSE_EVENT_PAYLOAD_POSITION_INDEX: u8 = 3;

  // Decodes MouseEventPayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): MouseEventPayload {
    return MouseEventPayload.decodeDataView(new DataView(buf));
  }

  // Decodes MouseEventPayload from a DataView
  static decodeDataView(view: DataView): MouseEventPayload {
    const decoder = new Decoder(view);
    const obj = new MouseEventPayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.mouse_event_name = decoder.uint32();
          break;
        }
        case 2: {
          obj.line_count = decoder.uint32();
          obj.__mouse_event_payload = "line_count";
          obj.__mouse_event_payload_index = 2;
          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.position = Position.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__mouse_event_payload = "position";
          obj.__mouse_event_payload_index = 3;
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode MouseEventPayload

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.mouse_event_name == 0 ? 0 : 1 + Sizer.uint32(this.mouse_event_name);
    size += this.line_count == 0 ? 0 : 1 + Sizer.uint32(this.line_count);

    if (this.position != null) {
      const f: Position = this.position as Position;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes MouseEventPayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes MouseEventPayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.mouse_event_name != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.mouse_event_name);
    }
    if (this.line_count != 0) {
      encoder.uint32(0x10);
      encoder.uint32(this.line_count);
    }

    if (this.position != null) {
      const f = this.position as Position;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode MouseEventPayload
} // MouseEventPayload

export class TabUpdatePayload {
  public tab_info: Array<TabInfo> = new Array<TabInfo>();

  // Decodes TabUpdatePayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): TabUpdatePayload {
    return TabUpdatePayload.decodeDataView(new DataView(buf));
  }

  // Decodes TabUpdatePayload from a DataView
  static decodeDataView(view: DataView): TabUpdatePayload {
    const decoder = new Decoder(view);
    const obj = new TabUpdatePayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.tab_info.push(
            TabInfo.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            ),
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode TabUpdatePayload

  public size(): u32 {
    let size: u32 = 0;

    for (let n: i32 = 0; n < this.tab_info.length; n++) {
      const messageSize = this.tab_info[n].size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes TabUpdatePayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes TabUpdatePayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    for (let n: i32 = 0; n < this.tab_info.length; n++) {
      const messageSize = this.tab_info[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        this.tab_info[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode TabUpdatePayload
} // TabUpdatePayload

export class PaneUpdatePayload {
  public pane_manifest: Array<PaneManifest> = new Array<PaneManifest>();

  // Decodes PaneUpdatePayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): PaneUpdatePayload {
    return PaneUpdatePayload.decodeDataView(new DataView(buf));
  }

  // Decodes PaneUpdatePayload from a DataView
  static decodeDataView(view: DataView): PaneUpdatePayload {
    const decoder = new Decoder(view);
    const obj = new PaneUpdatePayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.pane_manifest.push(
            PaneManifest.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            ),
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode PaneUpdatePayload

  public size(): u32 {
    let size: u32 = 0;

    for (let n: i32 = 0; n < this.pane_manifest.length; n++) {
      const messageSize = this.pane_manifest[n].size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes PaneUpdatePayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes PaneUpdatePayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    for (let n: i32 = 0; n < this.pane_manifest.length; n++) {
      const messageSize = this.pane_manifest[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        this.pane_manifest[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode PaneUpdatePayload
} // PaneUpdatePayload

export class PaneManifest {
  public tab_index: u32;
  public panes: Array<PaneInfo> = new Array<PaneInfo>();

  // Decodes PaneManifest from an ArrayBuffer
  static decode(buf: ArrayBuffer): PaneManifest {
    return PaneManifest.decodeDataView(new DataView(buf));
  }

  // Decodes PaneManifest from a DataView
  static decodeDataView(view: DataView): PaneManifest {
    const decoder = new Decoder(view);
    const obj = new PaneManifest();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.tab_index = decoder.uint32();
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.panes.push(
            PaneInfo.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            ),
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode PaneManifest

  public size(): u32 {
    let size: u32 = 0;

    size += this.tab_index == 0 ? 0 : 1 + Sizer.uint32(this.tab_index);

    for (let n: i32 = 0; n < this.panes.length; n++) {
      const messageSize = this.panes[n].size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes PaneManifest to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes PaneManifest to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.tab_index != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.tab_index);
    }

    for (let n: i32 = 0; n < this.panes.length; n++) {
      const messageSize = this.panes[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        this.panes[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode PaneManifest
} // PaneManifest

export class SessionManifest {
  public name: string = "";
  public tabs: Array<TabInfo> = new Array<TabInfo>();
  public panes: Array<PaneManifest> = new Array<PaneManifest>();
  public connected_clients: u32;
  public is_current_session: bool;

  // Decodes SessionManifest from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionManifest {
    return SessionManifest.decodeDataView(new DataView(buf));
  }

  // Decodes SessionManifest from a DataView
  static decodeDataView(view: DataView): SessionManifest {
    const decoder = new Decoder(view);
    const obj = new SessionManifest();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.name = decoder.string();
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.tabs.push(
            TabInfo.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            ),
          );
          decoder.skip(length);

          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.panes.push(
            PaneManifest.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            ),
          );
          decoder.skip(length);

          break;
        }
        case 4: {
          obj.connected_clients = decoder.uint32();
          break;
        }
        case 5: {
          obj.is_current_session = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SessionManifest

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.name.length > 0
        ? 1 + Sizer.varint64(this.name.length) + this.name.length
        : 0;

    for (let n: i32 = 0; n < this.tabs.length; n++) {
      const messageSize = this.tabs[n].size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    for (let n: i32 = 0; n < this.panes.length; n++) {
      const messageSize = this.panes[n].size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.connected_clients == 0
        ? 0
        : 1 + Sizer.uint32(this.connected_clients);
    size += this.is_current_session == 0 ? 0 : 1 + 1;

    return size;
  }

  // Encodes SessionManifest to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes SessionManifest to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.name.length);
      encoder.string(this.name);
    }

    for (let n: i32 = 0; n < this.tabs.length; n++) {
      const messageSize = this.tabs[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        this.tabs[n].encodeU8Array(encoder);
      }
    }

    for (let n: i32 = 0; n < this.panes.length; n++) {
      const messageSize = this.panes[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        this.panes[n].encodeU8Array(encoder);
      }
    }

    if (this.connected_clients != 0) {
      encoder.uint32(0x20);
      encoder.uint32(this.connected_clients);
    }
    if (this.is_current_session != 0) {
      encoder.uint32(0x28);
      encoder.bool(this.is_current_session);
    }

    return buf;
  } // encode SessionManifest
} // SessionManifest

export class ResurrectableSession {
  public name: string = "";
  public creation_time: u64;

  // Decodes ResurrectableSession from an ArrayBuffer
  static decode(buf: ArrayBuffer): ResurrectableSession {
    return ResurrectableSession.decodeDataView(new DataView(buf));
  }

  // Decodes ResurrectableSession from a DataView
  static decodeDataView(view: DataView): ResurrectableSession {
    const decoder = new Decoder(view);
    const obj = new ResurrectableSession();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.name = decoder.string();
          break;
        }
        case 2: {
          obj.creation_time = decoder.uint64();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ResurrectableSession

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.name.length > 0
        ? 1 + Sizer.varint64(this.name.length) + this.name.length
        : 0;
    size += this.creation_time == 0 ? 0 : 1 + Sizer.uint64(this.creation_time);

    return size;
  }

  // Encodes ResurrectableSession to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes ResurrectableSession to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.name.length);
      encoder.string(this.name);
    }
    if (this.creation_time != 0) {
      encoder.uint32(0x10);
      encoder.uint64(this.creation_time);
    }

    return buf;
  } // encode ResurrectableSession
} // ResurrectableSession

export class PaneInfo {
  public id: u32;
  public is_plugin: bool;
  public is_focused: bool;
  public is_fullscreen: bool;
  public is_floating: bool;
  public is_suppressed: bool;
  public title: string = "";
  public exited: bool;
  public exit_status: i32;
  public is_held: bool;
  public pane_x: u32;
  public pane_content_x: u32;
  public pane_y: u32;
  public pane_content_y: u32;
  public pane_rows: u32;
  public pane_content_rows: u32;
  public pane_columns: u32;
  public pane_content_columns: u32;
  public cursor_coordinates_in_pane: Position | null;
  public terminal_command: string = "";
  public plugin_url: string = "";
  public is_selectable: bool;

  public ___exit_status: string = "";
  public ___exit_status_index: u8 = 0;

  public ___cursor_coordinates_in_pane: string = "";
  public ___cursor_coordinates_in_pane_index: u8 = 0;

  public ___terminal_command: string = "";
  public ___terminal_command_index: u8 = 0;

  public ___plugin_url: string = "";
  public ___plugin_url_index: u8 = 0;

  static readonly EXIT_STATUS_EXIT_STATUS_INDEX: u8 = 9;
  static readonly CURSOR_COORDINATES_IN_PANE_CURSOR_COORDINATES_IN_PANE_INDEX: u8 = 19;
  static readonly TERMINAL_COMMAND_TERMINAL_COMMAND_INDEX: u8 = 20;
  static readonly PLUGIN_URL_PLUGIN_URL_INDEX: u8 = 21;

  // Decodes PaneInfo from an ArrayBuffer
  static decode(buf: ArrayBuffer): PaneInfo {
    return PaneInfo.decodeDataView(new DataView(buf));
  }

  // Decodes PaneInfo from a DataView
  static decodeDataView(view: DataView): PaneInfo {
    const decoder = new Decoder(view);
    const obj = new PaneInfo();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.id = decoder.uint32();
          break;
        }
        case 2: {
          obj.is_plugin = decoder.bool();
          break;
        }
        case 3: {
          obj.is_focused = decoder.bool();
          break;
        }
        case 4: {
          obj.is_fullscreen = decoder.bool();
          break;
        }
        case 5: {
          obj.is_floating = decoder.bool();
          break;
        }
        case 6: {
          obj.is_suppressed = decoder.bool();
          break;
        }
        case 7: {
          obj.title = decoder.string();
          break;
        }
        case 8: {
          obj.exited = decoder.bool();
          break;
        }
        case 9: {
          obj.exit_status = decoder.int32();
          obj.___exit_status = "exit_status";
          obj.___exit_status_index = 9;
          break;
        }
        case 10: {
          obj.is_held = decoder.bool();
          break;
        }
        case 11: {
          obj.pane_x = decoder.uint32();
          break;
        }
        case 12: {
          obj.pane_content_x = decoder.uint32();
          break;
        }
        case 13: {
          obj.pane_y = decoder.uint32();
          break;
        }
        case 14: {
          obj.pane_content_y = decoder.uint32();
          break;
        }
        case 15: {
          obj.pane_rows = decoder.uint32();
          break;
        }
        case 16: {
          obj.pane_content_rows = decoder.uint32();
          break;
        }
        case 17: {
          obj.pane_columns = decoder.uint32();
          break;
        }
        case 18: {
          obj.pane_content_columns = decoder.uint32();
          break;
        }
        case 19: {
          const length = decoder.uint32();
          obj.cursor_coordinates_in_pane = Position.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.___cursor_coordinates_in_pane = "cursor_coordinates_in_pane";
          obj.___cursor_coordinates_in_pane_index = 19;
          break;
        }
        case 20: {
          obj.terminal_command = decoder.string();
          obj.___terminal_command = "terminal_command";
          obj.___terminal_command_index = 20;
          break;
        }
        case 21: {
          obj.plugin_url = decoder.string();
          obj.___plugin_url = "plugin_url";
          obj.___plugin_url_index = 21;
          break;
        }
        case 22: {
          obj.is_selectable = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode PaneInfo

  public size(): u32 {
    let size: u32 = 0;

    size += this.id == 0 ? 0 : 1 + Sizer.uint32(this.id);
    size += this.is_plugin == 0 ? 0 : 1 + 1;
    size += this.is_focused == 0 ? 0 : 1 + 1;
    size += this.is_fullscreen == 0 ? 0 : 1 + 1;
    size += this.is_floating == 0 ? 0 : 1 + 1;
    size += this.is_suppressed == 0 ? 0 : 1 + 1;
    size +=
      this.title.length > 0
        ? 1 + Sizer.varint64(this.title.length) + this.title.length
        : 0;
    size += this.exited == 0 ? 0 : 1 + 1;
    size += this.exit_status == 0 ? 0 : 1 + Sizer.int32(this.exit_status);
    size += this.is_held == 0 ? 0 : 1 + 1;
    size += this.pane_x == 0 ? 0 : 1 + Sizer.uint32(this.pane_x);
    size +=
      this.pane_content_x == 0 ? 0 : 1 + Sizer.uint32(this.pane_content_x);
    size += this.pane_y == 0 ? 0 : 1 + Sizer.uint32(this.pane_y);
    size +=
      this.pane_content_y == 0 ? 0 : 1 + Sizer.uint32(this.pane_content_y);
    size += this.pane_rows == 0 ? 0 : 1 + Sizer.uint32(this.pane_rows);
    size +=
      this.pane_content_rows == 0
        ? 0
        : 2 + Sizer.uint32(this.pane_content_rows);
    size += this.pane_columns == 0 ? 0 : 2 + Sizer.uint32(this.pane_columns);
    size +=
      this.pane_content_columns == 0
        ? 0
        : 2 + Sizer.uint32(this.pane_content_columns);

    if (this.cursor_coordinates_in_pane != null) {
      const f: Position = this.cursor_coordinates_in_pane as Position;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.terminal_command.length > 0
        ? 2 +
          Sizer.varint64(this.terminal_command.length) +
          this.terminal_command.length
        : 0;
    size +=
      this.plugin_url.length > 0
        ? 2 + Sizer.varint64(this.plugin_url.length) + this.plugin_url.length
        : 0;
    size += this.is_selectable == 0 ? 0 : 2 + 1;

    return size;
  }

  // Encodes PaneInfo to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes PaneInfo to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.id != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.id);
    }
    if (this.is_plugin != 0) {
      encoder.uint32(0x10);
      encoder.bool(this.is_plugin);
    }
    if (this.is_focused != 0) {
      encoder.uint32(0x18);
      encoder.bool(this.is_focused);
    }
    if (this.is_fullscreen != 0) {
      encoder.uint32(0x20);
      encoder.bool(this.is_fullscreen);
    }
    if (this.is_floating != 0) {
      encoder.uint32(0x28);
      encoder.bool(this.is_floating);
    }
    if (this.is_suppressed != 0) {
      encoder.uint32(0x30);
      encoder.bool(this.is_suppressed);
    }
    if (this.title.length > 0) {
      encoder.uint32(0x3a);
      encoder.uint32(this.title.length);
      encoder.string(this.title);
    }
    if (this.exited != 0) {
      encoder.uint32(0x40);
      encoder.bool(this.exited);
    }
    if (this.exit_status != 0) {
      encoder.uint32(0x48);
      encoder.int32(this.exit_status);
    }
    if (this.is_held != 0) {
      encoder.uint32(0x50);
      encoder.bool(this.is_held);
    }
    if (this.pane_x != 0) {
      encoder.uint32(0x58);
      encoder.uint32(this.pane_x);
    }
    if (this.pane_content_x != 0) {
      encoder.uint32(0x60);
      encoder.uint32(this.pane_content_x);
    }
    if (this.pane_y != 0) {
      encoder.uint32(0x68);
      encoder.uint32(this.pane_y);
    }
    if (this.pane_content_y != 0) {
      encoder.uint32(0x70);
      encoder.uint32(this.pane_content_y);
    }
    if (this.pane_rows != 0) {
      encoder.uint32(0x78);
      encoder.uint32(this.pane_rows);
    }
    if (this.pane_content_rows != 0) {
      encoder.uint32(0x80);
      encoder.uint32(this.pane_content_rows);
    }
    if (this.pane_columns != 0) {
      encoder.uint32(0x88);
      encoder.uint32(this.pane_columns);
    }
    if (this.pane_content_columns != 0) {
      encoder.uint32(0x90);
      encoder.uint32(this.pane_content_columns);
    }

    if (this.cursor_coordinates_in_pane != null) {
      const f = this.cursor_coordinates_in_pane as Position;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x9a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.terminal_command.length > 0) {
      encoder.uint32(0xa2);
      encoder.uint32(this.terminal_command.length);
      encoder.string(this.terminal_command);
    }
    if (this.plugin_url.length > 0) {
      encoder.uint32(0xaa);
      encoder.uint32(this.plugin_url.length);
      encoder.string(this.plugin_url);
    }
    if (this.is_selectable != 0) {
      encoder.uint32(0xb0);
      encoder.bool(this.is_selectable);
    }

    return buf;
  } // encode PaneInfo
} // PaneInfo

export class TabInfo {
  public position: u32;
  public name: string = "";
  public active: bool;
  public panes_to_hide: u32;
  public is_fullscreen_active: bool;
  public is_sync_panes_active: bool;
  public are_floating_panes_visible: bool;
  public other_focused_clients: Array<u32> = new Array<u32>();
  public active_swap_layout_name: string = "";
  public is_swap_layout_dirty: bool;

  public ___active_swap_layout_name: string = "";
  public ___active_swap_layout_name_index: u8 = 0;

  static readonly ACTIVE_SWAP_LAYOUT_NAME_ACTIVE_SWAP_LAYOUT_NAME_INDEX: u8 = 9;

  // Decodes TabInfo from an ArrayBuffer
  static decode(buf: ArrayBuffer): TabInfo {
    return TabInfo.decodeDataView(new DataView(buf));
  }

  // Decodes TabInfo from a DataView
  static decodeDataView(view: DataView): TabInfo {
    const decoder = new Decoder(view);
    const obj = new TabInfo();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.position = decoder.uint32();
          break;
        }
        case 2: {
          obj.name = decoder.string();
          break;
        }
        case 3: {
          obj.active = decoder.bool();
          break;
        }
        case 4: {
          obj.panes_to_hide = decoder.uint32();
          break;
        }
        case 5: {
          obj.is_fullscreen_active = decoder.bool();
          break;
        }
        case 6: {
          obj.is_sync_panes_active = decoder.bool();
          break;
        }
        case 7: {
          obj.are_floating_panes_visible = decoder.bool();
          break;
        }
        case 8: {
          const endPos = decoder.pos + decoder.uint32();
          while (decoder.pos <= endPos) {
            obj.other_focused_clients.push(decoder.uint32());
          }

          break;
        }
        case 9: {
          obj.active_swap_layout_name = decoder.string();
          obj.___active_swap_layout_name = "active_swap_layout_name";
          obj.___active_swap_layout_name_index = 9;
          break;
        }
        case 10: {
          obj.is_swap_layout_dirty = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode TabInfo

  public size(): u32 {
    let size: u32 = 0;

    size += this.position == 0 ? 0 : 1 + Sizer.uint32(this.position);
    size +=
      this.name.length > 0
        ? 1 + Sizer.varint64(this.name.length) + this.name.length
        : 0;
    size += this.active == 0 ? 0 : 1 + 1;
    size += this.panes_to_hide == 0 ? 0 : 1 + Sizer.uint32(this.panes_to_hide);
    size += this.is_fullscreen_active == 0 ? 0 : 1 + 1;
    size += this.is_sync_panes_active == 0 ? 0 : 1 + 1;
    size += this.are_floating_panes_visible == 0 ? 0 : 1 + 1;

    if (this.other_focused_clients.length > 0) {
      const packedSize = __size_uint32_repeated_packed(
        this.other_focused_clients,
      );
      if (packedSize > 0) {
        size += 1 + Sizer.varint64(packedSize) + packedSize;
      }
    }

    size +=
      this.active_swap_layout_name.length > 0
        ? 1 +
          Sizer.varint64(this.active_swap_layout_name.length) +
          this.active_swap_layout_name.length
        : 0;
    size += this.is_swap_layout_dirty == 0 ? 0 : 1 + 1;

    return size;
  }

  // Encodes TabInfo to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes TabInfo to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.position != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.position);
    }
    if (this.name.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.name.length);
      encoder.string(this.name);
    }
    if (this.active != 0) {
      encoder.uint32(0x18);
      encoder.bool(this.active);
    }
    if (this.panes_to_hide != 0) {
      encoder.uint32(0x20);
      encoder.uint32(this.panes_to_hide);
    }
    if (this.is_fullscreen_active != 0) {
      encoder.uint32(0x28);
      encoder.bool(this.is_fullscreen_active);
    }
    if (this.is_sync_panes_active != 0) {
      encoder.uint32(0x30);
      encoder.bool(this.is_sync_panes_active);
    }
    if (this.are_floating_panes_visible != 0) {
      encoder.uint32(0x38);
      encoder.bool(this.are_floating_panes_visible);
    }

    if (this.other_focused_clients.length > 0) {
      encoder.uint32(0x42);
      encoder.uint32(__size_uint32_repeated_packed(this.other_focused_clients));

      for (let n: i32 = 0; n < this.other_focused_clients.length; n++) {
        encoder.uint32(this.other_focused_clients[n]);
      }
    }

    if (this.active_swap_layout_name.length > 0) {
      encoder.uint32(0x4a);
      encoder.uint32(this.active_swap_layout_name.length);
      encoder.string(this.active_swap_layout_name);
    }
    if (this.is_swap_layout_dirty != 0) {
      encoder.uint32(0x50);
      encoder.bool(this.is_swap_layout_dirty);
    }

    return buf;
  } // encode TabInfo
} // TabInfo

export class ModeUpdatePayload {
  public current_mode: u32;
  public keybinds: Array<InputModeKeybinds> = new Array<InputModeKeybinds>();
  public style: Style = new Style();
  public arrow_fonts_support: bool;
  public session_name: string = "";

  public ___session_name: string = "";
  public ___session_name_index: u8 = 0;

  static readonly SESSION_NAME_SESSION_NAME_INDEX: u8 = 5;

  // Decodes ModeUpdatePayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): ModeUpdatePayload {
    return ModeUpdatePayload.decodeDataView(new DataView(buf));
  }

  // Decodes ModeUpdatePayload from a DataView
  static decodeDataView(view: DataView): ModeUpdatePayload {
    const decoder = new Decoder(view);
    const obj = new ModeUpdatePayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.current_mode = decoder.uint32();
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.keybinds.push(
            InputModeKeybinds.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            ),
          );
          decoder.skip(length);

          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.style = Style.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          break;
        }
        case 4: {
          obj.arrow_fonts_support = decoder.bool();
          break;
        }
        case 5: {
          obj.session_name = decoder.string();
          obj.___session_name = "session_name";
          obj.___session_name_index = 5;
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ModeUpdatePayload

  public size(): u32 {
    let size: u32 = 0;

    size += this.current_mode == 0 ? 0 : 1 + Sizer.uint32(this.current_mode);

    for (let n: i32 = 0; n < this.keybinds.length; n++) {
      const messageSize = this.keybinds[n].size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.style != null) {
      const f: Style = this.style as Style;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += this.arrow_fonts_support == 0 ? 0 : 1 + 1;
    size +=
      this.session_name.length > 0
        ? 1 +
          Sizer.varint64(this.session_name.length) +
          this.session_name.length
        : 0;

    return size;
  }

  // Encodes ModeUpdatePayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes ModeUpdatePayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.current_mode != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.current_mode);
    }

    for (let n: i32 = 0; n < this.keybinds.length; n++) {
      const messageSize = this.keybinds[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        this.keybinds[n].encodeU8Array(encoder);
      }
    }

    if (this.style != null) {
      const f = this.style as Style;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.arrow_fonts_support != 0) {
      encoder.uint32(0x20);
      encoder.bool(this.arrow_fonts_support);
    }
    if (this.session_name.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.session_name.length);
      encoder.string(this.session_name);
    }

    return buf;
  } // encode ModeUpdatePayload
} // ModeUpdatePayload

export class InputModeKeybinds {
  public mode: u32;
  public key_bind: Array<KeyBind> = new Array<KeyBind>();

  // Decodes InputModeKeybinds from an ArrayBuffer
  static decode(buf: ArrayBuffer): InputModeKeybinds {
    return InputModeKeybinds.decodeDataView(new DataView(buf));
  }

  // Decodes InputModeKeybinds from a DataView
  static decodeDataView(view: DataView): InputModeKeybinds {
    const decoder = new Decoder(view);
    const obj = new InputModeKeybinds();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.mode = decoder.uint32();
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.key_bind.push(
            KeyBind.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            ),
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode InputModeKeybinds

  public size(): u32 {
    let size: u32 = 0;

    size += this.mode == 0 ? 0 : 1 + Sizer.uint32(this.mode);

    for (let n: i32 = 0; n < this.key_bind.length; n++) {
      const messageSize = this.key_bind[n].size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes InputModeKeybinds to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes InputModeKeybinds to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.mode != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.mode);
    }

    for (let n: i32 = 0; n < this.key_bind.length; n++) {
      const messageSize = this.key_bind[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        this.key_bind[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode InputModeKeybinds
} // InputModeKeybinds

export class KeyBind {
  public key: Key = new Key();
  public action: Array<Action> = new Array<Action>();

  // Decodes KeyBind from an ArrayBuffer
  static decode(buf: ArrayBuffer): KeyBind {
    return KeyBind.decodeDataView(new DataView(buf));
  }

  // Decodes KeyBind from a DataView
  static decodeDataView(view: DataView): KeyBind {
    const decoder = new Decoder(view);
    const obj = new KeyBind();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.key = Key.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.action.push(
            Action.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            ),
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode KeyBind

  public size(): u32 {
    let size: u32 = 0;

    if (this.key != null) {
      const f: Key = this.key as Key;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    for (let n: i32 = 0; n < this.action.length; n++) {
      const messageSize = this.action[n].size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes KeyBind to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes KeyBind to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.key != null) {
      const f = this.key as Key;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    for (let n: i32 = 0; n < this.action.length; n++) {
      const messageSize = this.action[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        this.action[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode KeyBind
} // KeyBind

// __size_string_repeated

function __size_string_repeated(value: Array<string>): u32 {
  let size: u32 = 0;

  for (let n: i32 = 0; n < value.length; n++) {
    size += 1 + Sizer.varint64(value[n].length) + value[n].length;
  }

  return size;
}

// __size_uint32_repeated_packed

function __size_uint32_repeated_packed(value: Array<u32>): u32 {
  let size: u32 = 0;

  for (let n: i32 = 0; n < value.length; n++) {
    size += Sizer.uint32(value[n]);
  }

  return size;
}
