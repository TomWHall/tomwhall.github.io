/*! For license information please see js-pixel-collision-demo.6218dc846982302467ad.js.LICENSE.txt */
(()=>{"use strict";function t(t){return t.toString(16)}const e=(76,150,`#${t(155)}${t(76)}${t(150)}`);function n(t){const n=document.createElement("canvas"),i=n.getContext("2d");i.fillStyle=e,i.fillRect(0,0,n.width,n.height),i.fill(),i.drawImage(t,0,0);const a=i.getImageData(0,0,t.width,t.height),o=new Uint32Array(new ArrayBuffer(4*t.height));for(let e=0;e<t.height;e++){const n=e*t.width*4;let i=0;for(let e=0;e<t.width;e++){const t=n+4*e,o=a.data[t],r=a.data[t+1],h=a.data[t+2];155===o&&76===r&&150===h||(i+=31===e?1:Math.pow(2,32-(e+1)))}o[e]=i}return o}async function i(t){const e=document.createElement("img");return e.src=t,new Promise(((n,i)=>{e.onload=()=>{n(e)},e.onerror=()=>{i(`Failed to load image from ${t}`)}}))}(async function(){const t=[i("img/devil-left.png"),i("img/player-right.png")],e=await Promise.all(t),a=e[0],o=e[1],r={x:40,y:8,width:32,height:64,image:a,mask:n(a)},h={x:71,y:21,width:32,height:64,image:o,mask:n(o)},c=document.getElementById("canvas"),g=c.getContext("2d");g.imageSmoothingEnabled=!1,g.fillStyle="#9999ff";const l=document.getElementById("info-text");let m=0;!function t(){switch(m=(m+1)%4,m){case 0:h.x=71,h.y=20;break;case 1:h.x=71,h.y=21;break;case 2:h.x=9,h.y=20;break;case 3:h.x=9,h.y=21}g.fillRect(0,0,c.width,c.height),g.drawImage(r.image,r.x,r.y),g.drawImage(h.image,h.x,h.y);const e=function(t,e){if(t.x+t.width<=e.x||t.x>=e.x+e.width||t.y+t.height<=e.y||t.y>=e.y+e.height)return!1;const n=Math.max(t.y,e.y),i=Math.min(t.y+t.height-1,e.y+e.height-1);let a=n-t.y,o=n-e.y;const r=t.mask,h=e.mask,c=e.x-t.x,g=t.x-e.x;for(let t=n;t<=i;t++){let t=r[a],e=h[o];if(c>0?t=t<<c>>>0:g>0&&(t>>>=g),0!=(t&e))return!0;a++,o++}return!1}(h,r);l.innerText=`Collides: ${e}`,setTimeout(t,1e3)}()})().then((()=>{}))})();