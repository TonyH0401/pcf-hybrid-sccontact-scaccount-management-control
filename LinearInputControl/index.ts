import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class PaginatedEntityList
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private _div1: HTMLDivElement;
  private _div2: HTMLDivElement;

  /**
   * Empty constructor.
   */
  constructor() {
    // Empty
  }

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    // Add control initialization code
    // Format _div1
    this._div1 = document.createElement("div");
    this._div1.innerText = "This is the 1st div value!";
    this._div1.style.backgroundColor = "#32a852";
    this._div1.style.margin = "5px";
    // Format _div2
    this._div2 = document.createElement("div");
    this._div2.innerText = "This is the 2nd div value!";
    this._div2.style.backgroundColor = "#329da8";
    this._div2.style.margin = "5px";
    // Add both div to the container
    container.append(this._div1);
    container.append(this._div2);
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Add code to update control view
    const textContextval =
      context.parameters.sampleProperty?.raw ?? "Unknown String Value";
    const numberContextVal =
      context.parameters.sampleNumber?.raw == 0
        ? 0
        : context.parameters.sampleNumber?.raw ?? 100;
    this._div1.innerText = `The String Value is: ${textContextval}`;
    this._div2.innerText = `The Number Value is: ${numberContextVal}`;
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
   */
  public getOutputs(): IOutputs {
    return {};
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
