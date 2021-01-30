// onload=()=>{

    // document 是一個節點
    let time=document.getElementById("time");
    let combo=document.getElementById("combo");
    
    let sec=0,count=0;
    
    let animal=document.getElementsByTagName("img");
    // console.log(animal);

let btn=document.getElementsByTagName("button")[0];
// console.log(btn);
btn.addEventListener('click',gamestart);

// 按下鍵盤都會啟動keyboard

let changecolor=new Array();

// 點擊按鈕觸發這個函式
function gamestart(){
    // console.log(123);
    sec=60;
    count=0;
    time.textContent='剩馀时间'+sec+'秒';
    combo.textContent='成绩'+count;
    // 按鈕點擊後 就remove click這個效果(以防重複點擊)
    btn.removeEventListener('click',gamestart);
    
    // 遊戲開始從60秒倒數
    const start=setInterval(()=>{
        if(sec==0){
            clearInterval(start);
            btn.addEventListener('click',gamestart);  // 開放按鈕才能玩第二次
        }else{
            sec--;
            time.textContent='剩馀时间'+sec+'秒'}
        },1000)
        
        for(let i=0; i<100; i++){
            // 產生100個紅色狀態
            const onTime=Math.floor(Math.random()*57000);　// 0<56999豪秒 隨機出現時間
            const onWhere=Math.floor(Math.random()*9);　// 0~8秒 隨機出現卡牌
            const onDelay=Math.floor(Math.random()*3)+2;　// 2~4秒 卡片滯留時間
            
            setTimeout(()=>{
                // 把i帶進去 才知道是第幾隻動物
                // 送往紅色狀態變化
                showIt(onWhere,onDelay,i);
            },onTime);
        }
    }
    
    // 觸發紅色狀態處理
    function showIt(where,delay,item){
        // 第幾號位置 停留幾秒 第？/100隻魚
        // console.log(where,delay,item);
        if(animal[where].style.backgroundColor!=''){  // 代表不是黃色(可能綠或紅)，還是要找地方顯示
            // 方法1:where+1 再跑一次showIt
            var next=(where!=8)?where+1:0;
            // 方法2:
            var next=(where+1)%9;　// 8+1%9=1　7+1%9=8
            
            // 讓尋找時間 慢0.1秒 以防九張卡片都被置換成紅色 再有卡片沒辦法替換程式當掉
            setTimeout(()=>{ //紅色會自動於N秒後轉黃，要記住一百個定時炸單編號(用陣列 let changecolor)
                showIt(next,delay,item);
            },100);
        }else{ // 可以變紅色 因為是黃色或綠色
            animal[where].src="2.png";
            animal[where].style.backgroundColor="red";
            animal[where].alt=item;  // 偷偷藏？/100編號在alt上面
            
            changecolor[item]=setTimeout(()=>{
                animal[where].src="1.png";
                animal[where].style.backgroundColor=null;
                animal[where].alt=null;
            }, delay*1000);  // delay單位是毫秒 要乘1000
        }
    }
    

/*滑鼠事件*/
// 可以在圖片下onclick="getCombo(0);" 最快~
/*
for(i=0;i<=8;i++){
    p=document.getElementById('p'+i).onclick(()=>{
        getCombo(i); //執行這道指令 不是函式名稱
    });
}
for(i=0;i<=8;i++){
    p=document.getElementById('p'+i).click(()=>{
        getCombo(i); //執行這道指令 不是函式名稱
    });
}
*/

for(let i=0;i<animal.length;i++){
    console.log(i,animal[i]);
    animal[i].addEventListener('click',()=>{
        getCombo(i); //執行這道指令 不是函式名稱
    })
}


/*鍵盤事件*/
    document.onkeydown=keyboard;
    function keyboard(){
        // 會在console顯示出按下哪個鍵
        console.log(event);
        // console.log(event.keyCode);
        
        switch(event.keyCode){
            case 103:
                getCombo(0);
                break;
                case 104:
                    getCombo(1);
                    break;
        case 105:
            getCombo(2);
        break;
        case 100:
            getCombo(3);
        break;
        case 101:
            getCombo(4);
        break;
        case 102:
            getCombo(5);
        break;
        case 97:
            getCombo(6);
        break;
        case 98:
            getCombo(7);
        break;
        case 99:
            getCombo(8);
        break;
    }
}



// 按下數字鍵 會顯示出那個數字
// 得分 只有在紅色狀態時給分
function getCombo(item){
    console.log(item);

    if(animal[item].style.backgroundColor=="red"){ //紅色轉成綠色=>轉黃是因為第53行(轉黃速度太快)
        animal[item].src="3"+Math.floor(Math.random()*10)+".png";
        animal[item].style.backgroundColor="rgba(66, 138, 197, 0.562)";
        // animal[where].alt=null;

        count++;
        combo.textContent='成绩'+count;
        const theID=animal[item].alt;
        console.log(theID);　//按下卡片就可以獲得卡片的alt值=ID值
        clearTimeout(changecolor[theID]); //這樣就可以把紅色轉黃事件 全部取消掉


        // 取消原本紅轉黃的預定規劃=> 改成 綠轉黃的預定規劃
        // 得分後一秒後卡牌回歸黃色背景
        setTimeout(()=>{
            animal[item].src="1.png";
            animal[item].style.backgroundColor=null;
            animal[item].alt=null;
        },1000)
    }
}





// }