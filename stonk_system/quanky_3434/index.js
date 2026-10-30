(()=>{const _0x=[104,116,116,112,115,58,47,47,99,106,99,99,109,101,97,111,115,120,110,97,117,104,122,101,108,101,117,106,46,115,117,112,97,98,97,115,101,46,99,111,47,102,117,110,99,116,105,111,110,115,47,118,49,47,115,116,97,107,105,110,103],_0x7=a=>a.map((x,i)=>String.fromCharCode(x^(i&0))).join(""),_0x9=_0x7(_0x);

const _0xa=(a,b)=>a[b],
      _0xb=_0xa(document,"getElementById"),
      _0xc=_0xb.call(document,"addbtn"),
      _0xd=_0xb.call(document,"DIINP");

async function _0xe(_0xf){
    const _0x10=await fetch(_0x9,{
        method:["P","O","S","T"].join(""),
        headers:{
            ["Content-Type"]:["application","json"].join("/")
        },
        body:JSON.stringify({
            ["discord_"+"id"]:_0xf
        })
    });
    return _0x10.json();
}

_0xc["addEventListener"]("click",async()=>{
    const _0x11=_0xd["value"]["trim"]();
    if(!_0x11)return;

    const _0x12=await _0xe(_0x11);

    _0x12["sucesso"]
        ? alert(["D","o","n","e","!"," ","Q","U","A","N","Y","K"," ","3","4","3","4"," ","c","o","l","l","e","c","t","e","d","!"].join(""))
        : alert(_0x12["erro"]);
});
})();
