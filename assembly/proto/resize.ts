import { Encoder, Decoder, Sizer } from "./Encoding";

export enum ResizeAction {
  Increase = 0,
  Decrease = 1,
} // ResizeAction
export enum ResizeDirection {
  Left = 0,
  Right = 1,
  Up = 2,
  Down = 3,
} // ResizeDirection
export class Resize {
  public resize_action: u32;
  public direction: u32;

  public ___direction: string = "";
  public ___direction_index: u8 = 0;

  static readonly DIRECTION_DIRECTION_INDEX: u8 = 2;

  // Decodes Resize from an ArrayBuffer
  static decode(buf: ArrayBuffer): Resize {
    return Resize.decodeDataView(new DataView(buf));
  }

  // Decodes Resize from a DataView
  static decodeDataView(view: DataView): Resize {
    const decoder = new Decoder(view);
    const obj = new Resize();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.resize_action = decoder.uint32();
          break;
        }
        case 2: {
          obj.direction = decoder.uint32();
          obj.___direction = "direction";
          obj.___direction_index = 2;
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Resize

  public size(): u32 {
    let size: u32 = 0;

    size += this.resize_action == 0 ? 0 : 1 + Sizer.uint32(this.resize_action);
    size += this.direction == 0 ? 0 : 1 + Sizer.uint32(this.direction);

    return size;
  }

  // Encodes Resize to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes Resize to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.resize_action != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.resize_action);
    }
    if (this.direction != 0) {
      encoder.uint32(0x10);
      encoder.uint32(this.direction);
    }

    return buf;
  } // encode Resize
} // Resize

export class MoveDirection {
  public direction: u32;

  // Decodes MoveDirection from an ArrayBuffer
  static decode(buf: ArrayBuffer): MoveDirection {
    return MoveDirection.decodeDataView(new DataView(buf));
  }

  // Decodes MoveDirection from a DataView
  static decodeDataView(view: DataView): MoveDirection {
    const decoder = new Decoder(view);
    const obj = new MoveDirection();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.direction = decoder.uint32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode MoveDirection

  public size(): u32 {
    let size: u32 = 0;

    size += this.direction == 0 ? 0 : 1 + Sizer.uint32(this.direction);

    return size;
  }

  // Encodes MoveDirection to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes MoveDirection to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.direction != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.direction);
    }

    return buf;
  } // encode MoveDirection
} // MoveDirection
