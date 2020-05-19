/*!
 * p2babylonunicycle v0.1.0
 * Copyright (c) Tom W Hall 2020
 */!function(e){function t(t){for(var o,s,r=t[0],l=t[1],c=t[2],d=0,u=[];d<r.length;d++)s=r[d],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&u.push(a[s][0]),a[s]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o]);for(h&&h(t);u.length;)u.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,r=1;r<n.length;r++){var l=n[r];0!==a[l]&&(o=!1)}o&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var o={},a={0:0},i=[];function s(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=o,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(n,o,function(t){return e[t]}.bind(null,o));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var r=window.webpackJsonp=window.webpackJsonp||[],l=r.push.bind(r);r.push=t,r=r.slice();for(var c=0;c<r.length;c++)t(r[c]);var h=l;i.push([187,1]),n()}({187:function(e,t,n){"use strict";var o;n.r(t),function(e){e[e.Player=1]="Player",e[e.Terrain=2]="Terrain"}(o||(o={}));var a=o,i=n(27);const s=new i.Material,r=new i.Material,l=new i.Material,c={Player:s,PlayerTyre:r,Terrain:l},h=new i.ContactMaterial(r,l,{restitution:.4,stiffness:Number.MAX_VALUE,friction:1.25});var d={log(...e){console&&console.log(...e)}},u=n(186),p=n(121);let g=0;function m(){return g++,g.toString()}var f=function(e,t,n,o){return new(n||(n=Promise))((function(a,i){function s(e){try{l(o.next(e))}catch(e){i(e)}}function r(e){try{l(o.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,r)}l((o=o.apply(e,t||[])).next())}))};const w={LeatherBlack:"leather-black.jpg",LeatherRed:"leather-red.jpg",MetalChrome:"metal-chrome.jpg",CheckRedWhite:"check-red-white.jpg",VelvetGreen:"velvet-green.jpg",Wood:"wood.jpg",FabricRed:"fabric-red.jpg",Tyre:"tyre.jpg",Skin:"skin.jpg",TilesRed:"tiles-red.jpg"};var y={loadAssets:function(e){return f(this,void 0,void 0,(function*(){const t=new u.a(e);return Object.keys(w).forEach(e=>{const n="img/"+w[e];t.addTextureTask("TextureTask-"+e,n).onSuccess=function(t){T[e]=t.texture}}),new Promise((e,n)=>{d.log("Loading assets");const o=performance.now();t.onFinish=t=>{const n=performance.now()-o;d.log(`Loaded assets in ${n}ms`),e()},t.onTaskError=e=>{n(e.errorObject)},t.load()})}))},getMaterial:function(e,t,n,o,a){const i=new p.a(m(),a),s=e.clone();return t>n?(s.uScale=t/n*o,s.vScale=n*o):n>t?(s.uScale=t*o,s.vScale=n/t*o):(s.uScale=o,s.vScale=o),i.diffuseTexture=s,i}};const T={};var C=n(100),b=n(159);function v(e,t){return t&&(e.meshOptions=t),e}var M={getBox:function(e,t,n,o){return v(b.a.CreateBox(m(),{width:e,height:t,depth:n,wrap:!0}),o)},getCylinder:function(e,t,n){return v(C.a.CreateCylinder(m(),{diameter:e,height:t}),n)},getSphere:function(e,t){return v(C.a.CreateSphere(m(),{diameter:e}),t)},getTorus:function(e,t,n){return v(C.a.CreateTorus(m(),{diameter:e,thickness:t,tessellation:32}),n)}},B=n(24);const S={collisionGroup:a.Terrain,collisionMask:a.Player|a.Terrain};function P(e,t=c.Terrain){return e.material=t,e.collisionGroup=S.collisionGroup,e.collisionMask=S.collisionMask,e.meshes=[],e}function I(e,t,n,o){const a=new i.Body({position:[e[0],e[1]],mass:n}),s=P(new i.Box({width:t,height:.2})),r=((e,t)=>y.getMaterial(T.Wood,e,1,.25,t))(t,o),l=e=>{const n=M.getBox(t,.03,1);n.material=r,n.bakeTransformIntoVertices(B.c.Translation(0,.085*(e?1:-1),0)),s.meshes.push(n)};l(!0),l(!1);const c=M.getBox(t-.06,.14,.94);return c.material=r,s.meshes.push(c),a.addShape(s),a}function k(e,t){const n=new i.RevoluteConstraint(e,t,{localPivotA:[0,0],localPivotB:[0,0]});return n.collideConnected=!1,n}var L,A={getPlatform:I,getSeesaw:function(e,t,n,o){const a=I(e,t,n,o),i=M.getCylinder(.1,1.5,{shadows:!1});return i.bakeTransformIntoVertices(B.c.RotationX(.5*Math.PI)),i.material=(e=>{const t=y.getMaterial(T.MetalChrome,1,1,1,e);return t.specularPower=256,t})(o),a.shapes[0].meshes.push(i),a},getAnchor:function(e){const t=new i.Body({position:[e[0],e[1]]}),n=new i.Circle({radius:.1});return n.sensor=!0,t.addShape(n),t},getSeesawConstraint:k,getMotorSeesawConstraint:function(e,t){const n=k(e,t);return n.enableMotor(),n.setMotorSpeed(-.5),n},getTarget:function(e,t){const n=new i.Body({position:[e[0],e[1]]}),o=P(new i.Box({width:4,height:.2})),a=M.getBox(4,.2,4);return a.material=((e,t,n)=>y.getMaterial(T.TilesRed,e,t,4,n))(4,4,t),o.meshes.push(a),n.addShape(o),n}},x=n(165);class R{constructor(e,t){this.scene=t,e.addBody(A.getPlatform([7,15],18,0,t));const n=[-3,13.5],o=A.getSeesaw(n,4,50,t),a=A.getAnchor(n),i=A.getSeesawConstraint(o,a);e.addBody(o),e.addBody(a),e.addConstraint(i),e.addBody(A.getPlatform([0,11.5],4,0,t));const s=[4.025,11.5],r=A.getSeesaw(s,4,50,t),l=A.getAnchor(s),c=A.getMotorSeesawConstraint(r,l);e.addBody(r),e.addBody(l),e.addConstraint(c),e.addBody(A.getPlatform([6.5,9],3,0,t)),e.addBody(A.getPlatform([9.25,8],1,0,t)),e.addBody(A.getPlatform([11,7],1,0,t)),e.addBody(A.getTarget([14.25,6],t)),new x.a(m(),new B.e(0,3,-6),t).intensity=.3;const h=this.spotLight=new x.c(m(),new B.e(-6,20,3),B.e.Zero(),Math.PI/8,2,t);h.diffuse=new B.a(1,1,.9),h.intensity=5}handlePreWorldStart(){const e=new x.b(1024,this.spotLight);e.useBlurExponentialShadowMap=!0,e.depthScale=8192,e.useKernelBlur=!0,e.blurKernel=8,this.scene.meshes.forEach(t=>{const n=t.meshOptions;!1!==(null==n?void 0:n.shadows)&&(e.getShadowMap().renderList.push(t),t.receiveShadows=!0)})}handlePostWorldStep(e,t){const n=t[0];this.spotLight.setDirectionToTarget(new B.e(n[0],n[1]+.7,0))}}!function(e){e[e.Left=1]="Left",e[e.Right=2]="Right"}(L||(L={}));var V=L;var E={getBox:function(e,t,n,o,a,s){const r=new i.Box(e);if(o&&(r.collisionGroup=o.collisionGroup,r.collisionMask=o.collisionMask),a){const o=M.getBox(e.width,e.height,t,s);o.translate(new B.e(0,0,1),n),o.material=a,r.meshes=[o]}return r},getBoxAsUprightCylinder:function(e,t,n,o,a){const s=new i.Box(e);if(n&&(s.collisionGroup=n.collisionGroup,s.collisionMask=n.collisionMask),o){const n=M.getCylinder(e.width,e.height,a);n.translate(new B.e(0,0,1),t),n.material=o,s.meshes=[n]}return s},getCircleAsSphere:function(e,t,n,o,a){const s=new i.Circle(e);if(n&&(s.collisionGroup=n.collisionGroup,s.collisionMask=n.collisionMask),o){const n=M.getSphere(2*e.radius,a);n.translate(new B.e(0,0,1),t),n.material=o,s.meshes=[n]}return s},getCircleAsFrontalCylinder:function(e,t,n,o,a,s){const r=new i.Circle(e);if(o&&(r.collisionGroup=o.collisionGroup,r.collisionMask=o.collisionMask),a){const o=M.getCylinder(2*e.radius,t,s);o.bakeTransformIntoVertices(B.c.RotationX(-Math.PI/2)),o.bakeTransformIntoVertices(B.c.Translation(0,0,n)),o.material=a,r.meshes=[o]}return r}};const O=e=>e/2,W=e=>2*e,j=O(.25),H=.5*j,G=j,U=1.2*j,X=.8*j,F=j,z={collisionGroup:a.Player,collisionMask:a.Terrain};function _(e,t=c.Player){return e.material=t,e.collisionGroup=z.collisionGroup,e.collisionMask=z.collisionMask,e.meshes=[],e}function N(e,t,n,o){const a=new C.b("TempNode",o);a.translate(t,n);const i=a.position;e.bakeTransformIntoVertices(B.c.Translation(i.x,i.y,i.z))}const q=e=>y.getMaterial(T.LeatherRed,1,1,.25,e),K=e=>y.getMaterial(T.CheckRedWhite,1,1,.5,e),Z=e=>y.getMaterial(T.FabricRed,1,1,.375,e),D=e=>y.getMaterial(T.Skin,1,1,1,e),Y=e=>{const t=y.getMaterial(T.MetalChrome,1,1,1,e);return t.specularPower=256,t};var J={getWheel:function(e,t){const n=new i.Body({mass:.2,position:[e[0],e[1]]}),o=_(new i.Circle({radius:.36}),c.PlayerTyre),a=(e=>y.getMaterial(T.Tyre,8,1,2,e))(t),s=Y(t),r=[],l=M.getTorus(W(.36)-.08,.08);l.bakeTransformIntoVertices(B.c.RotationX(O(Math.PI))),l.material=a,r.push(l);const h=M.getTorus(W(.36*.95)-.08,.064);h.bakeTransformIntoVertices(B.c.RotationX(O(Math.PI))),h.material=s,r.push(h);const d=M.getCylinder(W(.072),.04);d.bakeTransformIntoVertices(B.c.RotationX(-O(Math.PI))),d.material=s,r.push(d);const u=M.getCylinder(W(.018),.24,{shadows:!1});u.bakeTransformIntoVertices(B.c.RotationX(-O(Math.PI))),u.material=s,r.push(u);for(let e=1;e<=8;e++){const t=M.getCylinder(.02,W(.324),{shadows:!1}),n=(new B.e(0,0,1),Math.PI/8*(e-1));t.bakeTransformIntoVertices(B.c.RotationZ(n)),t.material=s,r.push(t)}const p=M.getBox(.13,.02,.01,{shadows:!1});p.bakeTransformIntoVertices(B.c.Translation(.005-O(.13),0,-.1-O(.01))),p.material=s,r.push(p);const g=M.getBox(.13,.02,.01,{shadows:!1});return g.bakeTransformIntoVertices(B.c.Translation(O(.13)-.005,0,.1+O(.01))),g.material=s,r.push(g),o.meshes=r,n.addShape(o),n},getShaft:function(e,t){const n=new i.Body({mass:.2,position:[e[0],e[1]+.35],angle:0}),o=Y(t);o.diffuseColor=new B.a(.125,.125,1);const a=_(new i.Box({width:W(.02),height:.7})),s=e=>{const t=.08*(e?-1:1),n=M.getCylinder(W(.02),.4);n.bakeTransformIntoVertices(B.c.Translation(0,-O(.7)+O(.4),t)),n.material=o,a.meshes.push(n);const i=M.getCylinder(.08,.02,{shadows:!1});i.bakeTransformIntoVertices(B.c.RotationX(-O(Math.PI))),i.bakeTransformIntoVertices(B.c.Translation(0,-O(.7),t)),i.material=o,a.meshes.push(i)};s(!0),s(!1),n.addShape(a);const r=.4-O(.7),l=M.getCylinder(W(.02),W(.08));l.bakeTransformIntoVertices(B.c.RotationX(-O(Math.PI))),l.bakeTransformIntoVertices(B.c.Translation(0,r,0)),l.material=o,a.meshes.push(l);const c=e=>{const t=.08*(e?-1:1),n=M.getSphere(W(.02));n.bakeTransformIntoVertices(B.c.Translation(0,r,t)),n.material=o,a.meshes.push(n)};c(!0),c(!1);const h=M.getCylinder(W(.02),.7-.4);h.bakeTransformIntoVertices(B.c.Translation(0,O(.7)-O(.7-.4),0)),h.material=o,a.meshes.push(h);const d=_(new i.Box({width:.3,height:.05})),u=M.getSphere(.3,{shadows:!1});u.scaling=new B.e(1,.05/.3,.2/.3),u.material=(e=>y.getMaterial(T.LeatherBlack,2,2,.25,e))(t),d.meshes.push(u),n.addShape(d,[0,O(.7)+O(.05)],0);const p=K(t),g=_(new i.Circle({radius:O(.2)})),m=M.getCylinder(.2,.3);new B.e(1,0,0),m.bakeTransformIntoVertices(B.c.RotationX(O(Math.PI))),m.material=p,g.meshes.push(m);const f=e=>{const t=M.getSphere(.2);t.bakeTransformIntoVertices(B.c.Translation(0,0,(O(.5)-O(.2))*(e?-1:1))),t.material=p,g.meshes.push(t)};return f(!0),f(!1),n.addShape(g,[0,O(.7)+.05+O(.2)],0),n},getLegTop:function(e,t,n){const o=new i.Body({mass:.1*.07,position:[e[0]-.2,e[1]+.2]}),a=(O(.2)+O(.15))*(n?-1:1),s=K(t);return o.addShape(E.getBoxAsUprightCylinder({width:.15,height:.4},a,z,s)),o.addShape(E.getCircleAsSphere({radius:O(.15)},a,z,s),[0,-.2],0),o},getLegBottom:function(e,t,n){const o=new i.Body({mass:.009,position:[e[0]-.2,e[1]-.2]}),a=(O(.2)+O(.15))*(n?-1:1),s=K(t),r=q(t),l=Y(t);return o.addShape(E.getBoxAsUprightCylinder({width:.15,height:.4},a,z,s)),o.addShape(E.getBox({width:.3,height:.1},.1,a,z,r),[-.075,-.205]),o.addShape(E.getCircleAsFrontalCylinder({radius:.1},.1,a,z,r),[-.225,-.155]),o.addShape(E.getBox({width:.1,height:.05},.1,a,z,l,{shadows:!1}),[-.175,-.28]),o},getTorso:function(e,t){const n=new i.Body({mass:.05,position:[e[0],e[1]+.9]}),o=Z(t),a=E.getBox({width:.25,height:.5-O(.25)},.5,0,z,o);n.addShape(a,[0,-.0625]);const s=_(new i.Circle({radius:O(.25)})),r=M.getCylinder(.25,.5);r.bakeTransformIntoVertices(B.c.RotationX(O(Math.PI))),r.material=o;const l=M.getCylinder(.125,.625);l.bakeTransformIntoVertices(B.c.RotationX(O(Math.PI))),l.bakeTransformIntoVertices(B.c.Translation(0,O(.25)-O(.125),0)),l.material=o;const c=e=>{const t=M.getSphere(.125);return t.bakeTransformIntoVertices(B.c.Translation(0,O(.25)-O(.125),0)),t.bakeTransformIntoVertices(B.c.Translation(0,0,(O(.5)+O(.125))*(e?-1:1))),t.material=o,t};return s.meshes=[r,l,c(!0),c(!1)],n.addShape(s,[0,O(.5)-O(.25)]),n},getArmTop:function(e,t,n){const o=new i.Body({mass:.1*.025,position:[e[0],e[1]+.5]}),a=(O(.5)+O(.125))*(n?-1:1),s=Z(t);return o.addShape(E.getBoxAsUprightCylinder({width:.125,height:.25},a,z,s)),o},getArmBottom:function(e,t,n){const o=new i.Body({mass:.1*.025,position:[e[0],e[1]+.5]}),a=(O(.5)+O(.125))*(n?-1:1),s=Z(t),r=D(t);return o.addShape(E.getCircleAsSphere({radius:O(.125)},a,z,s),[0,O(.25)]),o.addShape(E.getCircleAsSphere({radius:O(.1125)},a,z,r),[0,-O(.3)]),o.addShape(E.getBoxAsUprightCylinder({width:.125,height:.25},a,z,s)),o},getHead:function(e,t){const n=new i.Body({mass:.1*.07,position:[e[0],e[1]]}),o=D(t),a=q(t),s=new p.a(m(),t);s.diffuseColor=new B.a(1,0,0),s.specularPower=128;const r=new p.a(m(),t);r.diffuseColor=new B.a(0,0,0);const l=_(new i.Circle({radius:j})),c=M.getSphere(W(j));c.material=o,l.meshes.push(c);const h=.375*j,d=M.getSphere(W(h),{shadows:!1});d.material=s,d.bakeTransformIntoVertices(B.c.Translation(-(j+O(h)),0,0)),l.meshes.push(d);const u=e=>{const n=new B.e(-1,.6,.6*(e?-1:1)).normalize(),i=M.getSphere(j,{shadows:!1});N(i,n,.55*j,t),i.material=a,l.meshes.push(i);const s=M.getSphere(O(j),{shadows:!1});N(s,n,.85*j,t),s.material=o,l.meshes.push(s);const c=M.getSphere(.25*j,{shadows:!1});N(c,n,j,t),c.material=r,l.meshes.push(c)};u(!0),u(!1);const g=M.getTorus(j,.075,{shadows:!1});N(g,new B.e(-1,.6,0).normalize(),.3*j,t),g.bakeTransformIntoVertices(B.c.RotationZ(.25*Math.PI)),g.material=q(t),l.meshes.push(g);const f=e=>{const t=.4*j,n=M.getCylinder(W(t),W(t),{shadows:!1});n.material=o,n.bakeTransformIntoVertices(B.c.RotationZ(O(Math.PI))),n.bakeTransformIntoVertices(B.c.RotationY(.125*Math.PI*(e?-1:1))),n.bakeTransformIntoVertices(B.c.Translation(0,0,.6*j*(e?-1:1))),l.meshes.push(n)};f(!0),f(!1),n.addShape(l);const w=2*H,y=E.getBoxAsUprightCylinder({width:G,height:w},0,z,o);return n.addShape(y,[0,-(j+O(H))]),n},getHat:function(e,t){const n=new i.Body({mass:.001,position:[e[0],e[1]]}),o=(e=>y.getMaterial(T.VelvetGreen,1,1,.25,e))(t),a=E.getBoxAsUprightCylinder({width:W(X),height:F},0,z,o);n.addShape(a);const s=E.getBoxAsUprightCylinder({width:W(U),height:.01},0,z,o);return n.addShape(s,[0,-(O(F)+O(.01))]),n},getShaftTorsoConstraint:function(e,t){const n=new i.RevoluteConstraint(e,t,{localPivotA:[0,O(.7)+.05+O(.2)],localPivotB:[0,-O(.5)+.5/8]});return n.upperLimitEnabled=!0,n.upperLimit=.05*Math.PI,n.lowerLimitEnabled=!0,n.lowerLimit=-.05*Math.PI,n},getShaftWheelConstraint:function(e,t){const n=new i.RevoluteConstraint(e,t,{localPivotA:[0,-O(.7)],localPivotB:[0,0]});return n.enableMotor(),n.setMotorSpeed(0),n},getLegSectionsConstraint:function(e,t){const n=new i.RevoluteConstraint(e,t,{localPivotA:[0,-O(.4)],localPivotB:[0,O(.4)]});return n.lowerLimitEnabled=!0,n.lowerLimit=.2*Math.PI,n},getLegTopShaftConstraint:function(e,t){return new i.RevoluteConstraint(e,t,{localPivotA:[0,O(.4)],localPivotB:[0,O(.7)+.05+O(.2)]})},getLegBottomWheelConstraint:function(e,t,n){return new i.RevoluteConstraint(e,t,{localPivotA:[-.175,-.28],localPivotB:[.12*(n?-1:1),0]})},getArmSectionsConstraint:function(e,t){const n=new i.RevoluteConstraint(e,t,{localPivotA:[0,O(.25)],localPivotB:[0,-O(.25)]});return n.upperLimitEnabled=!0,n.upperLimit=.7*Math.PI,n.lowerLimitEnabled=!0,n.lowerLimit=.12*Math.PI,n},getTorsoArmTopConstraint:function(e,t){const n=new i.RevoluteConstraint(e,t,{localPivotA:[0,O(.5)-O(.125)],localPivotB:[0,O(.25)]});return n.upperLimitEnabled=!0,n.upperLimit=.2*Math.PI,n.lowerLimitEnabled=!0,n.lowerLimit=-.3*Math.PI,n},getHeadTorsoConstraint:function(e,t){const n=new i.RevoluteConstraint(e,t,{localPivotA:[0,O(.5)-O(.125)],localPivotB:[0,-(j+H)]});return n.upperLimitEnabled=!0,n.upperLimit=.05*Math.PI,n.lowerLimitEnabled=!0,n.lowerLimit=-.05*Math.PI,n},getHeadHatConstraint:function(e,t){return new i.LockConstraint(e,t,{localOffsetB:[0,.75*j+(O(F)+.01)]})}};const Q=Math.PI/32,$=Math.PI/8,ee=Math.PI/2;class te{constructor(e,t,n){this.direction=null,this.lastActiveTime=0,this.wheelOnTerrain=!1,this.torsoOnTerrain=!1,this.positionHistory=[],this.world=e,this.scene=t;for(let e=1;e<=30;e++)this.positionHistory.push([n[0],n[1]]);const o=this.wheel=J.getWheel(n,t),a=this.shaft=J.getShaft(n,t),i=this.torso=J.getTorso(n,t);this.shaftWheelConstraint=J.getShaftWheelConstraint(a,o),this.shaftTorsoConstraint=J.getShaftTorsoConstraint(a,i),e.addBody(o),e.addBody(a),e.addBody(i),e.addConstraint(this.shaftWheelConstraint),e.addConstraint(this.shaftTorsoConstraint);const s=i=>{const s=J.getLegTop(n,t,i),r=J.getLegBottom(n,t,i);e.addBody(s),e.addBody(r),e.addConstraint(J.getLegSectionsConstraint(s,r)),e.addConstraint(J.getLegTopShaftConstraint(s,a)),e.addConstraint(J.getLegBottomWheelConstraint(r,o,i))};s(!0),s(!1);const r=o=>{const a=J.getArmTop(n,t,o),s=J.getArmBottom(n,t,o);e.addBody(a),e.addBody(s),e.addConstraint(J.getArmSectionsConstraint(s,a)),e.addConstraint(J.getTorsoArmTopConstraint(i,a))};r(!0),r(!1);const l=J.getHead(n,t),c=J.getHat(n,t);e.addBody(l),e.addBody(c),e.addConstraint(J.getHeadTorsoConstraint(i,l)),e.addConstraint(J.getHeadHatConstraint(l,c)),this.addWorldHandlers()}addWorldHandlers(){this.world.on("beginContact",e=>{te.isBodyTerrainContact(this.wheel,e)?this.wheelOnTerrain=!0:te.isBodyTerrainContact(this.torso,e)&&(this.torsoOnTerrain=!0)}),this.world.on("endContact",e=>{te.isBodyTerrainContact(this.wheel,e)?this.wheelOnTerrain=!1:te.isBodyTerrainContact(this.torso,e)&&(this.torsoOnTerrain=!1)})}static isBodyTerrainContact(e,t){const n=t.bodyA,o=n.shapes[0].material,a=t.bodyB,i=a.shapes[0].material;return n===e&&i===c.Terrain||a===e&&o===c.Terrain}handlePostWorldStep(e){const t=this.direction;let n=this.shaft.angle%(2*Math.PI);n<-Math.PI?n=2*Math.PI+n:n>Math.PI&&(n=-(2*Math.PI-n));const o=.0375*e,a=Math.abs(n)<Q,i=Math.abs(n)<$,s=Math.abs(n)>ee&&Math.abs(n)<.75*Math.PI,r=performance.now();null!==t&&(this.lastActiveTime=r);const l=r-this.lastActiveTime;if(this.wheelOnTerrain){if(!s){const e=this.shaftWheelConstraint.getMotorSpeed();let n=0;n=t===V.Left?Math.max(e-o,-8):t===V.Right?Math.min(e+o,8):0,this.shaftWheelConstraint.setMotorSpeed(n)}a?null!==t&&this.torso.applyForce([.05*(t===V.Left?-1:1),0],this.torso.position):s?this.torsoOnTerrain&&null!==t&&(this.shaft.angularForce=30*(n>0?-1:1)):i&&l<1e3&&(this.shaft.angularForce=4*(n>0?-1:1))}this.positionHistory.length>30&&this.positionHistory.splice(0,1),this.positionHistory.push([this.wheel.position[0],this.wheel.position[1]])}}var ne={updateMeshes:function(e){const t=e.bodies;for(let e=0;e<t.length;e++){const n=t[e],o=n.shapes;for(let e=0;e<o.length;e++){const t=o[e],a=t.meshes;if(a){const e=i.vec2.create();i.vec2.rotate(e,t.position,n.angle);const o=i.vec2.create();i.vec2.add(o,n.position,e);for(let e=0;e<a.length;e++){const i=a[e];i.position.x=o[0],i.position.y=o[1];const s=new B.e(0,0,1);i.rotationQuaternion=B.d.RotationAxis(s,n.angle+t.angle)}}}}}};class oe{displayLoadingUI(){}hideLoadingUI(){document.getElementById("loading").style.display="none"}}var ae=n(185),ie=n(16),se=n(26),re=n(75),le=n(123);const ce=document.getElementById("viewport");new class{constructor(e){this.lastAnimateTime=performance.now(),this.obliqueView=!0,this.active=!0,this.canvas=e,this.setCanvasSize(),this.world=new i.World,this.world.addContactMaterial(h);const t=new ie.a(e);t.loadingScreen=new oe,t.displayLoadingUI();const n=this.scene=new se.a(t);n.clearColor=new B.b(0,0,0,1),this.camera=new ae.a(m(),re.e.Zero(),n),y.loadAssets(n).then(()=>{this.addInputHandlers(),t.loadingScreen.hideLoadingUI(),this.start()})}start(){this.terrain=new R(this.world,this.scene),this.player=new te(this.world,this.scene,[0,15.37]),this.terrain.handlePreWorldStart(),this.canvas.focus(),this.lastAnimateTime=performance.now(),this.animate(performance.now())}animate(e){if(requestAnimationFrame(this.animate.bind(this)),this.active){let t=e-(this.lastAnimateTime||e);t>500&&(t=0),this.lastAnimateTime=e,this.world.step(1/60,t/1e3,10);const n=t/(1e3/60);this.player.handlePostWorldStep(n),this.terrain.handlePostWorldStep(n,this.player.positionHistory),ne.updateMeshes(this.world)}const t=this.camera,n=this.player.wheel.position;this.obliqueView?(t.position.x=n[0]-4,t.position.y=n[1]+2,t.position.z=-4):(t.position.x=n[0],t.position.y=n[1],t.position.z=-8),t.setTarget(new re.e(n[0],n[1],0)),this.scene.render()}setCanvasSize(){const e=this.canvas;e.style.width=window.innerWidth+"px",e.style.height=window.innerHeight+"px"}addInputHandlers(){this.scene.onKeyboardObservable.add(e=>{switch(e.type){case le.a.KEYDOWN:switch(e.event.key){case"ArrowLeft":this.player.direction=V.Left;break;case"ArrowRight":this.player.direction=V.Right}break;case le.a.KEYUP:switch(e.event.key){case"ArrowLeft":case"ArrowRight":this.player.direction=null}}}),this.scene.onPointerObservable.add(e=>{switch(e.type){case le.b.POINTERDOWN:e.event.offsetX<=this.canvas.width/2?this.player.direction=V.Left:this.player.direction=V.Right;break;case le.b.POINTERUP:this.player.direction=null}}),document.getElementById("info-open-button").addEventListener("click",e=>this.handleOpenInfo()),document.getElementById("info-close-button").addEventListener("click",e=>this.handleCloseInfo()),document.getElementById("view-mode-oblique").addEventListener("change",e=>this.handleViewModeChange(e.target.checked)),document.getElementById("view-mode-side").addEventListener("change",e=>this.handleViewModeChange(!e.target.checked))}handleOpenInfo(){document.getElementById("info-panel").style.display="block",document.getElementById("info-open-button").style.display="none",this.active=!1}handleCloseInfo(){document.getElementById("info-open-button").style.display="flex",document.getElementById("info-panel").style.display="none",window.setTimeout(()=>{this.active=!0},500)}handleViewModeChange(e){this.obliqueView=e}}(ce)},27:function(e,t){e.exports=p2}});