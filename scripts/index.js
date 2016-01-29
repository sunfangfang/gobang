window.onload=function(){
	var ROW=15,
		chessboard=document.getElementById('sence'),
		bg=document.getElementById('bg'),
		wide=(560-ROW)/ROW+'px',
		x1,x2;
	for(var i=0;i<ROW;i++){
		x1=document.createElement('div');
		x1.style.position='absolute';
		x1.style.top=Math.floor((560/ROW)/2+(560/ROW)*i)+'px';
		x1.style.width='560px';
		x1.style.height='1px';
		x1.style.background='white';
		sence.appendChild(x1);
		x2=document.createElement('div');
		x2.style.position='absolute';
		x2.style.left=Math.floor((560/ROW)/2+(560/ROW)*i)+'px';
		x2.style.width='1px';
		x2.style.height='560px';
		x2.style.background='white';
		sence.appendChild(x2);
	} 
	
	for(var i=0;i<ROW;i++){
		for(var j=0;j<ROW;j++){
			var chess=document.createElement('div');
			chess.setAttribute('class','block');
			chess.setAttribute('id',i+'_'+j);
			chess.style.width=wide;
			chess.style.height=wide;
			chessboard.appendChild(chess);	
		}
	}
	var blocks=document.getElementsByClassName('block');
	var OnOff=true;
	var dict1={};
	var dict2={};
	var judge=function(id,dict){
		var x=Number(id.split('_')[0]);
		var y=Number(id.split('_')[1]);
		var tx,ty;

		var zx=1;
		tx=x;ty=y;
		while(dict[(tx-1)+'_'+(ty+1)]){
			zx++;tx--;ty++;
		}
		tx=x;ty=y;
		while(dict[(tx+1)+'_'+(ty-1)]){
			zx++;tx++;ty--;
		}
		if(zx==5) return true;

		var yx=1;
		tx=x;ty=y;
		while(dict[(tx-1)+'_'+(ty-1)]){
			yx++;tx--;ty--;
		}
		tx=x;ty=y;
		while(dict[(tx+1)+'_'+(ty+1)]){
			yx++;tx++;ty++;
		}
		if(yx==5) return true;

		var hang=1;
		tx=x;ty=y;
		while(dict[tx+'_'+(ty+1)]){
			hang++;ty++;
		}
		tx=x;ty=y;
		while(dict[tx+'_'+(ty-1)]){
			hang++;ty--;
		}
		if(hang==5) return true;

		var lie=1;
		tx=x;ty=y;
		while(dict[(tx-1)+'_'+ty]){
			lie++;tx--;
		}
		tx=x;ty=y;
		while(dict[(tx+1)+'_'+ty]){
			lie++;tx++;
		}
		if(lie==5) return true;
		return false;
	}
	for(var i=0;i<blocks.length;i++){
		blocks[i].onclick=function(){
			if(this.hasAttribute('aa')){return;}
			var id=this.getAttribute('id');
			if(OnOff){
				this.style.background='url(./images/white.png) no-repeat';
				this.style.backgroundSize='100% 100%';
				this.style.boxShadow='0 2px 13px black';
				OnOff=false;
				dict1[id]=true;
				if(judge(id,dict1)){
					alert('white is winner!')
				}
			}else{
				this.style.background='url(./images/black.png) no-repeat';
				this.style.backgroundSize='100% 100%';
				this.style.boxShadow='0 2px 13px black';
				OnOff=true;
				dict2[id]=true;
				if(judge(id,dict2)){
					alert('black is winner!')
				}
			}	
			this.setAttribute('aa','true');
		};
	}
}