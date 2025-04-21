// import { IInputs, IOutputs } from "./generated/ManifestTypes";

// export class LinearInputControl
//   implements ComponentFramework.StandardControl<IInputs, IOutputs>
// {
//   // --------------------------
//   // Section: Define Fields
//   // --------------------------
//   /**
//    * Create a private field with the data type of `HTMLDevElement` called `container`.
//    * The `container` is the UI of the PCF itself. we declared it as global so we can use and manipulate it in other functions later.
//    * There is only 1 `container` for everything.
//    */
//   // private container: HTMLDivElement;
//   /**
//    * This is used to create a `div` element.
//    */
//   // private myDiv = document.createElement("div");
//   // private myDiv2 = document.createElement("div");
//   private _div1: HTMLDivElement;
//   private _div2: HTMLDivElement;
//   /**
//    * Empty constructor.
//    */
//   constructor() {
//     // Empty
//   }

//   /**
//    * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
//    * Data-set values are not initialized here, use updateView.
//    * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
//    * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
//    * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
//    * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
//    */
//   public init(
//     context: ComponentFramework.Context<IInputs>,
//     notifyOutputChanged: () => void,
//     state: ComponentFramework.Dictionary,
//     container: HTMLDivElement
//   ): void {
//     // Add control initialization code
//     // this.myDiv.innerText = "This is the first Div value!";
//     // this.myDiv2.innerText = "This is the second Div value!";
//     // container.appendChild(this.myDiv);
//     // container.appendChild(this.myDiv2);
//     // this.container = container;
//     // for (let i = 0; i < 5; i++) {
//     //   const div = document.createElement("div");
//     //   div.innerText = `This is div number ${i + 1}`;
//     //   div.style.padding = "10px";
//     //   div.style.margin = "5px";
//     //   div.style.backgroundColor = "#f0f0f0";
//     //   // Append each div to the container
//     //   container.appendChild(div);
//     // }
//     this._div1 = document.createElement("div");
//     this._div1.innerText = "This is the 1st div value!";
//     this._div1.style.backgroundColor = "#32a852";
//     this._div1.style.margin = "5px";
//     this._div2 = document.createElement("div");
//     this._div2.innerText = "This is the 2nd div value!";
//     this._div2.style.backgroundColor = "#329da8";
//     this._div2.style.margin = "5px";
//     container.appendChild(this._div1);
//     container.appendChild(this._div2);
//   }

//   /**
//    * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
//    * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
//    */
//   public updateView(context: ComponentFramework.Context<IInputs>): void {
//     // Add code to update control view
//     // this.container.innerText = `${context.parameters.samplePropertyTwo.raw}`;
//     const textValue =
//       context.parameters.sampleProperty?.raw || "Default String Value";
//     const numberValue =
//       context.parameters.sampleNumber?.raw == 0
//         ? 0
//         : context.parameters.sampleNumber?.raw ?? 100;
//     this._div1.innerText = textValue;
//     this._div2.innerText = `The value is ${numberValue}`;
//     if (numberValue > 0) {
//       if (this._div1.childElementCount == 0) {
//         const emojiContainer = document.createElement("div");
//         emojiContainer.style.display = "flex";
//         emojiContainer.style.flexWrap = "wrap";
//         emojiContainer.style.gap = "5px";
//         emojiContainer.style.justifyContent = "center";
//         for (let i = 0; i < numberValue; i++) {
//           const tempDiv = document.createElement("div");
//           tempDiv.innerHTML = "🤬";
//           emojiContainer.append(tempDiv);
//         }
//         this._div1.appendChild(emojiContainer);
//         console.log(
//           `Temp Div child element counter: ${emojiContainer.childElementCount}`
//         );
//       }
//       console.log(this._div1.childElementCount);
//     }
//   }

//   /**
//    * It is called by the framework prior to a control receiving new data.
//    * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
//    */
//   public getOutputs(): IOutputs {
//     return {};
//   }

//   /**
//    * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
//    * i.e. cancelling any pending remote calls, removing listeners, etc.
//    */
//   public destroy(): void {
//     // Add code to cleanup control if necessary
//   }
// }
