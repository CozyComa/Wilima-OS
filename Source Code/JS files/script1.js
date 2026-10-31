let BackgroundBlue = 0;
let BackgroundRed = 175;
let BackgroundGreen = 90;

let OpenedAppClass;
let OpenedApp;
let CreatedWindow;
let WindowList = [];
let WindowIDNum = 0;
let IsDragging = false;
let DragWindow;
let ResizeWindow;
let IsResizing = false;
let ResizeDir;
let CurrentAppName;
let CurrentAppIcon;

let SettingsIconBP = document.querySelector(".SettingsIcon");
let FileExplorerIconBP = document.querySelector(".FileExplorerIcon");
let TerminalIconBP = document.querySelector(".TerminalIcon");
let ClockIconBP = document.querySelector(".ClockIcon");
let CalculatorIconBP = document.querySelector(".CalculatorIcon");

let SettingsIcon = SettingsIconBP.cloneNode(true);
let FileExplorerIcon = FileExplorerIconBP.cloneNode(true);
let TerminalIcon = TerminalIconBP.cloneNode(true);
let ClockIcon = ClockIconBP.cloneNode(true);
let CalculatorIcon = CalculatorIconBP.cloneNode(true);

document.querySelector("#SettingsTaskIcon").appendChild(SettingsIcon);
document.querySelector("#FileExplorerTaskIcon").appendChild(FileExplorerIcon);
document.querySelector("#TerminalTaskIcon").appendChild(TerminalIcon);
document.querySelector("#ClockTaskIcon").appendChild(ClockIcon);
document.querySelector("#CalculatorTaskIcon").appendChild(CalculatorIcon);

setInterval(() => {
    let DTInfo = new Date();
    document.querySelector("#Date").textContent = `${String(DTInfo.getMonth() + 1).padStart(2, "0")}/${String(DTInfo.getDate()).padStart(2, "0")}/${String(DTInfo.getFullYear()).padStart(4, "0")}`;
    document.querySelector("#Time").textContent = `${String(DTInfo.getHours()).padStart(2, "0")}:${String(DTInfo.getMinutes()).padStart(2, "0")}`;
    document.querySelectorAll(".ClockTime").forEach((Time) => {
        Time.textContent = `${String(DTInfo.getHours()).padStart(2, "0")}:${String(DTInfo.getMinutes()).padStart(2, "0")}`;
    })
    document.querySelectorAll(".ClockDate").forEach((Date) => {
        Date.textContent = `${String(DTInfo.getMonth() + 1).padStart(2, "0")}/${String(DTInfo.getDate()).padStart(2, "0")}/${String(DTInfo.getFullYear()).padStart(4, "0")}`;
    })
}, 1000);

let TaskApps = document.querySelectorAll(".TaskApp");
TaskApps.forEach(
    (TaskApp) => {
        TaskApp.addEventListener("mouseup", (event) => {
            switch(event.currentTarget.id){
                case "SettingsTaskIcon": OpenedAppClass = ".SettingsApp"; CurrentAppName = "Settings"; CurrentAppIcon = document.querySelector(".SettingsIcon").cloneNode(true);break;
                case "FileExplorerTaskIcon": OpenedAppClass = ".FileExplorerApp"; CurrentAppName = "File Explorer"; CurrentAppIcon = document.querySelector(".FileExplorerIcon").cloneNode(true);break;
                case "TerminalTaskIcon": OpenedAppClass = ".TerminalApp"; CurrentAppName = "Terminal"; CurrentAppIcon = document.querySelector(".TerminalIcon").cloneNode(true);break;
                case "ClockTaskIcon": OpenedAppClass = ".ClockApp"; CurrentAppName = "Clock"; CurrentAppIcon = document.querySelector(".ClockIcon").cloneNode(true);break;
                case "CalculatorTaskIcon": OpenedAppClass = ".CalculatorApp"; CurrentAppName = "Calculator"; CurrentAppIcon = document.querySelector(".CalculatorIcon").cloneNode(true);break;}
            OpenedApp = document.querySelector(OpenedAppClass).cloneNode(true);
            CreatedWindow = document.querySelector(".Window").cloneNode(true);
            CreatedWindow.querySelector(".AppArea").appendChild(OpenedApp);
            CreatedWindow.querySelector(".TitleIcon").appendChild(CurrentAppIcon);
            CreatedWindow.querySelector(".TitleText").textContent = CurrentAppName;
            document.querySelector("#Desktop").appendChild(CreatedWindow);
            if(CurrentAppName === "Settings"){
                SettingsListenerAdd();
            }
            else if(CurrentAppName === "Terminal"){
                TerminalListenerAdd();
            }
            
            WindowIDNum += 1;
            CreatedWindow.id = WindowIDNum;
            WindowList.push(CreatedWindow.id);
            UpdateZ();
            CreatedWindow.querySelector(".Close").addEventListener( 
                "mouseup",(event) =>
                {
                    document.querySelector("#Desktop").removeChild(event.currentTarget.closest(".Window"));
                    WindowList.splice(WindowList.indexOf(event.currentTarget.closest(".Window").id), 1)
                    UpdateZ()
                }
            )
            CreatedWindow.querySelector(".Title").addEventListener(
                "mousedown",
                (event) => {
                    if(!IsResizing){
                        IsDragging = true;
                    }
                    DragWindow = event.currentTarget.closest(".Window");
                }
            )
            CreatedWindow.querySelector(".BottomHRL").addEventListener(
                "mousedown", (event) => {
                    if(!IsDragging){
                        IsResizing = true;
                    }
                    ResizeWindow = event.target.closest(".Window");
                    ResizeDir = "Bottom";
                }
            )
            CreatedWindow.querySelector(".TopHRL").addEventListener(
                "mousedown", (event) => {
                    if(!IsDragging){
                        IsResizing = true;
                    }
                    ResizeWindow = event.target.closest(".Window");
                    ResizeDir = "Top";
                }
            )
            CreatedWindow.querySelector(".RightVRL").addEventListener(
                "mousedown", (event) => {
                    if(!IsDragging){
                        IsResizing = true;
                    }
                    ResizeWindow = event.target.closest(".Window");
                    ResizeDir = "Right";
                }
            )
            CreatedWindow.querySelector(".LeftVRL").addEventListener(
                "mousedown", (event) => {
                    if(!IsDragging){
                        IsResizing = true;
                    }
                    ResizeWindow = event.currentTarget.closest(".Window");
                    ResizeDir = "Left";
                }
            )
        })
    }
)

function UpdateZ(){
    WindowList.forEach(
        (Window) =>{
            document.getElementById(String(Window)).style.zIndex = WindowList.indexOf(Window);
        }
    )
}

document.addEventListener(
    "mousemove", (event) => {
        if(IsDragging){
            DragWindow.style.left = (DragWindow.offsetLeft + event.movementX/5) + "px"
            DragWindow.style.top = (DragWindow.offsetTop + event.movementY/5) + "px"
        }
        if(IsResizing && ResizeWindow){
            switch(ResizeDir){
                case "Bottom":
                    ResizeWindow.style.height = (parseFloat(getComputedStyle(ResizeWindow).height) + event.movementY/5) + "px";
                    if(getComputedStyle(ResizeWindow).height !== getComputedStyle(ResizeWindow).minHeight){
                        ResizeWindow.style.top = ((parseFloat(getComputedStyle(ResizeWindow).top)) + event.movementY/10) + "px";
                    }
                    break;
                case "Top":
                    ResizeWindow.style.height = (parseFloat(getComputedStyle(ResizeWindow).height) - event.movementY/5) + "px";
                    if(getComputedStyle(ResizeWindow).height !== getComputedStyle(ResizeWindow).minHeight){
                        ResizeWindow.style.top = ((parseFloat(getComputedStyle(ResizeWindow).top)) + event.movementY/10) + "px";
                    }
                    break;
                case "Left":
                    ResizeWindow.style.width = (parseFloat(getComputedStyle(ResizeWindow).width) - event.movementX/5) + "px";
                    if(getComputedStyle(ResizeWindow).width !== getComputedStyle(ResizeWindow).minWidth){
                        ResizeWindow.style.left = ((parseFloat(getComputedStyle(ResizeWindow).left)) + event.movementX/10) + "px";
                    }
                    break;
                case "Right":
                    ResizeWindow.style.width = (parseFloat(getComputedStyle(ResizeWindow).width) + event.movementX/5) + "px";
                    if(getComputedStyle(ResizeWindow).width !== getComputedStyle(ResizeWindow).minWidth){
                        ResizeWindow.style.left = ((parseFloat(getComputedStyle(ResizeWindow).left)) + event.movementX/10) + "px";
                    }
                    break;
            }
        }

    }
)
document.addEventListener(
   "mouseup",
    (event) => {
        IsDragging = false;
        IsResizing = false;
    }
)
function SettingsListenerAdd(){
    CreatedWindow.querySelector(".TaskTransparencySlider").addEventListener(
        "change", () => {
            document.querySelector("#Taskbar").style.opacity = CreatedWindow.querySelector(".TaskTransparencySlider").value/100;
            document.querySelectorAll(".TaskTransparencySlider").value = CreatedWindow.querySelector(".TaskTransparencySlider").value;
        }
    )
    CreatedWindow.querySelector(".TaskRedSlider").addEventListener(
        "change", () => {
            document.querySelector("#Desktop").style.backgroundImage = `linear-gradient(to top,black, rgb(${CreatedWindow.querySelector(".TaskRedSlider").value}, ${BackgroundGreen}, ${BackgroundBlue}))`;
            document.querySelectorAll(".TaskRedSlider").value = CreatedWindow.querySelector(".TaskRedSlider").value;
            BackgroundRed = CreatedWindow.querySelector(".TaskRedSlider").value;
        }
    )
    CreatedWindow.querySelector(".TaskGreenSlider").addEventListener(
        "change", () => {
            document.querySelector("#Desktop").style.backgroundImage = `linear-gradient(to top,black, rgb(${BackgroundRed}, ${CreatedWindow.querySelector(".TaskGreenSlider").value}, ${BackgroundBlue}))`;
            document.querySelectorAll(".TaskGreenSlider").value = CreatedWindow.querySelector(".TaskGreenSlider").value;
            BackgroundGreen = CreatedWindow.querySelector(".TaskGreenSlider").value;
        }
    )
    CreatedWindow.querySelector(".TaskBlueSlider").addEventListener(
        "change", () => {
            document.querySelector("#Desktop").style.backgroundImage = `linear-gradient(to top,black, rgb(${BackgroundRed}, ${BackgroundGreen}, ${CreatedWindow.querySelector(".TaskBlueSlider").value}))`;
            document.querySelectorAll(".TaskBlueSlider").value = CreatedWindow.querySelector(".TaskBlueSlider").value;
            BackgroundBlue = CreatedWindow.querySelector(".TaskBlueSlider").value;
        }
    )
    CreatedWindow.querySelector(".TDCheck").addEventListener(
        "mouseup", () => {
            if(document.querySelector(".TDCheck").checked === true){
                document.querySelector("#TDInfo").style.display = "none";
                document.querySelector(".TDCheck").checked = false;
            }
            else{
                document.querySelector("#TDInfo").style.display = "flex";
                document.querySelector(".TDCheck").checked = true;
            }
        }
    )
}
function TerminalListenerAdd(){
    let TerminalWindow = CreatedWindow;
    CreatedWindow.querySelector(".TerminalInput").addEventListener(
        "keydown", (event) => {
            if(event.key === "Enter"){
                TerminalWindow.querySelector(".TerminalIO").textContent += "\n >>>" + TerminalWindow.querySelector(".TerminalInput").value;
                if(TerminalWindow.querySelector(".TerminalInput").value === "Info"){
                    TerminalWindow.querySelector(".TerminalIO").textContent += "\nThis is an OS made by me(Controversial Knoledge)\n and I spent a lot of time";
                }
                else if(TerminalWindow.querySelector(".TerminalInput").value === "Credits"){
                    TerminalWindow.querySelector(".TerminalIO").textContent += "\nThis OS was made with HTML, CSS and JavaScript\n by 'Someone with his username long forgotten'.";
                }
                else if(TerminalWindow.querySelector(".TerminalInput").value === "RandomInfoThatIHopeYouWillRead"){
                    TerminalWindow.querySelector(".TerminalIO").textContent += "\nHello, pls give me some stardust, i spent a hell lot of time. Plss!";
                }
                else{TerminalWindow.querySelector(".TerminalIO").textContent += "\nHUH? What do you mean?";}
                TerminalWindow.querySelector(".TerminalInput").value = "";
            }
        }
    )
}
