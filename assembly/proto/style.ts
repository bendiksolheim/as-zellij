import { Encoder, Decoder, Sizer } from "./Encoding";

export enum ColorType {
  Rgb = 0,
  EightBit = 1,
} // ColorType
export enum ThemeHue {
  Dark = 0,
  Light = 1,
} // ThemeHue
export class Style {
  public palette: Palette = new Palette();
  public rounded_corners: bool;
  public hide_session_name: bool;

  // Decodes Style from an ArrayBuffer
  static decode(buf: ArrayBuffer): Style {
    return Style.decodeDataView(new DataView(buf));
  }

  // Decodes Style from a DataView
  static decodeDataView(view: DataView): Style {
    const decoder = new Decoder(view);
    const obj = new Style();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.palette = Palette.decodeDataView(
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
          obj.rounded_corners = decoder.bool();
          break;
        }
        case 3: {
          obj.hide_session_name = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Style

  public size(): u32 {
    let size: u32 = 0;

    if (this.palette != null) {
      const f: Palette = this.palette as Palette;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += this.rounded_corners == 0 ? 0 : 1 + 1;
    size += this.hide_session_name == 0 ? 0 : 1 + 1;

    return size;
  }

  // Encodes Style to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes Style to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.palette != null) {
      const f = this.palette as Palette;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.rounded_corners != 0) {
      encoder.uint32(0x10);
      encoder.bool(this.rounded_corners);
    }
    if (this.hide_session_name != 0) {
      encoder.uint32(0x18);
      encoder.bool(this.hide_session_name);
    }

    return buf;
  } // encode Style
} // Style

export class Palette {
  public theme_hue: u32;
  public fg: Color = new Color();
  public bg: Color = new Color();
  public black: Color = new Color();
  public red: Color = new Color();
  public green: Color = new Color();
  public yellow: Color = new Color();
  public blue: Color = new Color();
  public magenta: Color = new Color();
  public cyan: Color = new Color();
  public white: Color = new Color();
  public orange: Color = new Color();
  public gray: Color = new Color();
  public purple: Color = new Color();
  public gold: Color = new Color();
  public silver: Color = new Color();
  public pink: Color = new Color();
  public brown: Color = new Color();

  // Decodes Palette from an ArrayBuffer
  static decode(buf: ArrayBuffer): Palette {
    return Palette.decodeDataView(new DataView(buf));
  }

  // Decodes Palette from a DataView
  static decodeDataView(view: DataView): Palette {
    const decoder = new Decoder(view);
    const obj = new Palette();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.theme_hue = decoder.uint32();
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.fg = Color.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.bg = Color.decodeDataView(
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
          const length = decoder.uint32();
          obj.black = Color.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.red = Color.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          break;
        }
        case 6: {
          const length = decoder.uint32();
          obj.green = Color.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          break;
        }
        case 7: {
          const length = decoder.uint32();
          obj.yellow = Color.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          break;
        }
        case 8: {
          const length = decoder.uint32();
          obj.blue = Color.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          break;
        }
        case 9: {
          const length = decoder.uint32();
          obj.magenta = Color.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          break;
        }
        case 10: {
          const length = decoder.uint32();
          obj.cyan = Color.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          break;
        }
        case 11: {
          const length = decoder.uint32();
          obj.white = Color.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          break;
        }
        case 12: {
          const length = decoder.uint32();
          obj.orange = Color.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          break;
        }
        case 13: {
          const length = decoder.uint32();
          obj.gray = Color.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          break;
        }
        case 14: {
          const length = decoder.uint32();
          obj.purple = Color.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          break;
        }
        case 15: {
          const length = decoder.uint32();
          obj.gold = Color.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          break;
        }
        case 16: {
          const length = decoder.uint32();
          obj.silver = Color.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          break;
        }
        case 17: {
          const length = decoder.uint32();
          obj.pink = Color.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          break;
        }
        case 18: {
          const length = decoder.uint32();
          obj.brown = Color.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
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
  } // decode Palette

  public size(): u32 {
    let size: u32 = 0;

    size += this.theme_hue == 0 ? 0 : 1 + Sizer.uint32(this.theme_hue);

    if (this.fg != null) {
      const f: Color = this.fg as Color;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.bg != null) {
      const f: Color = this.bg as Color;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.black != null) {
      const f: Color = this.black as Color;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.red != null) {
      const f: Color = this.red as Color;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.green != null) {
      const f: Color = this.green as Color;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.yellow != null) {
      const f: Color = this.yellow as Color;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.blue != null) {
      const f: Color = this.blue as Color;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.magenta != null) {
      const f: Color = this.magenta as Color;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.cyan != null) {
      const f: Color = this.cyan as Color;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.white != null) {
      const f: Color = this.white as Color;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.orange != null) {
      const f: Color = this.orange as Color;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.gray != null) {
      const f: Color = this.gray as Color;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.purple != null) {
      const f: Color = this.purple as Color;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.gold != null) {
      const f: Color = this.gold as Color;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.silver != null) {
      const f: Color = this.silver as Color;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.pink != null) {
      const f: Color = this.pink as Color;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.brown != null) {
      const f: Color = this.brown as Color;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes Palette to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes Palette to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.theme_hue != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.theme_hue);
    }

    if (this.fg != null) {
      const f = this.fg as Color;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.bg != null) {
      const f = this.bg as Color;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.black != null) {
      const f = this.black as Color;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.red != null) {
      const f = this.red as Color;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.green != null) {
      const f = this.green as Color;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.yellow != null) {
      const f = this.yellow as Color;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x3a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.blue != null) {
      const f = this.blue as Color;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x42);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.magenta != null) {
      const f = this.magenta as Color;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x4a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.cyan != null) {
      const f = this.cyan as Color;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x52);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.white != null) {
      const f = this.white as Color;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x5a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.orange != null) {
      const f = this.orange as Color;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x62);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.gray != null) {
      const f = this.gray as Color;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x6a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.purple != null) {
      const f = this.purple as Color;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x72);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.gold != null) {
      const f = this.gold as Color;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x7a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.silver != null) {
      const f = this.silver as Color;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x82);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.pink != null) {
      const f = this.pink as Color;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x8a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.brown != null) {
      const f = this.brown as Color;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x92);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode Palette
} // Palette

export class Color {
  public color_type: u32;
  public rgb_color_payload: RgbColorPayload | null;
  public eight_bit_color_payload: u32;

  public __payload: string = "";
  public __payload_index: u8 = 0;

  static readonly PAYLOAD_RGB_COLOR_PAYLOAD_INDEX: u8 = 2;
  static readonly PAYLOAD_EIGHT_BIT_COLOR_PAYLOAD_INDEX: u8 = 3;

  // Decodes Color from an ArrayBuffer
  static decode(buf: ArrayBuffer): Color {
    return Color.decodeDataView(new DataView(buf));
  }

  // Decodes Color from a DataView
  static decodeDataView(view: DataView): Color {
    const decoder = new Decoder(view);
    const obj = new Color();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.color_type = decoder.uint32();
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.rgb_color_payload = RgbColorPayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__payload = "rgb_color_payload";
          obj.__payload_index = 2;
          break;
        }
        case 3: {
          obj.eight_bit_color_payload = decoder.uint32();
          obj.__payload = "eight_bit_color_payload";
          obj.__payload_index = 3;
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Color

  public size(): u32 {
    let size: u32 = 0;

    size += this.color_type == 0 ? 0 : 1 + Sizer.uint32(this.color_type);

    if (this.rgb_color_payload != null) {
      const f: RgbColorPayload = this.rgb_color_payload as RgbColorPayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.eight_bit_color_payload == 0
        ? 0
        : 1 + Sizer.uint32(this.eight_bit_color_payload);

    return size;
  }

  // Encodes Color to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes Color to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.color_type != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.color_type);
    }

    if (this.rgb_color_payload != null) {
      const f = this.rgb_color_payload as RgbColorPayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.eight_bit_color_payload != 0) {
      encoder.uint32(0x18);
      encoder.uint32(this.eight_bit_color_payload);
    }

    return buf;
  } // encode Color
} // Color

export class RgbColorPayload {
  public red: u32;
  public green: u32;
  public blue: u32;

  // Decodes RgbColorPayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): RgbColorPayload {
    return RgbColorPayload.decodeDataView(new DataView(buf));
  }

  // Decodes RgbColorPayload from a DataView
  static decodeDataView(view: DataView): RgbColorPayload {
    const decoder = new Decoder(view);
    const obj = new RgbColorPayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.red = decoder.uint32();
          break;
        }
        case 2: {
          obj.green = decoder.uint32();
          break;
        }
        case 3: {
          obj.blue = decoder.uint32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode RgbColorPayload

  public size(): u32 {
    let size: u32 = 0;

    size += this.red == 0 ? 0 : 1 + Sizer.uint32(this.red);
    size += this.green == 0 ? 0 : 1 + Sizer.uint32(this.green);
    size += this.blue == 0 ? 0 : 1 + Sizer.uint32(this.blue);

    return size;
  }

  // Encodes RgbColorPayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes RgbColorPayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.red != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.red);
    }
    if (this.green != 0) {
      encoder.uint32(0x10);
      encoder.uint32(this.green);
    }
    if (this.blue != 0) {
      encoder.uint32(0x18);
      encoder.uint32(this.blue);
    }

    return buf;
  } // encode RgbColorPayload
} // RgbColorPayload
