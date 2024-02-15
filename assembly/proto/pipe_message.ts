import { Encoder, Decoder, Sizer } from "./Encoding";

export enum PipeSource {
  Cli = 0,
  Plugin = 1,
} // PipeSource
export class PipeMessage {
  public source: u32;
  public cli_source_id: string = "";
  public plugin_source_id: u32;
  public name: string = "";
  public payload: string = "";
  public args: Array<Arg> = new Array<Arg>();
  public is_private: bool;

  public ___cli_source_id: string = "";
  public ___cli_source_id_index: u8 = 0;

  public ___plugin_source_id: string = "";
  public ___plugin_source_id_index: u8 = 0;

  public ___payload: string = "";
  public ___payload_index: u8 = 0;

  static readonly CLI_SOURCE_ID_CLI_SOURCE_ID_INDEX: u8 = 2;
  static readonly PLUGIN_SOURCE_ID_PLUGIN_SOURCE_ID_INDEX: u8 = 3;
  static readonly PAYLOAD_PAYLOAD_INDEX: u8 = 5;

  // Decodes PipeMessage from an ArrayBuffer
  static decode(buf: ArrayBuffer): PipeMessage {
    return PipeMessage.decodeDataView(new DataView(buf));
  }

  // Decodes PipeMessage from a DataView
  static decodeDataView(view: DataView): PipeMessage {
    const decoder = new Decoder(view);
    const obj = new PipeMessage();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.source = decoder.uint32();
          break;
        }
        case 2: {
          obj.cli_source_id = decoder.string();
          obj.___cli_source_id = "cli_source_id";
          obj.___cli_source_id_index = 2;
          break;
        }
        case 3: {
          obj.plugin_source_id = decoder.uint32();
          obj.___plugin_source_id = "plugin_source_id";
          obj.___plugin_source_id_index = 3;
          break;
        }
        case 4: {
          obj.name = decoder.string();
          break;
        }
        case 5: {
          obj.payload = decoder.string();
          obj.___payload = "payload";
          obj.___payload_index = 5;
          break;
        }
        case 6: {
          const length = decoder.uint32();
          obj.args.push(
            Arg.decodeDataView(
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
        case 7: {
          obj.is_private = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode PipeMessage

  public size(): u32 {
    let size: u32 = 0;

    size += this.source == 0 ? 0 : 1 + Sizer.uint32(this.source);
    size +=
      this.cli_source_id.length > 0
        ? 1 +
          Sizer.varint64(this.cli_source_id.length) +
          this.cli_source_id.length
        : 0;
    size +=
      this.plugin_source_id == 0 ? 0 : 1 + Sizer.uint32(this.plugin_source_id);
    size +=
      this.name.length > 0
        ? 1 + Sizer.varint64(this.name.length) + this.name.length
        : 0;
    size +=
      this.payload.length > 0
        ? 1 + Sizer.varint64(this.payload.length) + this.payload.length
        : 0;

    for (let n: i32 = 0; n < this.args.length; n++) {
      const messageSize = this.args[n].size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += this.is_private == 0 ? 0 : 1 + 1;

    return size;
  }

  // Encodes PipeMessage to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes PipeMessage to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.source != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.source);
    }
    if (this.cli_source_id.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.cli_source_id.length);
      encoder.string(this.cli_source_id);
    }
    if (this.plugin_source_id != 0) {
      encoder.uint32(0x18);
      encoder.uint32(this.plugin_source_id);
    }
    if (this.name.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.name.length);
      encoder.string(this.name);
    }
    if (this.payload.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.payload.length);
      encoder.string(this.payload);
    }

    for (let n: i32 = 0; n < this.args.length; n++) {
      const messageSize = this.args[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        this.args[n].encodeU8Array(encoder);
      }
    }

    if (this.is_private != 0) {
      encoder.uint32(0x38);
      encoder.bool(this.is_private);
    }

    return buf;
  } // encode PipeMessage
} // PipeMessage

export class Arg {
  public key: string = "";
  public value: string = "";

  // Decodes Arg from an ArrayBuffer
  static decode(buf: ArrayBuffer): Arg {
    return Arg.decodeDataView(new DataView(buf));
  }

  // Decodes Arg from a DataView
  static decodeDataView(view: DataView): Arg {
    const decoder = new Decoder(view);
    const obj = new Arg();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.key = decoder.string();
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
  } // decode Arg

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.key.length > 0
        ? 1 + Sizer.varint64(this.key.length) + this.key.length
        : 0;
    size +=
      this.value.length > 0
        ? 1 + Sizer.varint64(this.value.length) + this.value.length
        : 0;

    return size;
  }

  // Encodes Arg to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes Arg to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.key.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.key.length);
      encoder.string(this.key);
    }
    if (this.value.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.value.length);
      encoder.string(this.value);
    }

    return buf;
  } // encode Arg
} // Arg
