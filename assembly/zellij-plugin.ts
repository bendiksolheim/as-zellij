// import { JSON } from "json-as/assembly";
import { Event } from "./proto/event";
import { NameAndValue, PluginConfiguration } from "./proto/action";
import { Console } from "as-wasi/assembly";

export interface ZellijPlugin {
  load(configuration: Map<string, string>): void;
  update(ev: Event): bool;
  render(rows: i32, cols: i32): void;
}

let STATE: ZellijPlugin | null = null;

export function registerPlugin(p: ZellijPlugin): void {
  STATE = p;
}

export function load(): void {
  const configuration = PluginConfiguration.decode(readBytesFromStdIn());
  const configurationMap = configuration.name_and_value.reduce(
    (map: Map<string, string>, entry: NameAndValue): Map<string, string> =>
      map.set(entry.name, entry.value),
    new Map<string, string>(),
  );

  if (STATE !== null) {
    STATE!.load(configurationMap);
  }
}

export function update(): bool {
  const ev = Event.decode(readBytesFromStdIn());
  if (STATE !== null) {
    return STATE!.update(ev);
  } else {
    return false;
  }
}

export function render(rows: i32, cols: i32): void {
  if (STATE !== null) {
    STATE!.render(rows, cols);
  }
}

export function plugin_version(): void {
  console.log("0.39.2");
}

function readBytesFromStdIn(): ArrayBuffer {
  const bytes = readJsonArray();
  const typedArray = new Uint8Array(bytes.length);
  typedArray.set(bytes);
  return typedArray.buffer;
}

function readJsonArray(): Array<u8> {
  const data = readLine();
  return data
    .slice(1, -1)
    .split(",")
    .map((d: string) => u8(parseInt(d)));
}

function readLine(): string {
  return Console.readLine() || "";
}
