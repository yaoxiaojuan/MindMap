"use strict";var getRandomNum=function(e){return Math.ceil(Math.random()*e)},getRandomStr=function(){return Math.random().toString(36).substr(2)},getNodeDom=function(e,t){return'<span class="'+t+'">'+e.text+"</span>"},getChildDom=function e(t){if(0===t.length)return"";var n='<ul class="tree-child-tree">';return t.map(function(t){var r=t.children.length,c=0===r?"tree-node":"tree-switcher tree-switcher_close tree-node";return n+="<li>",n+=getNodeDom(t.data,c),n+=0===r?"</li>":e(t.children),null}),n+="</ul>"},getTreeData=function(){return{root:{data:{id:getRandomStr(),text:"根节点"},children:function e(t,n){for(var r=[],c=0;c<t&&n>0;c+=1){var o={data:{id:getRandomStr(),text:getRandomStr()},children:[]};n>0&&(o.children=e(getRandomNum(3),n-1)),r.push(o)}return r}(getRandomNum(3),getRandomNum(10))}}};window.addEventListener("load",function(){var e,t,n,r=function(e){document.getElementById("tree").innerHTML=getNodeDom(e.root.data,"tree-switcher tree-switcher_close tree-node")+getChildDom(e.root.children),document.querySelectorAll(".tree-switcher").forEach(function(e){e.addEventListener("click",function(){e.classList.toggle("tree-switcher_close"),e.classList.toggle("tree-switcher_open"),e.nextElementSibling.classList.toggle("hidden")})})};r(getTreeData()),document.getElementById("random").addEventListener("click",function(){r(getTreeData())}),document.getElementById("open").addEventListener("click",function(){document.querySelectorAll(".tree-switcher").forEach(function(e){e.classList.remove("tree-switcher_open"),e.classList.add("tree-switcher_close"),e.nextElementSibling.classList.remove("hidden")})}),document.getElementById("close").addEventListener("click",function(){document.querySelectorAll(".tree-switcher").forEach(function(e){e.classList.add("tree-switcher_open"),e.classList.remove("tree-switcher_close"),e.nextElementSibling.classList.add("hidden")})}),e=document.querySelectorAll("#types .selector__option"),t=document.querySelector("#types .selector__btn"),n=document.getElementById("tree"),e.forEach(function(e){e.classList.contains("disabled")||e.addEventListener("click",function(){t.innerHTML=e.innerHTML,n.className=e.getAttribute("value")})})});