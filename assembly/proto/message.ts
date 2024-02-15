import { Encoder, Decoder, Sizer } from "./Encoding";

export class Message {
  public name: string = "";
  public payload: string = "";
  public worker_name: string = "";

  public ___worker_name: string = "";
  public ___worker_name_index: u8 = 0;

  static readonly WORKER_NAME_WORKER_NAME_INDEX: u8 = 3;

  // Decodes Message from an ArrayBuffer
  static decode(buf: ArrayBuffer): Message {
    return Message.decodeDataView(new DataView(buf));
  }

  // Decodes Message from a DataView
  static decodeDataView(view: DataView): Message {
    const decoder = new Decoder(view);
    const obj = new Message();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.name = decoder.string();
          break;
        }
        case 2: {
          obj.payload = decoder.string();
          break;
        }
        case 3: {
          obj.worker_name = decoder.string();
          obj.___worker_name = "worker_name";
          obj.___worker_name_index = 3;
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Message

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.name.length > 0
        ? 1 + Sizer.varint64(this.name.length) + this.name.length
        : 0;
    size +=
      this.payload.length > 0
        ? 1 + Sizer.varint64(this.payload.length) + this.payload.length
        : 0;
    size +=
      this.worker_name.length > 0
        ? 1 + Sizer.varint64(this.worker_name.length) + this.worker_name.length
        : 0;

    return size;
  }

  // Encodes Message to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes Message to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.name.length);
      encoder.string(this.name);
    }
    if (this.payload.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.payload.length);
      encoder.string(this.payload);
    }
    if (this.worker_name.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.worker_name.length);
      encoder.string(this.worker_name);
    }

    return buf;
  } // encode Message
} // Message
