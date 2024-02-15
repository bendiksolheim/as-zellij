import { Encoder, Decoder, Sizer } from "./Encoding";

export class Key {
  public modifier: u32;
  public key: u32;
  public char: u32;

  public __main_key: string = "";
  public __main_key_index: u8 = 0;

  public ___modifier: string = "";
  public ___modifier_index: u8 = 0;

  static readonly MODIFIER_MODIFIER_INDEX: u8 = 1;
  static readonly MAIN_KEY_KEY_INDEX: u8 = 2;
  static readonly MAIN_KEY_CHAR_INDEX: u8 = 3;

  // Decodes Key from an ArrayBuffer
  static decode(buf: ArrayBuffer): Key {
    return Key.decodeDataView(new DataView(buf));
  }

  // Decodes Key from a DataView
  static decodeDataView(view: DataView): Key {
    const decoder = new Decoder(view);
    const obj = new Key();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.modifier = decoder.uint32();
          obj.___modifier = "modifier";
          obj.___modifier_index = 1;
          break;
        }
        case 2: {
          obj.key = decoder.uint32();
          obj.__main_key = "key";
          obj.__main_key_index = 2;
          break;
        }
        case 3: {
          obj.char = decoder.uint32();
          obj.__main_key = "char";
          obj.__main_key_index = 3;
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Key

  public size(): u32 {
    let size: u32 = 0;

    size += this.modifier == 0 ? 0 : 1 + Sizer.uint32(this.modifier);
    size += this.key == 0 ? 0 : 1 + Sizer.uint32(this.key);
    size += this.char == 0 ? 0 : 1 + Sizer.uint32(this.char);

    return size;
  }

  // Encodes Key to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes Key to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.modifier != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.modifier);
    }
    if (this.key != 0) {
      encoder.uint32(0x10);
      encoder.uint32(this.key);
    }
    if (this.char != 0) {
      encoder.uint32(0x18);
      encoder.uint32(this.char);
    }

    return buf;
  } // encode Key
} // Key

export enum Key_KeyModifier {
  CTRL = 0,
  ALT = 1,
} // Key_KeyModifier
export enum Key_NamedKey {
  PageDown = 0,
  PageUp = 1,
  LeftArrow = 2,
  DownArrow = 3,
  UpArrow = 4,
  RightArrow = 5,
  Home = 6,
  End = 7,
  Backspace = 8,
  Delete = 9,
  Insert = 10,
  F1 = 11,
  F2 = 12,
  F3 = 13,
  F4 = 14,
  F5 = 15,
  F6 = 16,
  F7 = 17,
  F8 = 18,
  F9 = 19,
  F10 = 20,
  F11 = 21,
  F12 = 22,
  Tab = 23,
  Esc = 24,
} // Key_NamedKey
export enum Key_Char {
  a = 0,
  b = 1,
  c = 2,
  d = 3,
  e = 4,
  f = 5,
  g = 6,
  h = 7,
  i = 8,
  j = 9,
  k = 10,
  l = 11,
  m = 12,
  n = 13,
  o = 14,
  p = 15,
  q = 16,
  r = 17,
  s = 18,
  t = 19,
  u = 20,
  v = 21,
  w = 22,
  x = 23,
  y = 24,
  z = 25,
  zero = 26,
  one = 27,
  two = 28,
  three = 29,
  four = 30,
  five = 31,
  six = 32,
  seven = 33,
  eight = 34,
  nine = 35,
} // Key_Char
