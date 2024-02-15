import { Encoder, Decoder, Sizer } from "./Encoding";

export class PluginIds {
  public plugin_id: i32;
  public zellij_pid: i32;

  // Decodes PluginIds from an ArrayBuffer
  static decode(buf: ArrayBuffer): PluginIds {
    return PluginIds.decodeDataView(new DataView(buf));
  }

  // Decodes PluginIds from a DataView
  static decodeDataView(view: DataView): PluginIds {
    const decoder = new Decoder(view);
    const obj = new PluginIds();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.plugin_id = decoder.int32();
          break;
        }
        case 2: {
          obj.zellij_pid = decoder.int32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode PluginIds

  public size(): u32 {
    let size: u32 = 0;

    size += this.plugin_id == 0 ? 0 : 1 + Sizer.int32(this.plugin_id);
    size += this.zellij_pid == 0 ? 0 : 1 + Sizer.int32(this.zellij_pid);

    return size;
  }

  // Encodes PluginIds to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes PluginIds to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.plugin_id != 0) {
      encoder.uint32(0x8);
      encoder.int32(this.plugin_id);
    }
    if (this.zellij_pid != 0) {
      encoder.uint32(0x10);
      encoder.int32(this.zellij_pid);
    }

    return buf;
  } // encode PluginIds
} // PluginIds

export class ZellijVersion {
  public version: string = "";

  // Decodes ZellijVersion from an ArrayBuffer
  static decode(buf: ArrayBuffer): ZellijVersion {
    return ZellijVersion.decodeDataView(new DataView(buf));
  }

  // Decodes ZellijVersion from a DataView
  static decodeDataView(view: DataView): ZellijVersion {
    const decoder = new Decoder(view);
    const obj = new ZellijVersion();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.version = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ZellijVersion

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.version.length > 0
        ? 1 + Sizer.varint64(this.version.length) + this.version.length
        : 0;

    return size;
  }

  // Encodes ZellijVersion to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes ZellijVersion to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.version.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.version.length);
      encoder.string(this.version);
    }

    return buf;
  } // encode ZellijVersion
} // ZellijVersion
