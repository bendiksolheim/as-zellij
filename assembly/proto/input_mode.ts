import { Encoder, Decoder, Sizer } from "./Encoding";

export enum InputMode {
  /**
   * / In `Normal` mode, input is always written to the terminal, except for the shortcuts leading
   * / to other modes
   */
  Normal = 0,
  /**
   * / In `Locked` mode, input is always written to the terminal and all shortcuts are disabled
   * / except the one leading back to normal mode
   */
  Locked = 1,
  // / `Resize` mode allows resizing the different existing panes.
  Resize = 2,
  // / `Pane` mode allows creating and closing panes, as well as moving between them.
  Pane = 3,
  // / `Tab` mode allows creating and closing tabs, as well as moving between them.
  Tab = 4,
  // / `Scroll` mode allows scrolling up and down within a pane.
  Scroll = 5,
  // / `EnterSearch` mode allows for typing in the needle for a search in the scroll buffer of a pane.
  EnterSearch = 6,
  // / `Search` mode allows for searching a term in a pane (superset of `Scroll`).
  Search = 7,
  // / `RenameTab` mode allows assigning a new name to a tab.
  RenameTab = 8,
  // / `RenamePane` mode allows assigning a new name to a pane.
  RenamePane = 9,
  // / `Session` mode allows detaching sessions
  Session = 10,
  // / `Move` mode allows moving the different existing panes within a tab
  Move = 11,
  // / `Prompt` mode allows interacting with active prompts.
  Prompt = 12,
  // / `Tmux` mode allows for basic tmux keybindings functionality
  Tmux = 13,
} // InputMode
export class InputModeMessage {
  public input_mode: u32;

  // Decodes InputModeMessage from an ArrayBuffer
  static decode(buf: ArrayBuffer): InputModeMessage {
    return InputModeMessage.decodeDataView(new DataView(buf));
  }

  // Decodes InputModeMessage from a DataView
  static decodeDataView(view: DataView): InputModeMessage {
    const decoder = new Decoder(view);
    const obj = new InputModeMessage();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.input_mode = decoder.uint32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode InputModeMessage

  public size(): u32 {
    let size: u32 = 0;

    size += this.input_mode == 0 ? 0 : 1 + Sizer.uint32(this.input_mode);

    return size;
  }

  // Encodes InputModeMessage to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes InputModeMessage to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.input_mode != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.input_mode);
    }

    return buf;
  } // encode InputModeMessage
} // InputModeMessage
