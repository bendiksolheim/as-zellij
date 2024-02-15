import { Encoder, Decoder, Sizer } from "./Encoding";

export class File {
  public path: string = "";
  public line_number: i32;
  public cwd: string = "";

  public ___line_number: string = "";
  public ___line_number_index: u8 = 0;

  public ___cwd: string = "";
  public ___cwd_index: u8 = 0;

  static readonly LINE_NUMBER_LINE_NUMBER_INDEX: u8 = 2;
  static readonly CWD_CWD_INDEX: u8 = 3;

  // Decodes File from an ArrayBuffer
  static decode(buf: ArrayBuffer): File {
    return File.decodeDataView(new DataView(buf));
  }

  // Decodes File from a DataView
  static decodeDataView(view: DataView): File {
    const decoder = new Decoder(view);
    const obj = new File();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.path = decoder.string();
          break;
        }
        case 2: {
          obj.line_number = decoder.int32();
          obj.___line_number = "line_number";
          obj.___line_number_index = 2;
          break;
        }
        case 3: {
          obj.cwd = decoder.string();
          obj.___cwd = "cwd";
          obj.___cwd_index = 3;
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode File

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.path.length > 0
        ? 1 + Sizer.varint64(this.path.length) + this.path.length
        : 0;
    size += this.line_number == 0 ? 0 : 1 + Sizer.int32(this.line_number);
    size +=
      this.cwd.length > 0
        ? 1 + Sizer.varint64(this.cwd.length) + this.cwd.length
        : 0;

    return size;
  }

  // Encodes File to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes File to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.path.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.path.length);
      encoder.string(this.path);
    }
    if (this.line_number != 0) {
      encoder.uint32(0x10);
      encoder.int32(this.line_number);
    }
    if (this.cwd.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.cwd.length);
      encoder.string(this.cwd);
    }

    return buf;
  } // encode File
} // File
