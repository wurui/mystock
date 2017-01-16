define(['oxjs'],function(OX){
  return {
    init:function($mod){
        var lastFocusNode,cls='selected';
        var qs = $mod.attr('data-qs'),
            param = {},
            checkSelect = function () {
                if (lastFocusNode)lastFocusNode.removeClass(cls);
                var symbol=OX.queryString(qs);//console.log(symbol)
                if(symbol) {
                    lastFocusNode=$mod.find('tr[data-href="'+symbol+'"]').addClass(cls);
                }
            };
        $mod.on('tap', '[data-href]', function (e) {
            e.preventDefault();
            param[qs] = this.getAttribute('data-href');

            OX.changeState(param)

        });

        OX.onstatechanged(checkSelect);

        checkSelect();
        var symbols=[],
            attrName='data-symbol',
            nodeCache={};
            symbolNodes=$('['+attrName+']').each(function(){
                var symbol=$.trim(this.getAttribute(attrName)).toUpperCase();
                symbols.push(symbol)
                nodeCache[symbol]=$(this);

            });


        if(symbols.length) {
            OX.getJSON('http://momofox.com:8000/analyze/querymaybelow?marketcap=8e10&historicalLimit=250', {symbols: symbols.join(',')}, function (r) {
                //console.log(r);
                if (r && r.length) {
                    var obj = {};
                    for (var i = 0, n; n = r[i++];) {
                        obj[n.symbol] = n;
                        var $el = nodeCache[n.symbol];
                        $el.find('.J_close').html(n.close);
                        $el.find('.J_med').html(n.med);
                        var percent = (n.close - n.med) / n.med * 100;
                        if (percent > 0) {
                            percent = '<em class="percent positive">+' + percent.toFixed(2) + '%</em>'
                        } else {
                            percent = '<em class="percent negative">' + percent.toFixed(2) + '%</em>'
                        }

                        $el.find('.J_percent').html(percent);
                    }
                }
            })
        }
    }
  }
})
