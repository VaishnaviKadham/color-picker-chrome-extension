const colorPickerBtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const clearAll = document.querySelector(".clear-all");
const pickedColors=JSON.parse(localStorage.getItem("picked-colors") || "[]");

const copycolor = elem => {
    navigator.clipboard.writeText(elem.dataset.color);
    elem.innerText = "Copied";
    setTimeout(() => elem.innerText= elem.dataset.color,1000);
}

const showColors = ()=>{

    // returning if there are no picked colors
    if(!pickedColors.length) return;
    colorList.innerHTML=pickedColors.map(color => `
            <li class="color">
            <span class="rect" style="background: ${color}; ${color === "#ffffff" ? 'border:1px solid #ccc;' : `border:1px solid ${color};`}"></span>
            <span class="value" data-color="${color}">${color}</span>
             </li>
    `).join("");// generating li for the picked color it to the colorlist
    
    document.querySelector(".picked-colors").classList.remove("hide");

    // Add click event listener to each color element to the copy color code
    document.querySelectorAll(".color").forEach( li => {
        li.addEventListener("click", e => copycolor(e.currentTarget.lastElementChild));
    });
}

showColors();

const activateEyeDropper = () =>{
    document.body.style.display="none";
    setTimeout(async () => {
    try{
        // opening the eye dropper and getting the selected color
        const eyeDropper = new EyeDropper();
        const {sRGBHex}= await eyeDropper.open();
        navigator.clipboard.writeText(sRGBHex);

        // adding tr color to list if doesnt already exist
        if(!pickedColors.includes(sRGBHex)){
        pickedColors.push(sRGBHex);
        localStorage.setItem("picked-colors",JSON.stringify(pickedColors));
        showColors();
        }
    }
    catch(error){
        console.log("Failed to copy the color code!");
    }
   },10);
    document.body.style.display="block";
}

// clearing all picked colors , updating local storage, and hiding the pickedColors element
const clearAllColors = () =>{
    pickedColors.length =0;
    localStorage.setItem("picked-colors",JSON.stringify(pickedColors));
    document.querySelector(".picked-colors").classList.add("hide");
}


clearAll.addEventListener("click", clearAllColors);
colorPickerBtn.addEventListener("click",activateEyeDropper);