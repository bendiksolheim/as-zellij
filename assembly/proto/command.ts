import { Encoder, Decoder, Sizer } from "./Encoding";

export class Command {
  public path: string = "";
  public args: Array<string> = new Array<string>();
  public cwd: string = "";

  public ___cwd: string = "";
  public ___cwd_index: u8 = 0;

  static readonly CWD_CWD_INDEX: u8 = 3;

  // Decodes Command from an ArrayBuffer
  static decode(buf: ArrayBuffer): Command {
    return Command.decodeDataView(new DataView(buf));
  }

  // Decodes Command from a DataView
  static decodeDataView(view: DataView): Command {
    const decoder = new Decoder(view);
    const obj = new Command();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.path = decoder.string();
          break;
        }
        case 2: {
          obj.args.push(decoder.string());
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
  } // decode Command

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.path.length > 0
        ? 1 + Sizer.varint64(this.path.length) + this.path.length
        : 0;

    size += __size_string_repeated(this.args);

    size +=
      this.cwd.length > 0
        ? 1 + Sizer.varint64(this.cwd.length) + this.cwd.length
        : 0;

    return size;
  }

  // Encodes Command to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes Command to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.path.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.path.length);
      encoder.string(this.path);
    }

    if (this.args.length > 0) {
      for (let n: i32 = 0; n < this.args.length; n++) {
        encoder.uint32(0x12);
        encoder.uint32(this.args[n].length);
        encoder.string(this.args[n]);
      }
    }

    if (this.cwd.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.cwd.length);
      encoder.string(this.cwd);
    }

    return buf;
  } // encode Command
} // Command

// __size_string_repeated

function __size_string_repeated(value: Array<string>): u32 {
  let size: u32 = 0;

  for (let n: i32 = 0; n < value.length; n++) {
    size += 1 + Sizer.varint64(value[n].length) + value[n].length;
  }

  return size;
}
