const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";
const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromcur=document.querySelector(".from select")
const tocur=document.querySelector(".to select")
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(code in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=code;
        newoption.value=code;
        if(select.name=="from" && code=="INR"){
            newoption.selected="selected";
        }
        if(select.name=="to" && code=="USD"){
            newoption.selected="selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}

const updateflag = (element) =>{
    let curcode=element.value;
    let countrycode=countryList[curcode];
    let newFlag = `https://flagsapi.com/${countrycode}/flat/64.png`;

    let img=element.parentElement.querySelector("img");
    img.src=newFlag; 
};


const updateExchangeRate = async () =>{
    let amount=document.querySelector(".Amount input");
    let amtval=amount.value;
    if(amtval<0  || amtval==""){
        amtval=0;
        amount.value="0";
    }
    const url = `${BASE_URL}${fromcur.value.toLowerCase()}.json`;
    const response=await fetch(url);
    const data=await response.json();
    let rate=data[fromcur.value.toLowerCase()][tocur.value.toLowerCase()];
    let finalamt=amtval*rate;
    msg.innerText=`${amtval} ${fromcur.value} = ${finalamt} ${tocur.value}`;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load",()=>{
    updateExchangeRate();
})