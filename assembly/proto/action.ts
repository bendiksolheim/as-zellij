import { Encoder, Decoder, Sizer } from "./Encoding";
import { Resize } from "./resize";

export enum SearchDirection {
  Up = 0,
  Down = 1,
} // SearchDirection
export enum SearchOption {
  CaseSensitivity = 0,
  WholeWord = 1,
  Wrap = 2,
} // SearchOption
export enum ActionName {
  Quit = 0,
  Write = 1,
  WriteChars = 2,
  SwitchToMode = 3,
  SwitchModeForAllClients = 4,
  Resize = 5,
  FocusNextPane = 6,
  FocusPreviousPane = 7,
  SwitchFocus = 8,
  MoveFocus = 9,
  MoveFocusOrTab = 10,
  MovePane = 11,
  MovePaneBackwards = 12,
  ClearScreen = 13,
  DumpScreen = 14,
  EditScrollback = 15,
  ScrollUp = 16,
  ScrollUpAt = 17,
  ScrollDown = 18,
  ScrollDownAt = 19,
  ScrollToBottom = 20,
  ScrollToTop = 21,
  PageScrollUp = 22,
  PageScrollDown = 23,
  HalfPageScrollUp = 24,
  HalfPageScrollDown = 25,
  ToggleFocusFullscreen = 26,
  TogglePaneFrames = 27,
  ToggleActiveSyncTab = 28,
  NewPane = 29,
  EditFile = 30,
  NewFloatingPane = 31,
  NewTiledPane = 32,
  TogglePaneEmbedOrFloating = 33,
  ToggleFloatingPanes = 34,
  CloseFocus = 35,
  PaneNameInput = 36,
  UndoRenamePane = 37,
  NewTab = 38,
  NoOp = 39,
  GoToNextTab = 40,
  GoToPreviousTab = 41,
  CloseTab = 42,
  GoToTab = 43,
  GoToTabName = 44,
  ToggleTab = 45,
  TabNameInput = 46,
  UndoRenameTab = 47,
  Run = 48,
  Detach = 49,
  LeftClick = 50,
  RightClick = 51,
  MiddleClick = 52,
  LaunchOrFocusPlugin = 53,
  LeftMouseRelease = 54,
  RightMouseRelease = 55,
  MiddleMouseRelease = 56,
  MouseHoldLeft = 57,
  MouseHoldRight = 58,
  MouseHoldMiddle = 59,
  SearchInput = 60,
  Search = 61,
  SearchToggleOption = 62,
  ToggleMouseMode = 63,
  PreviousSwapLayout = 64,
  NextSwapLayout = 65,
  QueryTabNames = 66,
  NewTiledPluginPane = 67,
  NewFloatingPluginPane = 68,
  StartOrReloadPlugin = 69,
  CloseTerminalPane = 70,
  ClosePluginPane = 71,
  FocusTerminalPaneWithId = 72,
  FocusPluginPaneWithId = 73,
  RenameTerminalPane = 74,
  RenamePluginPane = 75,
  RenameTab = 76,
  BreakPane = 77,
  BreakPaneRight = 78,
  BreakPaneLeft = 79,
  RenameSession = 80,
  LaunchPlugin = 81,
  CliPipe = 82,
} // ActionName
export class Action {
  public name: u32;
  public switch_to_mode_payload: SwitchToModePayload | null;
  public write_payload: WritePayload | null;
  public write_chars_payload: WriteCharsPayload | null;
  public switch_mode_for_all_clients_payload: SwitchToModePayload | null;
  public resize_payload: Resize | null;
  public move_focus_payload: u32;
  public move_focus_or_tab_payload: u32;
  public move_pane_payload: MovePanePayload | null;
  public dump_screen_payload: DumpScreenPayload | null;
  public scroll_up_at_payload: ScrollAtPayload | null;
  public scroll_down_at_payload: ScrollAtPayload | null;
  public new_pane_payload: NewPanePayload | null;
  public edit_file_payload: EditFilePayload | null;
  public new_floating_pane_payload: NewFloatingPanePayload | null;
  public new_tiled_pane_payload: NewTiledPanePayload | null;
  public pane_name_input_payload: Array<u8> = new Array<u8>();
  public go_to_tab_payload: u32;
  public go_to_tab_name_payload: GoToTabNamePayload | null;
  public tab_name_input_payload: Array<u8> = new Array<u8>();
  public run_payload: RunCommandAction | null;
  public left_click_payload: Position | null;
  public right_click_payload: Position | null;
  public middle_click_payload: Position | null;
  public launch_or_focus_plugin_payload: LaunchOrFocusPluginPayload | null;
  public left_mouse_release_payload: Position | null;
  public right_mouse_release_payload: Position | null;
  public middle_mouse_release_payload: Position | null;
  public mouse_hold_left_payload: Position | null;
  public mouse_hold_right_payload: Position | null;
  public mouse_hold_middle_payload: Position | null;
  public search_input_payload: Array<u8> = new Array<u8>();
  public search_payload: u32;
  public search_toggle_option_payload: u32;
  public new_tiled_plugin_pane_payload: NewPluginPanePayload | null;
  public new_floating_plugin_pane_payload: NewPluginPanePayload | null;
  public start_or_reload_plugin_payload: string = "";
  public close_terminal_pane_payload: u32;
  public close_plugin_pane_payload: u32;
  public focus_terminal_pane_with_id_payload: PaneIdAndShouldFloat | null;
  public focus_plugin_pane_with_id_payload: PaneIdAndShouldFloat | null;
  public rename_terminal_pane_payload: IdAndName | null;
  public rename_plugin_pane_payload: IdAndName | null;
  public rename_tab_payload: IdAndName | null;
  public rename_session_payload: string = "";
  public launch_plugin_payload: LaunchOrFocusPluginPayload | null;
  public message_payload: CliPipePayload | null;

  public __optional_payload: string = "";
  public __optional_payload_index: u8 = 0;

  static readonly OPTIONAL_PAYLOAD_SWITCH_TO_MODE_PAYLOAD_INDEX: u8 = 2;
  static readonly OPTIONAL_PAYLOAD_WRITE_PAYLOAD_INDEX: u8 = 3;
  static readonly OPTIONAL_PAYLOAD_WRITE_CHARS_PAYLOAD_INDEX: u8 = 4;
  static readonly OPTIONAL_PAYLOAD_SWITCH_MODE_FOR_ALL_CLIENTS_PAYLOAD_INDEX: u8 = 5;
  static readonly OPTIONAL_PAYLOAD_RESIZE_PAYLOAD_INDEX: u8 = 6;
  static readonly OPTIONAL_PAYLOAD_MOVE_FOCUS_PAYLOAD_INDEX: u8 = 7;
  static readonly OPTIONAL_PAYLOAD_MOVE_FOCUS_OR_TAB_PAYLOAD_INDEX: u8 = 8;
  static readonly OPTIONAL_PAYLOAD_MOVE_PANE_PAYLOAD_INDEX: u8 = 9;
  static readonly OPTIONAL_PAYLOAD_DUMP_SCREEN_PAYLOAD_INDEX: u8 = 10;
  static readonly OPTIONAL_PAYLOAD_SCROLL_UP_AT_PAYLOAD_INDEX: u8 = 11;
  static readonly OPTIONAL_PAYLOAD_SCROLL_DOWN_AT_PAYLOAD_INDEX: u8 = 12;
  static readonly OPTIONAL_PAYLOAD_NEW_PANE_PAYLOAD_INDEX: u8 = 13;
  static readonly OPTIONAL_PAYLOAD_EDIT_FILE_PAYLOAD_INDEX: u8 = 14;
  static readonly OPTIONAL_PAYLOAD_NEW_FLOATING_PANE_PAYLOAD_INDEX: u8 = 15;
  static readonly OPTIONAL_PAYLOAD_NEW_TILED_PANE_PAYLOAD_INDEX: u8 = 16;
  static readonly OPTIONAL_PAYLOAD_PANE_NAME_INPUT_PAYLOAD_INDEX: u8 = 17;
  static readonly OPTIONAL_PAYLOAD_GO_TO_TAB_PAYLOAD_INDEX: u8 = 18;
  static readonly OPTIONAL_PAYLOAD_GO_TO_TAB_NAME_PAYLOAD_INDEX: u8 = 19;
  static readonly OPTIONAL_PAYLOAD_TAB_NAME_INPUT_PAYLOAD_INDEX: u8 = 20;
  static readonly OPTIONAL_PAYLOAD_RUN_PAYLOAD_INDEX: u8 = 21;
  static readonly OPTIONAL_PAYLOAD_LEFT_CLICK_PAYLOAD_INDEX: u8 = 22;
  static readonly OPTIONAL_PAYLOAD_RIGHT_CLICK_PAYLOAD_INDEX: u8 = 23;
  static readonly OPTIONAL_PAYLOAD_MIDDLE_CLICK_PAYLOAD_INDEX: u8 = 24;
  static readonly OPTIONAL_PAYLOAD_LAUNCH_OR_FOCUS_PLUGIN_PAYLOAD_INDEX: u8 = 25;
  static readonly OPTIONAL_PAYLOAD_LEFT_MOUSE_RELEASE_PAYLOAD_INDEX: u8 = 26;
  static readonly OPTIONAL_PAYLOAD_RIGHT_MOUSE_RELEASE_PAYLOAD_INDEX: u8 = 27;
  static readonly OPTIONAL_PAYLOAD_MIDDLE_MOUSE_RELEASE_PAYLOAD_INDEX: u8 = 28;
  static readonly OPTIONAL_PAYLOAD_MOUSE_HOLD_LEFT_PAYLOAD_INDEX: u8 = 29;
  static readonly OPTIONAL_PAYLOAD_MOUSE_HOLD_RIGHT_PAYLOAD_INDEX: u8 = 30;
  static readonly OPTIONAL_PAYLOAD_MOUSE_HOLD_MIDDLE_PAYLOAD_INDEX: u8 = 31;
  static readonly OPTIONAL_PAYLOAD_SEARCH_INPUT_PAYLOAD_INDEX: u8 = 32;
  static readonly OPTIONAL_PAYLOAD_SEARCH_PAYLOAD_INDEX: u8 = 33;
  static readonly OPTIONAL_PAYLOAD_SEARCH_TOGGLE_OPTION_PAYLOAD_INDEX: u8 = 34;
  static readonly OPTIONAL_PAYLOAD_NEW_TILED_PLUGIN_PANE_PAYLOAD_INDEX: u8 = 35;
  static readonly OPTIONAL_PAYLOAD_NEW_FLOATING_PLUGIN_PANE_PAYLOAD_INDEX: u8 = 36;
  static readonly OPTIONAL_PAYLOAD_START_OR_RELOAD_PLUGIN_PAYLOAD_INDEX: u8 = 37;
  static readonly OPTIONAL_PAYLOAD_CLOSE_TERMINAL_PANE_PAYLOAD_INDEX: u8 = 38;
  static readonly OPTIONAL_PAYLOAD_CLOSE_PLUGIN_PANE_PAYLOAD_INDEX: u8 = 39;
  static readonly OPTIONAL_PAYLOAD_FOCUS_TERMINAL_PANE_WITH_ID_PAYLOAD_INDEX: u8 = 40;
  static readonly OPTIONAL_PAYLOAD_FOCUS_PLUGIN_PANE_WITH_ID_PAYLOAD_INDEX: u8 = 41;
  static readonly OPTIONAL_PAYLOAD_RENAME_TERMINAL_PANE_PAYLOAD_INDEX: u8 = 42;
  static readonly OPTIONAL_PAYLOAD_RENAME_PLUGIN_PANE_PAYLOAD_INDEX: u8 = 43;
  static readonly OPTIONAL_PAYLOAD_RENAME_TAB_PAYLOAD_INDEX: u8 = 44;
  static readonly OPTIONAL_PAYLOAD_RENAME_SESSION_PAYLOAD_INDEX: u8 = 45;
  static readonly OPTIONAL_PAYLOAD_LAUNCH_PLUGIN_PAYLOAD_INDEX: u8 = 46;
  static readonly OPTIONAL_PAYLOAD_MESSAGE_PAYLOAD_INDEX: u8 = 47;

  // Decodes Action from an ArrayBuffer
  static decode(buf: ArrayBuffer): Action {
    return Action.decodeDataView(new DataView(buf));
  }

  // Decodes Action from a DataView
  static decodeDataView(view: DataView): Action {
    const decoder = new Decoder(view);
    const obj = new Action();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.name = decoder.uint32();
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.switch_to_mode_payload = SwitchToModePayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "switch_to_mode_payload";
          obj.__optional_payload_index = 2;
          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.write_payload = WritePayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "write_payload";
          obj.__optional_payload_index = 3;
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.write_chars_payload = WriteCharsPayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "write_chars_payload";
          obj.__optional_payload_index = 4;
          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.switch_mode_for_all_clients_payload =
            SwitchToModePayload.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            );
          decoder.skip(length);

          obj.__optional_payload = "switch_mode_for_all_clients_payload";
          obj.__optional_payload_index = 5;
          break;
        }
        case 6: {
          const length = decoder.uint32();
          obj.resize_payload = Resize.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "resize_payload";
          obj.__optional_payload_index = 6;
          break;
        }
        case 7: {
          obj.move_focus_payload = decoder.uint32();
          obj.__optional_payload = "move_focus_payload";
          obj.__optional_payload_index = 7;
          break;
        }
        case 8: {
          obj.move_focus_or_tab_payload = decoder.uint32();
          obj.__optional_payload = "move_focus_or_tab_payload";
          obj.__optional_payload_index = 8;
          break;
        }
        case 9: {
          const length = decoder.uint32();
          obj.move_pane_payload = MovePanePayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "move_pane_payload";
          obj.__optional_payload_index = 9;
          break;
        }
        case 10: {
          const length = decoder.uint32();
          obj.dump_screen_payload = DumpScreenPayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "dump_screen_payload";
          obj.__optional_payload_index = 10;
          break;
        }
        case 11: {
          const length = decoder.uint32();
          obj.scroll_up_at_payload = ScrollAtPayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "scroll_up_at_payload";
          obj.__optional_payload_index = 11;
          break;
        }
        case 12: {
          const length = decoder.uint32();
          obj.scroll_down_at_payload = ScrollAtPayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "scroll_down_at_payload";
          obj.__optional_payload_index = 12;
          break;
        }
        case 13: {
          const length = decoder.uint32();
          obj.new_pane_payload = NewPanePayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "new_pane_payload";
          obj.__optional_payload_index = 13;
          break;
        }
        case 14: {
          const length = decoder.uint32();
          obj.edit_file_payload = EditFilePayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "edit_file_payload";
          obj.__optional_payload_index = 14;
          break;
        }
        case 15: {
          const length = decoder.uint32();
          obj.new_floating_pane_payload = NewFloatingPanePayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "new_floating_pane_payload";
          obj.__optional_payload_index = 15;
          break;
        }
        case 16: {
          const length = decoder.uint32();
          obj.new_tiled_pane_payload = NewTiledPanePayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "new_tiled_pane_payload";
          obj.__optional_payload_index = 16;
          break;
        }
        case 17: {
          obj.pane_name_input_payload = decoder.bytes();
          obj.__optional_payload = "pane_name_input_payload";
          obj.__optional_payload_index = 17;
          break;
        }
        case 18: {
          obj.go_to_tab_payload = decoder.uint32();
          obj.__optional_payload = "go_to_tab_payload";
          obj.__optional_payload_index = 18;
          break;
        }
        case 19: {
          const length = decoder.uint32();
          obj.go_to_tab_name_payload = GoToTabNamePayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "go_to_tab_name_payload";
          obj.__optional_payload_index = 19;
          break;
        }
        case 20: {
          obj.tab_name_input_payload = decoder.bytes();
          obj.__optional_payload = "tab_name_input_payload";
          obj.__optional_payload_index = 20;
          break;
        }
        case 21: {
          const length = decoder.uint32();
          obj.run_payload = RunCommandAction.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "run_payload";
          obj.__optional_payload_index = 21;
          break;
        }
        case 22: {
          const length = decoder.uint32();
          obj.left_click_payload = Position.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "left_click_payload";
          obj.__optional_payload_index = 22;
          break;
        }
        case 23: {
          const length = decoder.uint32();
          obj.right_click_payload = Position.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "right_click_payload";
          obj.__optional_payload_index = 23;
          break;
        }
        case 24: {
          const length = decoder.uint32();
          obj.middle_click_payload = Position.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "middle_click_payload";
          obj.__optional_payload_index = 24;
          break;
        }
        case 25: {
          const length = decoder.uint32();
          obj.launch_or_focus_plugin_payload =
            LaunchOrFocusPluginPayload.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            );
          decoder.skip(length);

          obj.__optional_payload = "launch_or_focus_plugin_payload";
          obj.__optional_payload_index = 25;
          break;
        }
        case 26: {
          const length = decoder.uint32();
          obj.left_mouse_release_payload = Position.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "left_mouse_release_payload";
          obj.__optional_payload_index = 26;
          break;
        }
        case 27: {
          const length = decoder.uint32();
          obj.right_mouse_release_payload = Position.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "right_mouse_release_payload";
          obj.__optional_payload_index = 27;
          break;
        }
        case 28: {
          const length = decoder.uint32();
          obj.middle_mouse_release_payload = Position.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "middle_mouse_release_payload";
          obj.__optional_payload_index = 28;
          break;
        }
        case 29: {
          const length = decoder.uint32();
          obj.mouse_hold_left_payload = Position.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "mouse_hold_left_payload";
          obj.__optional_payload_index = 29;
          break;
        }
        case 30: {
          const length = decoder.uint32();
          obj.mouse_hold_right_payload = Position.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "mouse_hold_right_payload";
          obj.__optional_payload_index = 30;
          break;
        }
        case 31: {
          const length = decoder.uint32();
          obj.mouse_hold_middle_payload = Position.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "mouse_hold_middle_payload";
          obj.__optional_payload_index = 31;
          break;
        }
        case 32: {
          obj.search_input_payload = decoder.bytes();
          obj.__optional_payload = "search_input_payload";
          obj.__optional_payload_index = 32;
          break;
        }
        case 33: {
          obj.search_payload = decoder.uint32();
          obj.__optional_payload = "search_payload";
          obj.__optional_payload_index = 33;
          break;
        }
        case 34: {
          obj.search_toggle_option_payload = decoder.uint32();
          obj.__optional_payload = "search_toggle_option_payload";
          obj.__optional_payload_index = 34;
          break;
        }
        case 35: {
          const length = decoder.uint32();
          obj.new_tiled_plugin_pane_payload =
            NewPluginPanePayload.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            );
          decoder.skip(length);

          obj.__optional_payload = "new_tiled_plugin_pane_payload";
          obj.__optional_payload_index = 35;
          break;
        }
        case 36: {
          const length = decoder.uint32();
          obj.new_floating_plugin_pane_payload =
            NewPluginPanePayload.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            );
          decoder.skip(length);

          obj.__optional_payload = "new_floating_plugin_pane_payload";
          obj.__optional_payload_index = 36;
          break;
        }
        case 37: {
          obj.start_or_reload_plugin_payload = decoder.string();
          obj.__optional_payload = "start_or_reload_plugin_payload";
          obj.__optional_payload_index = 37;
          break;
        }
        case 38: {
          obj.close_terminal_pane_payload = decoder.uint32();
          obj.__optional_payload = "close_terminal_pane_payload";
          obj.__optional_payload_index = 38;
          break;
        }
        case 39: {
          obj.close_plugin_pane_payload = decoder.uint32();
          obj.__optional_payload = "close_plugin_pane_payload";
          obj.__optional_payload_index = 39;
          break;
        }
        case 40: {
          const length = decoder.uint32();
          obj.focus_terminal_pane_with_id_payload =
            PaneIdAndShouldFloat.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            );
          decoder.skip(length);

          obj.__optional_payload = "focus_terminal_pane_with_id_payload";
          obj.__optional_payload_index = 40;
          break;
        }
        case 41: {
          const length = decoder.uint32();
          obj.focus_plugin_pane_with_id_payload =
            PaneIdAndShouldFloat.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length,
              ),
            );
          decoder.skip(length);

          obj.__optional_payload = "focus_plugin_pane_with_id_payload";
          obj.__optional_payload_index = 41;
          break;
        }
        case 42: {
          const length = decoder.uint32();
          obj.rename_terminal_pane_payload = IdAndName.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "rename_terminal_pane_payload";
          obj.__optional_payload_index = 42;
          break;
        }
        case 43: {
          const length = decoder.uint32();
          obj.rename_plugin_pane_payload = IdAndName.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "rename_plugin_pane_payload";
          obj.__optional_payload_index = 43;
          break;
        }
        case 44: {
          const length = decoder.uint32();
          obj.rename_tab_payload = IdAndName.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "rename_tab_payload";
          obj.__optional_payload_index = 44;
          break;
        }
        case 45: {
          obj.rename_session_payload = decoder.string();
          obj.__optional_payload = "rename_session_payload";
          obj.__optional_payload_index = 45;
          break;
        }
        case 46: {
          const length = decoder.uint32();
          obj.launch_plugin_payload = LaunchOrFocusPluginPayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "launch_plugin_payload";
          obj.__optional_payload_index = 46;
          break;
        }
        case 47: {
          const length = decoder.uint32();
          obj.message_payload = CliPipePayload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.__optional_payload = "message_payload";
          obj.__optional_payload_index = 47;
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Action

  public size(): u32 {
    let size: u32 = 0;

    size += this.name == 0 ? 0 : 1 + Sizer.uint32(this.name);

    if (this.switch_to_mode_payload != null) {
      const f: SwitchToModePayload = this
        .switch_to_mode_payload as SwitchToModePayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.write_payload != null) {
      const f: WritePayload = this.write_payload as WritePayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.write_chars_payload != null) {
      const f: WriteCharsPayload = this
        .write_chars_payload as WriteCharsPayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.switch_mode_for_all_clients_payload != null) {
      const f: SwitchToModePayload = this
        .switch_mode_for_all_clients_payload as SwitchToModePayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.resize_payload != null) {
      const f: resize.Resize = this.resize_payload as resize.Resize;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.move_focus_payload == 0
        ? 0
        : 1 + Sizer.uint32(this.move_focus_payload);
    size +=
      this.move_focus_or_tab_payload == 0
        ? 0
        : 1 + Sizer.uint32(this.move_focus_or_tab_payload);

    if (this.move_pane_payload != null) {
      const f: MovePanePayload = this.move_pane_payload as MovePanePayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.dump_screen_payload != null) {
      const f: DumpScreenPayload = this
        .dump_screen_payload as DumpScreenPayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.scroll_up_at_payload != null) {
      const f: ScrollAtPayload = this.scroll_up_at_payload as ScrollAtPayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.scroll_down_at_payload != null) {
      const f: ScrollAtPayload = this.scroll_down_at_payload as ScrollAtPayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.new_pane_payload != null) {
      const f: NewPanePayload = this.new_pane_payload as NewPanePayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.edit_file_payload != null) {
      const f: EditFilePayload = this.edit_file_payload as EditFilePayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.new_floating_pane_payload != null) {
      const f: NewFloatingPanePayload = this
        .new_floating_pane_payload as NewFloatingPanePayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.new_tiled_pane_payload != null) {
      const f: NewTiledPanePayload = this
        .new_tiled_pane_payload as NewTiledPanePayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.pane_name_input_payload.length > 0
        ? 2 +
          Sizer.varint64(this.pane_name_input_payload.length) +
          this.pane_name_input_payload.length
        : 0;
    size +=
      this.go_to_tab_payload == 0
        ? 0
        : 2 + Sizer.uint32(this.go_to_tab_payload);

    if (this.go_to_tab_name_payload != null) {
      const f: GoToTabNamePayload = this
        .go_to_tab_name_payload as GoToTabNamePayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.tab_name_input_payload.length > 0
        ? 2 +
          Sizer.varint64(this.tab_name_input_payload.length) +
          this.tab_name_input_payload.length
        : 0;

    if (this.run_payload != null) {
      const f: RunCommandAction = this.run_payload as RunCommandAction;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.left_click_payload != null) {
      const f: Position = this.left_click_payload as Position;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.right_click_payload != null) {
      const f: Position = this.right_click_payload as Position;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.middle_click_payload != null) {
      const f: Position = this.middle_click_payload as Position;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.launch_or_focus_plugin_payload != null) {
      const f: LaunchOrFocusPluginPayload = this
        .launch_or_focus_plugin_payload as LaunchOrFocusPluginPayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.left_mouse_release_payload != null) {
      const f: Position = this.left_mouse_release_payload as Position;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.right_mouse_release_payload != null) {
      const f: Position = this.right_mouse_release_payload as Position;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.middle_mouse_release_payload != null) {
      const f: Position = this.middle_mouse_release_payload as Position;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.mouse_hold_left_payload != null) {
      const f: Position = this.mouse_hold_left_payload as Position;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.mouse_hold_right_payload != null) {
      const f: Position = this.mouse_hold_right_payload as Position;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.mouse_hold_middle_payload != null) {
      const f: Position = this.mouse_hold_middle_payload as Position;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.search_input_payload.length > 0
        ? 2 +
          Sizer.varint64(this.search_input_payload.length) +
          this.search_input_payload.length
        : 0;
    size +=
      this.search_payload == 0 ? 0 : 2 + Sizer.uint32(this.search_payload);
    size +=
      this.search_toggle_option_payload == 0
        ? 0
        : 2 + Sizer.uint32(this.search_toggle_option_payload);

    if (this.new_tiled_plugin_pane_payload != null) {
      const f: NewPluginPanePayload = this
        .new_tiled_plugin_pane_payload as NewPluginPanePayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.new_floating_plugin_pane_payload != null) {
      const f: NewPluginPanePayload = this
        .new_floating_plugin_pane_payload as NewPluginPanePayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.start_or_reload_plugin_payload.length > 0
        ? 2 +
          Sizer.varint64(this.start_or_reload_plugin_payload.length) +
          this.start_or_reload_plugin_payload.length
        : 0;
    size +=
      this.close_terminal_pane_payload == 0
        ? 0
        : 2 + Sizer.uint32(this.close_terminal_pane_payload);
    size +=
      this.close_plugin_pane_payload == 0
        ? 0
        : 2 + Sizer.uint32(this.close_plugin_pane_payload);

    if (this.focus_terminal_pane_with_id_payload != null) {
      const f: PaneIdAndShouldFloat = this
        .focus_terminal_pane_with_id_payload as PaneIdAndShouldFloat;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.focus_plugin_pane_with_id_payload != null) {
      const f: PaneIdAndShouldFloat = this
        .focus_plugin_pane_with_id_payload as PaneIdAndShouldFloat;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.rename_terminal_pane_payload != null) {
      const f: IdAndName = this.rename_terminal_pane_payload as IdAndName;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.rename_plugin_pane_payload != null) {
      const f: IdAndName = this.rename_plugin_pane_payload as IdAndName;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.rename_tab_payload != null) {
      const f: IdAndName = this.rename_tab_payload as IdAndName;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.rename_session_payload.length > 0
        ? 2 +
          Sizer.varint64(this.rename_session_payload.length) +
          this.rename_session_payload.length
        : 0;

    if (this.launch_plugin_payload != null) {
      const f: LaunchOrFocusPluginPayload = this
        .launch_plugin_payload as LaunchOrFocusPluginPayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.message_payload != null) {
      const f: CliPipePayload = this.message_payload as CliPipePayload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes Action to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes Action to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.name != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.name);
    }

    if (this.switch_to_mode_payload != null) {
      const f = this.switch_to_mode_payload as SwitchToModePayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.write_payload != null) {
      const f = this.write_payload as WritePayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.write_chars_payload != null) {
      const f = this.write_chars_payload as WriteCharsPayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.switch_mode_for_all_clients_payload != null) {
      const f = this.switch_mode_for_all_clients_payload as SwitchToModePayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.resize_payload != null) {
      const f = this.resize_payload as resize.Resize;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.move_focus_payload != 0) {
      encoder.uint32(0x38);
      encoder.uint32(this.move_focus_payload);
    }
    if (this.move_focus_or_tab_payload != 0) {
      encoder.uint32(0x40);
      encoder.uint32(this.move_focus_or_tab_payload);
    }

    if (this.move_pane_payload != null) {
      const f = this.move_pane_payload as MovePanePayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x4a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.dump_screen_payload != null) {
      const f = this.dump_screen_payload as DumpScreenPayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x52);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.scroll_up_at_payload != null) {
      const f = this.scroll_up_at_payload as ScrollAtPayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x5a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.scroll_down_at_payload != null) {
      const f = this.scroll_down_at_payload as ScrollAtPayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x62);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.new_pane_payload != null) {
      const f = this.new_pane_payload as NewPanePayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x6a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.edit_file_payload != null) {
      const f = this.edit_file_payload as EditFilePayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x72);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.new_floating_pane_payload != null) {
      const f = this.new_floating_pane_payload as NewFloatingPanePayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x7a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.new_tiled_pane_payload != null) {
      const f = this.new_tiled_pane_payload as NewTiledPanePayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x82);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.pane_name_input_payload.length > 0) {
      encoder.uint32(0x8a);
      encoder.uint32(this.pane_name_input_payload.length);
      encoder.bytes(this.pane_name_input_payload);
    }
    if (this.go_to_tab_payload != 0) {
      encoder.uint32(0x90);
      encoder.uint32(this.go_to_tab_payload);
    }

    if (this.go_to_tab_name_payload != null) {
      const f = this.go_to_tab_name_payload as GoToTabNamePayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x9a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.tab_name_input_payload.length > 0) {
      encoder.uint32(0xa2);
      encoder.uint32(this.tab_name_input_payload.length);
      encoder.bytes(this.tab_name_input_payload);
    }

    if (this.run_payload != null) {
      const f = this.run_payload as RunCommandAction;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xaa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.left_click_payload != null) {
      const f = this.left_click_payload as Position;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xb2);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.right_click_payload != null) {
      const f = this.right_click_payload as Position;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xba);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.middle_click_payload != null) {
      const f = this.middle_click_payload as Position;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xc2);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.launch_or_focus_plugin_payload != null) {
      const f = this
        .launch_or_focus_plugin_payload as LaunchOrFocusPluginPayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xca);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.left_mouse_release_payload != null) {
      const f = this.left_mouse_release_payload as Position;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xd2);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.right_mouse_release_payload != null) {
      const f = this.right_mouse_release_payload as Position;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xda);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.middle_mouse_release_payload != null) {
      const f = this.middle_mouse_release_payload as Position;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xe2);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.mouse_hold_left_payload != null) {
      const f = this.mouse_hold_left_payload as Position;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xea);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.mouse_hold_right_payload != null) {
      const f = this.mouse_hold_right_payload as Position;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xf2);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.mouse_hold_middle_payload != null) {
      const f = this.mouse_hold_middle_payload as Position;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xfa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.search_input_payload.length > 0) {
      encoder.uint32(0x102);
      encoder.uint32(this.search_input_payload.length);
      encoder.bytes(this.search_input_payload);
    }
    if (this.search_payload != 0) {
      encoder.uint32(0x108);
      encoder.uint32(this.search_payload);
    }
    if (this.search_toggle_option_payload != 0) {
      encoder.uint32(0x110);
      encoder.uint32(this.search_toggle_option_payload);
    }

    if (this.new_tiled_plugin_pane_payload != null) {
      const f = this.new_tiled_plugin_pane_payload as NewPluginPanePayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x11a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.new_floating_plugin_pane_payload != null) {
      const f = this.new_floating_plugin_pane_payload as NewPluginPanePayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x122);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.start_or_reload_plugin_payload.length > 0) {
      encoder.uint32(0x12a);
      encoder.uint32(this.start_or_reload_plugin_payload.length);
      encoder.string(this.start_or_reload_plugin_payload);
    }
    if (this.close_terminal_pane_payload != 0) {
      encoder.uint32(0x130);
      encoder.uint32(this.close_terminal_pane_payload);
    }
    if (this.close_plugin_pane_payload != 0) {
      encoder.uint32(0x138);
      encoder.uint32(this.close_plugin_pane_payload);
    }

    if (this.focus_terminal_pane_with_id_payload != null) {
      const f = this
        .focus_terminal_pane_with_id_payload as PaneIdAndShouldFloat;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x142);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.focus_plugin_pane_with_id_payload != null) {
      const f = this.focus_plugin_pane_with_id_payload as PaneIdAndShouldFloat;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x14a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.rename_terminal_pane_payload != null) {
      const f = this.rename_terminal_pane_payload as IdAndName;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x152);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.rename_plugin_pane_payload != null) {
      const f = this.rename_plugin_pane_payload as IdAndName;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x15a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.rename_tab_payload != null) {
      const f = this.rename_tab_payload as IdAndName;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x162);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.rename_session_payload.length > 0) {
      encoder.uint32(0x16a);
      encoder.uint32(this.rename_session_payload.length);
      encoder.string(this.rename_session_payload);
    }

    if (this.launch_plugin_payload != null) {
      const f = this.launch_plugin_payload as LaunchOrFocusPluginPayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x172);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.message_payload != null) {
      const f = this.message_payload as CliPipePayload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x17a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode Action
} // Action

export class CliPipePayload {
  public name: string = "";
  public payload: string = "";
  public args: Array<NameAndValue> = new Array<NameAndValue>();
  public plugin: string = "";

  public ___name: string = "";
  public ___name_index: u8 = 0;

  public ___plugin: string = "";
  public ___plugin_index: u8 = 0;

  static readonly NAME_NAME_INDEX: u8 = 1;
  static readonly PLUGIN_PLUGIN_INDEX: u8 = 4;

  // Decodes CliPipePayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): CliPipePayload {
    return CliPipePayload.decodeDataView(new DataView(buf));
  }

  // Decodes CliPipePayload from a DataView
  static decodeDataView(view: DataView): CliPipePayload {
    const decoder = new Decoder(view);
    const obj = new CliPipePayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.name = decoder.string();
          obj.___name = "name";
          obj.___name_index = 1;
          break;
        }
        case 2: {
          obj.payload = decoder.string();
          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.args.push(
            NameAndValue.decodeDataView(
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
        case 4: {
          obj.plugin = decoder.string();
          obj.___plugin = "plugin";
          obj.___plugin_index = 4;
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode CliPipePayload

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

    for (let n: i32 = 0; n < this.args.length; n++) {
      const messageSize = this.args[n].size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.plugin.length > 0
        ? 1 + Sizer.varint64(this.plugin.length) + this.plugin.length
        : 0;

    return size;
  }

  // Encodes CliPipePayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes CliPipePayload to the Array<u8>
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

    for (let n: i32 = 0; n < this.args.length; n++) {
      const messageSize = this.args[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        this.args[n].encodeU8Array(encoder);
      }
    }

    if (this.plugin.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.plugin.length);
      encoder.string(this.plugin);
    }

    return buf;
  } // encode CliPipePayload
} // CliPipePayload

export class IdAndName {
  public name: Array<u8> = new Array<u8>();
  public id: u32;

  // Decodes IdAndName from an ArrayBuffer
  static decode(buf: ArrayBuffer): IdAndName {
    return IdAndName.decodeDataView(new DataView(buf));
  }

  // Decodes IdAndName from a DataView
  static decodeDataView(view: DataView): IdAndName {
    const decoder = new Decoder(view);
    const obj = new IdAndName();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.name = decoder.bytes();
          break;
        }
        case 2: {
          obj.id = decoder.uint32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode IdAndName

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.name.length > 0
        ? 1 + Sizer.varint64(this.name.length) + this.name.length
        : 0;
    size += this.id == 0 ? 0 : 1 + Sizer.uint32(this.id);

    return size;
  }

  // Encodes IdAndName to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes IdAndName to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.name.length);
      encoder.bytes(this.name);
    }
    if (this.id != 0) {
      encoder.uint32(0x10);
      encoder.uint32(this.id);
    }

    return buf;
  } // encode IdAndName
} // IdAndName

export class PaneIdAndShouldFloat {
  public pane_id: u32;
  public should_float: bool;

  // Decodes PaneIdAndShouldFloat from an ArrayBuffer
  static decode(buf: ArrayBuffer): PaneIdAndShouldFloat {
    return PaneIdAndShouldFloat.decodeDataView(new DataView(buf));
  }

  // Decodes PaneIdAndShouldFloat from a DataView
  static decodeDataView(view: DataView): PaneIdAndShouldFloat {
    const decoder = new Decoder(view);
    const obj = new PaneIdAndShouldFloat();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.pane_id = decoder.uint32();
          break;
        }
        case 2: {
          obj.should_float = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode PaneIdAndShouldFloat

  public size(): u32 {
    let size: u32 = 0;

    size += this.pane_id == 0 ? 0 : 1 + Sizer.uint32(this.pane_id);
    size += this.should_float == 0 ? 0 : 1 + 1;

    return size;
  }

  // Encodes PaneIdAndShouldFloat to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes PaneIdAndShouldFloat to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.pane_id != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.pane_id);
    }
    if (this.should_float != 0) {
      encoder.uint32(0x10);
      encoder.bool(this.should_float);
    }

    return buf;
  } // encode PaneIdAndShouldFloat
} // PaneIdAndShouldFloat

export class NewPluginPanePayload {
  public plugin_url: string = "";
  public pane_name: string = "";
  public skip_plugin_cache: bool;

  public ___pane_name: string = "";
  public ___pane_name_index: u8 = 0;

  static readonly PANE_NAME_PANE_NAME_INDEX: u8 = 2;

  // Decodes NewPluginPanePayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): NewPluginPanePayload {
    return NewPluginPanePayload.decodeDataView(new DataView(buf));
  }

  // Decodes NewPluginPanePayload from a DataView
  static decodeDataView(view: DataView): NewPluginPanePayload {
    const decoder = new Decoder(view);
    const obj = new NewPluginPanePayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.plugin_url = decoder.string();
          break;
        }
        case 2: {
          obj.pane_name = decoder.string();
          obj.___pane_name = "pane_name";
          obj.___pane_name_index = 2;
          break;
        }
        case 3: {
          obj.skip_plugin_cache = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode NewPluginPanePayload

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.plugin_url.length > 0
        ? 1 + Sizer.varint64(this.plugin_url.length) + this.plugin_url.length
        : 0;
    size +=
      this.pane_name.length > 0
        ? 1 + Sizer.varint64(this.pane_name.length) + this.pane_name.length
        : 0;
    size += this.skip_plugin_cache == 0 ? 0 : 1 + 1;

    return size;
  }

  // Encodes NewPluginPanePayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes NewPluginPanePayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.plugin_url.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.plugin_url.length);
      encoder.string(this.plugin_url);
    }
    if (this.pane_name.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.pane_name.length);
      encoder.string(this.pane_name);
    }
    if (this.skip_plugin_cache != 0) {
      encoder.uint32(0x18);
      encoder.bool(this.skip_plugin_cache);
    }

    return buf;
  } // encode NewPluginPanePayload
} // NewPluginPanePayload

export class LaunchOrFocusPluginPayload {
  public plugin_url: string = "";
  public should_float: bool;
  public plugin_configuration: PluginConfiguration | null;
  public move_to_focused_tab: bool;
  public should_open_in_place: bool;
  public skip_plugin_cache: bool;

  public ___plugin_configuration: string = "";
  public ___plugin_configuration_index: u8 = 0;

  static readonly PLUGIN_CONFIGURATION_PLUGIN_CONFIGURATION_INDEX: u8 = 3;

  // Decodes LaunchOrFocusPluginPayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): LaunchOrFocusPluginPayload {
    return LaunchOrFocusPluginPayload.decodeDataView(new DataView(buf));
  }

  // Decodes LaunchOrFocusPluginPayload from a DataView
  static decodeDataView(view: DataView): LaunchOrFocusPluginPayload {
    const decoder = new Decoder(view);
    const obj = new LaunchOrFocusPluginPayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.plugin_url = decoder.string();
          break;
        }
        case 2: {
          obj.should_float = decoder.bool();
          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.plugin_configuration = PluginConfiguration.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.___plugin_configuration = "plugin_configuration";
          obj.___plugin_configuration_index = 3;
          break;
        }
        case 4: {
          obj.move_to_focused_tab = decoder.bool();
          break;
        }
        case 5: {
          obj.should_open_in_place = decoder.bool();
          break;
        }
        case 6: {
          obj.skip_plugin_cache = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode LaunchOrFocusPluginPayload

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.plugin_url.length > 0
        ? 1 + Sizer.varint64(this.plugin_url.length) + this.plugin_url.length
        : 0;
    size += this.should_float == 0 ? 0 : 1 + 1;

    if (this.plugin_configuration != null) {
      const f: PluginConfiguration = this
        .plugin_configuration as PluginConfiguration;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += this.move_to_focused_tab == 0 ? 0 : 1 + 1;
    size += this.should_open_in_place == 0 ? 0 : 1 + 1;
    size += this.skip_plugin_cache == 0 ? 0 : 1 + 1;

    return size;
  }

  // Encodes LaunchOrFocusPluginPayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes LaunchOrFocusPluginPayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.plugin_url.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.plugin_url.length);
      encoder.string(this.plugin_url);
    }
    if (this.should_float != 0) {
      encoder.uint32(0x10);
      encoder.bool(this.should_float);
    }

    if (this.plugin_configuration != null) {
      const f = this.plugin_configuration as PluginConfiguration;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.move_to_focused_tab != 0) {
      encoder.uint32(0x20);
      encoder.bool(this.move_to_focused_tab);
    }
    if (this.should_open_in_place != 0) {
      encoder.uint32(0x28);
      encoder.bool(this.should_open_in_place);
    }
    if (this.skip_plugin_cache != 0) {
      encoder.uint32(0x30);
      encoder.bool(this.skip_plugin_cache);
    }

    return buf;
  } // encode LaunchOrFocusPluginPayload
} // LaunchOrFocusPluginPayload

export class GoToTabNamePayload {
  public tab_name: string = "";
  public create: bool;

  // Decodes GoToTabNamePayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): GoToTabNamePayload {
    return GoToTabNamePayload.decodeDataView(new DataView(buf));
  }

  // Decodes GoToTabNamePayload from a DataView
  static decodeDataView(view: DataView): GoToTabNamePayload {
    const decoder = new Decoder(view);
    const obj = new GoToTabNamePayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.tab_name = decoder.string();
          break;
        }
        case 2: {
          obj.create = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode GoToTabNamePayload

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.tab_name.length > 0
        ? 1 + Sizer.varint64(this.tab_name.length) + this.tab_name.length
        : 0;
    size += this.create == 0 ? 0 : 1 + 1;

    return size;
  }

  // Encodes GoToTabNamePayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes GoToTabNamePayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.tab_name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.tab_name.length);
      encoder.string(this.tab_name);
    }
    if (this.create != 0) {
      encoder.uint32(0x10);
      encoder.bool(this.create);
    }

    return buf;
  } // encode GoToTabNamePayload
} // GoToTabNamePayload

export class NewFloatingPanePayload {
  public command: RunCommandAction | null;

  public ___command: string = "";
  public ___command_index: u8 = 0;

  static readonly COMMAND_COMMAND_INDEX: u8 = 1;

  // Decodes NewFloatingPanePayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): NewFloatingPanePayload {
    return NewFloatingPanePayload.decodeDataView(new DataView(buf));
  }

  // Decodes NewFloatingPanePayload from a DataView
  static decodeDataView(view: DataView): NewFloatingPanePayload {
    const decoder = new Decoder(view);
    const obj = new NewFloatingPanePayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.command = RunCommandAction.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.___command = "command";
          obj.___command_index = 1;
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode NewFloatingPanePayload

  public size(): u32 {
    let size: u32 = 0;

    if (this.command != null) {
      const f: RunCommandAction = this.command as RunCommandAction;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes NewFloatingPanePayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes NewFloatingPanePayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.command != null) {
      const f = this.command as RunCommandAction;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode NewFloatingPanePayload
} // NewFloatingPanePayload

export class NewTiledPanePayload {
  public command: RunCommandAction | null;
  public direction: u32;

  public ___command: string = "";
  public ___command_index: u8 = 0;

  public ___direction: string = "";
  public ___direction_index: u8 = 0;

  static readonly COMMAND_COMMAND_INDEX: u8 = 1;
  static readonly DIRECTION_DIRECTION_INDEX: u8 = 2;

  // Decodes NewTiledPanePayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): NewTiledPanePayload {
    return NewTiledPanePayload.decodeDataView(new DataView(buf));
  }

  // Decodes NewTiledPanePayload from a DataView
  static decodeDataView(view: DataView): NewTiledPanePayload {
    const decoder = new Decoder(view);
    const obj = new NewTiledPanePayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.command = RunCommandAction.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length,
            ),
          );
          decoder.skip(length);

          obj.___command = "command";
          obj.___command_index = 1;
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
  } // decode NewTiledPanePayload

  public size(): u32 {
    let size: u32 = 0;

    if (this.command != null) {
      const f: RunCommandAction = this.command as RunCommandAction;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += this.direction == 0 ? 0 : 1 + Sizer.uint32(this.direction);

    return size;
  }

  // Encodes NewTiledPanePayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes NewTiledPanePayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.command != null) {
      const f = this.command as RunCommandAction;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.direction != 0) {
      encoder.uint32(0x10);
      encoder.uint32(this.direction);
    }

    return buf;
  } // encode NewTiledPanePayload
} // NewTiledPanePayload

export class MovePanePayload {
  public direction: u32;

  public ___direction: string = "";
  public ___direction_index: u8 = 0;

  static readonly DIRECTION_DIRECTION_INDEX: u8 = 1;

  // Decodes MovePanePayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): MovePanePayload {
    return MovePanePayload.decodeDataView(new DataView(buf));
  }

  // Decodes MovePanePayload from a DataView
  static decodeDataView(view: DataView): MovePanePayload {
    const decoder = new Decoder(view);
    const obj = new MovePanePayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.direction = decoder.uint32();
          obj.___direction = "direction";
          obj.___direction_index = 1;
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode MovePanePayload

  public size(): u32 {
    let size: u32 = 0;

    size += this.direction == 0 ? 0 : 1 + Sizer.uint32(this.direction);

    return size;
  }

  // Encodes MovePanePayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes MovePanePayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.direction != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.direction);
    }

    return buf;
  } // encode MovePanePayload
} // MovePanePayload

export class EditFilePayload {
  public file_to_edit: string = "";
  public line_number: u32;
  public cwd: string = "";
  public direction: u32;
  public should_float: bool;

  public ___line_number: string = "";
  public ___line_number_index: u8 = 0;

  public ___cwd: string = "";
  public ___cwd_index: u8 = 0;

  public ___direction: string = "";
  public ___direction_index: u8 = 0;

  static readonly LINE_NUMBER_LINE_NUMBER_INDEX: u8 = 2;
  static readonly CWD_CWD_INDEX: u8 = 3;
  static readonly DIRECTION_DIRECTION_INDEX: u8 = 4;

  // Decodes EditFilePayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): EditFilePayload {
    return EditFilePayload.decodeDataView(new DataView(buf));
  }

  // Decodes EditFilePayload from a DataView
  static decodeDataView(view: DataView): EditFilePayload {
    const decoder = new Decoder(view);
    const obj = new EditFilePayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.file_to_edit = decoder.string();
          break;
        }
        case 2: {
          obj.line_number = decoder.uint32();
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
        case 4: {
          obj.direction = decoder.uint32();
          obj.___direction = "direction";
          obj.___direction_index = 4;
          break;
        }
        case 5: {
          obj.should_float = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode EditFilePayload

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.file_to_edit.length > 0
        ? 1 +
          Sizer.varint64(this.file_to_edit.length) +
          this.file_to_edit.length
        : 0;
    size += this.line_number == 0 ? 0 : 1 + Sizer.uint32(this.line_number);
    size +=
      this.cwd.length > 0
        ? 1 + Sizer.varint64(this.cwd.length) + this.cwd.length
        : 0;
    size += this.direction == 0 ? 0 : 1 + Sizer.uint32(this.direction);
    size += this.should_float == 0 ? 0 : 1 + 1;

    return size;
  }

  // Encodes EditFilePayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes EditFilePayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.file_to_edit.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.file_to_edit.length);
      encoder.string(this.file_to_edit);
    }
    if (this.line_number != 0) {
      encoder.uint32(0x10);
      encoder.uint32(this.line_number);
    }
    if (this.cwd.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.cwd.length);
      encoder.string(this.cwd);
    }
    if (this.direction != 0) {
      encoder.uint32(0x20);
      encoder.uint32(this.direction);
    }
    if (this.should_float != 0) {
      encoder.uint32(0x28);
      encoder.bool(this.should_float);
    }

    return buf;
  } // encode EditFilePayload
} // EditFilePayload

export class ScrollAtPayload {
  public position: Position = new Position();

  // Decodes ScrollAtPayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): ScrollAtPayload {
    return ScrollAtPayload.decodeDataView(new DataView(buf));
  }

  // Decodes ScrollAtPayload from a DataView
  static decodeDataView(view: DataView): ScrollAtPayload {
    const decoder = new Decoder(view);
    const obj = new ScrollAtPayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.position = Position.decodeDataView(
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
  } // decode ScrollAtPayload

  public size(): u32 {
    let size: u32 = 0;

    if (this.position != null) {
      const f: Position = this.position as Position;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes ScrollAtPayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes ScrollAtPayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.position != null) {
      const f = this.position as Position;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode ScrollAtPayload
} // ScrollAtPayload

export class NewPanePayload {
  public direction: u32;
  public pane_name: string = "";

  public ___direction: string = "";
  public ___direction_index: u8 = 0;

  public ___pane_name: string = "";
  public ___pane_name_index: u8 = 0;

  static readonly DIRECTION_DIRECTION_INDEX: u8 = 1;
  static readonly PANE_NAME_PANE_NAME_INDEX: u8 = 2;

  // Decodes NewPanePayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): NewPanePayload {
    return NewPanePayload.decodeDataView(new DataView(buf));
  }

  // Decodes NewPanePayload from a DataView
  static decodeDataView(view: DataView): NewPanePayload {
    const decoder = new Decoder(view);
    const obj = new NewPanePayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.direction = decoder.uint32();
          obj.___direction = "direction";
          obj.___direction_index = 1;
          break;
        }
        case 2: {
          obj.pane_name = decoder.string();
          obj.___pane_name = "pane_name";
          obj.___pane_name_index = 2;
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode NewPanePayload

  public size(): u32 {
    let size: u32 = 0;

    size += this.direction == 0 ? 0 : 1 + Sizer.uint32(this.direction);
    size +=
      this.pane_name.length > 0
        ? 1 + Sizer.varint64(this.pane_name.length) + this.pane_name.length
        : 0;

    return size;
  }

  // Encodes NewPanePayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes NewPanePayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.direction != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.direction);
    }
    if (this.pane_name.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.pane_name.length);
      encoder.string(this.pane_name);
    }

    return buf;
  } // encode NewPanePayload
} // NewPanePayload

export class SwitchToModePayload {
  public input_mode: u32;

  // Decodes SwitchToModePayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): SwitchToModePayload {
    return SwitchToModePayload.decodeDataView(new DataView(buf));
  }

  // Decodes SwitchToModePayload from a DataView
  static decodeDataView(view: DataView): SwitchToModePayload {
    const decoder = new Decoder(view);
    const obj = new SwitchToModePayload();

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
  } // decode SwitchToModePayload

  public size(): u32 {
    let size: u32 = 0;

    size += this.input_mode == 0 ? 0 : 1 + Sizer.uint32(this.input_mode);

    return size;
  }

  // Encodes SwitchToModePayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes SwitchToModePayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.input_mode != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.input_mode);
    }

    return buf;
  } // encode SwitchToModePayload
} // SwitchToModePayload

export class WritePayload {
  public bytes_to_write: Array<u8> = new Array<u8>();

  // Decodes WritePayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): WritePayload {
    return WritePayload.decodeDataView(new DataView(buf));
  }

  // Decodes WritePayload from a DataView
  static decodeDataView(view: DataView): WritePayload {
    const decoder = new Decoder(view);
    const obj = new WritePayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.bytes_to_write = decoder.bytes();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode WritePayload

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.bytes_to_write.length > 0
        ? 1 +
          Sizer.varint64(this.bytes_to_write.length) +
          this.bytes_to_write.length
        : 0;

    return size;
  }

  // Encodes WritePayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes WritePayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.bytes_to_write.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.bytes_to_write.length);
      encoder.bytes(this.bytes_to_write);
    }

    return buf;
  } // encode WritePayload
} // WritePayload

export class WriteCharsPayload {
  public chars: string = "";

  // Decodes WriteCharsPayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): WriteCharsPayload {
    return WriteCharsPayload.decodeDataView(new DataView(buf));
  }

  // Decodes WriteCharsPayload from a DataView
  static decodeDataView(view: DataView): WriteCharsPayload {
    const decoder = new Decoder(view);
    const obj = new WriteCharsPayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.chars = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode WriteCharsPayload

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.chars.length > 0
        ? 1 + Sizer.varint64(this.chars.length) + this.chars.length
        : 0;

    return size;
  }

  // Encodes WriteCharsPayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes WriteCharsPayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.chars.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.chars.length);
      encoder.string(this.chars);
    }

    return buf;
  } // encode WriteCharsPayload
} // WriteCharsPayload

export class DumpScreenPayload {
  public file_path: string = "";
  public include_scrollback: bool;

  // Decodes DumpScreenPayload from an ArrayBuffer
  static decode(buf: ArrayBuffer): DumpScreenPayload {
    return DumpScreenPayload.decodeDataView(new DataView(buf));
  }

  // Decodes DumpScreenPayload from a DataView
  static decodeDataView(view: DataView): DumpScreenPayload {
    const decoder = new Decoder(view);
    const obj = new DumpScreenPayload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.file_path = decoder.string();
          break;
        }
        case 2: {
          obj.include_scrollback = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode DumpScreenPayload

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.file_path.length > 0
        ? 1 + Sizer.varint64(this.file_path.length) + this.file_path.length
        : 0;
    size += this.include_scrollback == 0 ? 0 : 1 + 1;

    return size;
  }

  // Encodes DumpScreenPayload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes DumpScreenPayload to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.file_path.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.file_path.length);
      encoder.string(this.file_path);
    }
    if (this.include_scrollback != 0) {
      encoder.uint32(0x10);
      encoder.bool(this.include_scrollback);
    }

    return buf;
  } // encode DumpScreenPayload
} // DumpScreenPayload

export class Position {
  public line: i64;
  public column: i64;

  // Decodes Position from an ArrayBuffer
  static decode(buf: ArrayBuffer): Position {
    return Position.decodeDataView(new DataView(buf));
  }

  // Decodes Position from a DataView
  static decodeDataView(view: DataView): Position {
    const decoder = new Decoder(view);
    const obj = new Position();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.line = decoder.int64();
          break;
        }
        case 2: {
          obj.column = decoder.int64();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Position

  public size(): u32 {
    let size: u32 = 0;

    size += this.line == 0 ? 0 : 1 + Sizer.int64(this.line);
    size += this.column == 0 ? 0 : 1 + Sizer.int64(this.column);

    return size;
  }

  // Encodes Position to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes Position to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.line != 0) {
      encoder.uint32(0x8);
      encoder.int64(this.line);
    }
    if (this.column != 0) {
      encoder.uint32(0x10);
      encoder.int64(this.column);
    }

    return buf;
  } // encode Position
} // Position

export class RunCommandAction {
  public command: string = "";
  public args: Array<string> = new Array<string>();
  public cwd: string = "";
  public direction: u32;
  public pane_name: string = "";
  public hold_on_close: bool;
  public hold_on_start: bool;

  public ___cwd: string = "";
  public ___cwd_index: u8 = 0;

  public ___direction: string = "";
  public ___direction_index: u8 = 0;

  public ___pane_name: string = "";
  public ___pane_name_index: u8 = 0;

  static readonly CWD_CWD_INDEX: u8 = 3;
  static readonly DIRECTION_DIRECTION_INDEX: u8 = 4;
  static readonly PANE_NAME_PANE_NAME_INDEX: u8 = 5;

  // Decodes RunCommandAction from an ArrayBuffer
  static decode(buf: ArrayBuffer): RunCommandAction {
    return RunCommandAction.decodeDataView(new DataView(buf));
  }

  // Decodes RunCommandAction from a DataView
  static decodeDataView(view: DataView): RunCommandAction {
    const decoder = new Decoder(view);
    const obj = new RunCommandAction();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.command = decoder.string();
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
        case 4: {
          obj.direction = decoder.uint32();
          obj.___direction = "direction";
          obj.___direction_index = 4;
          break;
        }
        case 5: {
          obj.pane_name = decoder.string();
          obj.___pane_name = "pane_name";
          obj.___pane_name_index = 5;
          break;
        }
        case 6: {
          obj.hold_on_close = decoder.bool();
          break;
        }
        case 7: {
          obj.hold_on_start = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode RunCommandAction

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.command.length > 0
        ? 1 + Sizer.varint64(this.command.length) + this.command.length
        : 0;

    size += __size_string_repeated(this.args);

    size +=
      this.cwd.length > 0
        ? 1 + Sizer.varint64(this.cwd.length) + this.cwd.length
        : 0;
    size += this.direction == 0 ? 0 : 1 + Sizer.uint32(this.direction);
    size +=
      this.pane_name.length > 0
        ? 1 + Sizer.varint64(this.pane_name.length) + this.pane_name.length
        : 0;
    size += this.hold_on_close == 0 ? 0 : 1 + 1;
    size += this.hold_on_start == 0 ? 0 : 1 + 1;

    return size;
  }

  // Encodes RunCommandAction to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes RunCommandAction to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.command.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.command.length);
      encoder.string(this.command);
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
    if (this.direction != 0) {
      encoder.uint32(0x20);
      encoder.uint32(this.direction);
    }
    if (this.pane_name.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.pane_name.length);
      encoder.string(this.pane_name);
    }
    if (this.hold_on_close != 0) {
      encoder.uint32(0x30);
      encoder.bool(this.hold_on_close);
    }
    if (this.hold_on_start != 0) {
      encoder.uint32(0x38);
      encoder.bool(this.hold_on_start);
    }

    return buf;
  } // encode RunCommandAction
} // RunCommandAction

export class PluginConfiguration {
  public name_and_value: Array<NameAndValue> = new Array<NameAndValue>();

  // Decodes PluginConfiguration from an ArrayBuffer
  static decode(buf: ArrayBuffer): PluginConfiguration {
    return PluginConfiguration.decodeDataView(new DataView(buf));
  }

  // Decodes PluginConfiguration from a DataView
  static decodeDataView(view: DataView): PluginConfiguration {
    const decoder = new Decoder(view);
    const obj = new PluginConfiguration();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.name_and_value.push(
            NameAndValue.decodeDataView(
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

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode PluginConfiguration

  public size(): u32 {
    let size: u32 = 0;

    for (let n: i32 = 0; n < this.name_and_value.length; n++) {
      const messageSize = this.name_and_value[n].size();

      if (messageSize > 0) {
        size += 1 + Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes PluginConfiguration to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes PluginConfiguration to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    for (let n: i32 = 0; n < this.name_and_value.length; n++) {
      const messageSize = this.name_and_value[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        this.name_and_value[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode PluginConfiguration
} // PluginConfiguration

export class NameAndValue {
  public name: string = "";
  public value: string = "";

  // Decodes NameAndValue from an ArrayBuffer
  static decode(buf: ArrayBuffer): NameAndValue {
    return NameAndValue.decodeDataView(new DataView(buf));
  }

  // Decodes NameAndValue from a DataView
  static decodeDataView(view: DataView): NameAndValue {
    const decoder = new Decoder(view);
    const obj = new NameAndValue();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.name = decoder.string();
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
  } // decode NameAndValue

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.name.length > 0
        ? 1 + Sizer.varint64(this.name.length) + this.name.length
        : 0;
    size +=
      this.value.length > 0
        ? 1 + Sizer.varint64(this.value.length) + this.value.length
        : 0;

    return size;
  }

  // Encodes NameAndValue to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array()),
    );
  }

  // Encodes NameAndValue to the Array<u8>
  encodeU8Array(encoder: Encoder = new Encoder(new Array<u8>())): Array<u8> {
    const buf = encoder.buf;

    if (this.name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.name.length);
      encoder.string(this.name);
    }
    if (this.value.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.value.length);
      encoder.string(this.value);
    }

    return buf;
  } // encode NameAndValue
} // NameAndValue

// __size_string_repeated

function __size_string_repeated(value: Array<string>): u32 {
  let size: u32 = 0;

  for (let n: i32 = 0; n < value.length; n++) {
    size += 1 + Sizer.varint64(value[n].length) + value[n].length;
  }

  return size;
}
