 function getElementsByClassName(_className, _startElem, _filterTag)
    {
        if (typeof _className === 'string')
        { _className = new RegExp('(^| )' + _className + '( |$)'); }
        _startElem = _startElem || document;
        _filterTag = _filterTag || '*';
        var arr = [];
        var tags;
        if (typeof _startElem.all != 'undefined' && _filterTag == '*')
        {
            tags = _startElem.all;
        }
        else
        {
            tags = _startElem.getElementsByTagName(_filterTag);
        }
        var i, len = tags.length;
        for (i = 0; i < len; i++)
        {
            var elem = tags[i];
            if (_className.test(elem.className))
            { arr.push(elem); }
        }
        return arr;
    }
    function xM(ev) {
        if (ev.pageX) return ev.pageX;
        else if (ev.clientX)
            return ev.clientX + (document.documentElement.scrollLeft ?
                    document.documentElement.scrollLeft :
                    document.body.scrollLeft);
        else return null;
    }
    function yM(ev) {
        if (ev.pageY) return ev.pageY;
        else if (ev.clientY)
            return ev.clientY + (document.documentElement.scrollTop ?
                    document.documentElement.scrollTop :
                    document.body.scrollTop);
        else return null;
    }
    function findPos(obj)
    {
        var objnew = obj;
        var cury = 0;
        var curx = 0;
        if (document.getElementById || document.all)
        {
            do  {
                curx += obj.offsetLeft-obj.scrollLeft;
                cury += obj.offsetTop-obj.scrollTop;
                obj = obj.offsetParent;
                objnew = objnew.parentNode;
                while (objnew!=obj)
                {
                    curx -= objnew.scrollLeft;
                    cury -= objnew.scrollTop;
                    objnew = objnew.parentNode;
                }
            } while (obj.offsetParent)
        }
        else if (document.layers)
        {
            cury += obj.y;
            curx += obj.x;
        }
        return curx+","+cury;
    }
    function doEvents()
    {
        boxs=getElementsByClassName("box");
        imgs=getElementsByClassName("imgp");
        lis=getElementsByClassName("c");
        xs=getElementsByClassName("xx");
        lws=getElementsByClassName("lw");
        lwinfos=getElementsByClassName("lwinfo");
        zms=getElementsByClassName("zm");
        for(var i=0;i<imgs.length;i++)
        {(function(index)
        {imgs[index].onmouseover=function()
        {
            bigimage=this;
            m=index;
            this.className='big';
            if(lis.length>0){
                sidelist=lis[index];
                lis[index].className='side';
            }
            xs[index].style.display='block';
            zms[index].style.display='none';

            document.onmousemove=function(e)
            {
                e=e||window.event;
                pos=findPos(boxs[m]).split(",");
                x = xM(e);
                y = yM(e);
                if(x<parseInt(pos[0]) || x>parseInt(pos[0])+430 || y<parseInt(pos[1]) || y>parseInt(pos[1])+220)
                {
                    if (typeof bigimage !== 'undefined')
                        bigimage.className='imgp shadow';

                    if (typeof sidelist !== 'undefined')
                        sidelist.className='c';
                    xs[m].style.display='none';
                    zms[m].style.display='none';
                }else{
                    if(bigimage.className!='big')
                        zms[m].style.display='block';
                }


            }
        }
            xs[index].onclick=function()
            {
                bigimage.className='imgp shadow';
                sidelist.className='c';
                xs[index].style.display='none';
                zms[index].style.display='block';
            }
        }
                )(i);
        }
        for(var k=0;k<lws.length;k++)
        {(function(index)
        {
            lws[index].onmouseover=function()
            {
                lwinfos[index].style.display='block';
            }
            lws[index].onmouseout=function(){

                lwinfos[index].style.display='none';
            }
        })(k);
        }
    }
    doEvents();
    
      