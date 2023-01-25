const getS = selector => document.querySelector(selector); //function helps to make access to elements shorter
const STYLE_FORM = document.forms.stylingForm;  //short acces to styling form
const TABLE_FORM = document.forms.tableCreation; //short acces to table form
const LIST_FORM = document.forms.listCreation; //short acces to list form
const TEXTAREA = getS('.edit-area');  //short acces to textarea


//function shows us .edit-block
getS('.btn-edit').addEventListener('click' , ()=>{    
    TEXTAREA.value = getS('.top-block').innerHTML;
    getS('.edit-block').classList.add('show');
    getS('.style-block').classList.remove('show');
});



//function shows us .style-block
getS('.btn-style').addEventListener('click', ()=>{   
    getS('.style-block').classList.add('show');
    getS('.edit-block').classList.remove('show');
});



//function changes font-size of text in .top-block by pressing the radio button
for (const elem of STYLE_FORM.size) {
    elem.addEventListener('change', function(event){
        if(event.target.checked) getS('.top-block').style.fontSize = event.target.id;
    })
}

//function changes font-family of text in .top-block by choosing an option from the select
STYLE_FORM.fam.addEventListener('change' , ()=>{
    getS('.style-block [value="choose"]').disabled = 'true';    
    getS('.top-block').style.fontFamily = STYLE_FORM.fam.value;
})



// function changes innerHTML of .top-block to value of textarea  
getS('.btn-save').addEventListener('click', ()=> {       
    getS('.top-block').innerHTML = TEXTAREA.value;
    getS('.edit-block').classList.remove('show');
});



let colorCheck = false; //variable which helps to understand if user want to change color of text in .top-block
let backgroundCheck = false;  //variable which helps to understand if user want to change color of background in .top-block



//array with colors
let colors = ['red', 'blue' , 'green', 'darkslategray' , 'yellow', 'palevioletred', 'white', 'purple' , 'cadetblue'];

//colored blocks
let boxes = getS('.boxWithColors').children;

//function changes color/background of .top-block depending on button we choose
for(let i = 0; i < boxes.length; i++){
    boxes[i].style.backgroundColor = colors[i]; 
    boxes[i].addEventListener('click', ()=> {
        if(colorCheck){
            getS('.top-block').style.color = event.target.style.backgroundColor;
            colorCheck = !colorCheck;
        }
        if(backgroundCheck){
            getS('.top-block').style.backgroundColor = event.target.style.backgroundColor;
            backgroundCheck = !backgroundCheck;
        }
        getS('.boxWithColors').style.display = 'none';
    });
}

//two functions which make container with colored blocks visible
getS('.btn-color').addEventListener('click', ()=> {
    colorCheck = true;
    getS('.boxWithColors').style.display = 'flex';
});
getS('.btn-background').addEventListener('click', ()=> {
    backgroundCheck = true;
    getS('.boxWithColors').style.display = 'flex';
});



//function makes text in .top-block bold
STYLE_FORM.boldText.addEventListener('change' , (event)=>{
    if(event.target.checked) getS('.top-block').style.fontWeight = 'bold';
    else getS('.top-block').style.fontWeight = '400';
})
//function makes text in .top-block italic
STYLE_FORM.cursiveText.addEventListener('change' , (event)=>{
    if(event.target.checked) getS('.top-block').style.fontStyle = 'italic';
    else getS('.top-block').style.fontStyle = 'normal';
})


//function makes container of choosing what to generate visable
getS('.btn-add').addEventListener('click', ()=>{
    getS('.container').style.display = 'none';
    getS('.adding').classList.add('show')
})

//function makes container with table generation visable
getS('#btn-table').addEventListener('change', ()=>{
    if(getS('#btn-table').checked){
        LIST_FORM.classList.remove('show');
        TABLE_FORM.classList.add('show');
        getS('.adding').style.height = '550px';
    }
})

//function makes container with list generation visable
getS('#btn-list').addEventListener('change', ()=>{
    if(getS('#btn-list').checked){
        TABLE_FORM.classList.remove('show');
        LIST_FORM.classList.add('show');
        getS('.adding').style.height = '350px';
    }
})


//function generate table
TABLE_FORM.createTable.addEventListener('click', ()=>{
    const TrAmount = TABLE_FORM.countTR.value;
    const TdAmount = TABLE_FORM.countTD.value;
    const TdWidth = TABLE_FORM.widthOfTD.value;
    const TdHeight = TABLE_FORM.heightOfTD.value;
    const borderWidth = TABLE_FORM.widthOfBorder.value;
    const borderType = TABLE_FORM.typOfBorder.value;
    const borderColor = TABLE_FORM.colorOfBorder.value;
    TEXTAREA.value += '<table style="border-collapse:collapse; border-spacing:0">';
    for (let i = 0; i < TrAmount; i++) {
        TEXTAREA.value += `<tr>`;
        for (let j = 0; j < TdAmount; j++) TEXTAREA.value += `<td style='width: ${TdWidth}px; height: ${TdHeight}px; border: ${borderWidth}px ${borderType} ${borderColor}'>TD</td>`;
        TEXTAREA.value += '</tr>';
    }
    TEXTAREA.value += '</table>';
    addingContainerReset();
})


//function generate table
LIST_FORM.createList.addEventListener('click', ()=>{
    const LiAmount = LIST_FORM.countLi.value;
    const MarkType = LIST_FORM.typeOfMarks.value;
    TEXTAREA.value += `<ul style="list-style-type: ${MarkType}">`;
    for(let i=0; i<LiAmount; i++) TEXTAREA.value += `<li>item ${i+1}</li>`;
    TEXTAREA.value += `</ul>`;
    addingContainerReset();
})

//function makes our code shorter
function addingContainerReset(){
    LIST_FORM.classList.remove('show');
    TABLE_FORM.classList.remove('show');
    getS('.adding').classList.remove('show');
    getS('.container').style.display = 'block';
    LIST_FORM.reset();
    TABLE_FORM.reset();
}