/*
 * jQuery KeyNav 1.2
 *
 */
(function ($) {
    $.keynav = new Object();
    $.keynav.blockNavi = false ;  
  
    var exeption = [
    {
        'id' : '', 
        'left' : '', 
        'right' : '', 
        'up' : 17, 
        'down' : 22
    },

    {
        'id' : '', 
        'left' : '', 
        'right' : '', 
        'up' : 17, 
        'down' : 22
    }
    ];
  
  
    $.fn.keynav = function (onClass,offClass) {
        //Initialization
        var kn = $.keynav;
        if(!kn.init) {
            kn.el = new Array();

            $(document).keydown(function(e) {
                key = event.keyCode;

                if(player.playing && player.toolbar.className == 'hide') {
                    player.showToolBar(true);
                    return false;
                } else if(player.playing) {
                    player.showToolBar(true);
                }

                if (!$.keynav.blockNavi){
        
                    var cur = $.keynav.getCurrent();

                    switch(key) {

                        case Keys.KEY_LEFT:
                        case Keys.PHILIPS_LEFT:
                        case Keys.SAMSUNG_LEFT:
                        case Keys.PANASONIC_LEFT:
                        case 37:
                            var nav = isSetNavCSS(cur.id, 'left');
                            if(nav != null){
                                var idDiv = document.getElementById(nav); 
                               
                                if ( idDiv != undefined && idDiv != null  ) {                                              
                                    $.keynav.goToEl(nav);
                                              
                                }else{
                                    $.keynav.goLeft();
                                            
                                }
                            }else{
                                $.keynav.goLeft();
                            }
                            break;
                  
                        case Keys.KEY_UP:
                        case Keys.PHILIPS_UP:
                        case Keys.SAMSUNG_UP:
                        case Keys.PANASONIC_UP:
                        case 38:

                            var nav = null;
                            var item = $('#'+cur.id);

                            // cas spécial de la fiche film (vignettes de suggestion)
                            if(item.hasClass('vignette_suggestion')) {
                                nav = $('.btn_fiche:visible').attr('id');
                            }

                            // cas spécial sous-menu playlist SVOD2D
                            if(cur.id == 'menu_svod2d_playlist') {
                                $('.action_playlist').css({display: 'none'});
                                resetKeynav('menu_svod2d_top');
                                break;
                            }

                            if(nav == null) {
                                nav = isSetNavCSS(cur.id, 'up');
                            }

                            if(nav != null){
                                var idDiv = document.getElementById(nav ); 
                                if ( idDiv != undefined && idDiv != null  ) {
                                    $.keynav.goToEl(nav);
                                }else{
                                    $.keynav.goUp();
                                }
                            }else{
                                $.keynav.goUp();
                            }
                        
                            break;
                  
                        case Keys.KEY_RIGHT:
                        case Keys.PHILIPS_RIGHT:
                        case Keys.SAMSUNG_RIGHT:
                        case Keys.PANASONIC_RIGHT:
                        case 39:
                            var nav = null;

                            // cas spécial de la page de recherche
                            if(cur.id == 'input_recherche' || cur.id == 'key_lancer_recherche') {
                                nav = $('.lien_resultat').eq(0).attr('id');
                            }

                            if(nav == null) {
                                nav = isSetNavCSS(cur.id, 'right');
                            }

                            if(nav != null){
                                var idDiv = document.getElementById(nav ); 
                                if ( idDiv != undefined && idDiv != null  ) {
                                    $.keynav.goToEl(nav);
                                }else{
                                    $.keynav.goRight();
                                }
                            }else{
                                $.keynav.goRight();
                            }
                            break;
                  
                        case Keys.KEY_DOWN:
                        case Keys.PHILIPS_DOWN:
                        case Keys.SAMSUNG_DOWN: 
                        case Keys.PANASONIC_DOWN:
                        case 40:

                            var nav = null;
                            var item = $('#'+cur.id);

                            // cas spécial de la navigation TVOD
                            if(item.hasClass('lien_menu_tvod')) {
                                // cas où on est sur un lien principal
                                if($('.lien_submenu:visible').length) {
                                    nav = $('.lien_submenu:visible').eq(0).attr('id');
                                } else if($('.lien_vignette:visible').length) {
                                    nav = $('.lien_vignette:visible').eq(0).attr('id');
                                }
                            }
                            if(item.hasClass('lien_submenu') && $('.lien_vignette:visible').length) {
                                // cas où on est sur un lien de sous-menu
                                nav = $('.lien_vignette:visible').eq(0).attr('id');
                            }

                            // cas spécial de la fiche film (boutons du haut)
                            if(cur.id == 'btn_voir_louer' || cur.id == 'btn_addDel_favoris' || cur.id == 'btn_casting') {
                                nav = $('.btn_fiche:visible').attr('id');
                            }

                            // cas spécial sous-menu playlist SVOD2D
                            if(cur.id == 'menu_svod2d_supp_playlist') {
                                $('.action_playlist').css({display: 'none'});
                                resetKeynav('menu_svod2d_aleatoire');
                                break;
                            }

                            if(nav == null) {
                                nav = isSetNavCSS(cur.id, 'down');
                            }

                            if(nav != null){
                                var idDiv = document.getElementById(nav); 
                                if ( idDiv != undefined && idDiv != null ) {
                                    $.keynav.goToEl(nav);
                                    break;
                                }else{
                                    $.keynav.goDown();
                                }
                            }else{
                                $.keynav.goDown();
                            }
                            break;
                  
                        case Keys.KEY_ENTER:
                        case Keys.PHILIPS_ENTER:
                        case Keys.SAMSUNG_ENTER:
                        case Keys.PANASONIC_ENTER:  
                        case 13:
                            $.keynav.activate();
                            break;
                    }
                }else{
                }
            });
            kn.init = true;
        }

        return this.each(function() {
            $.keynav.reg(this,onClass,offClass);
        });
    }
    $.fn.keynav_sethover = function(onClass,offClass) {
        return this.each(function() {
            this.onClass = onClass;
            this.offClass = offClass;
        });
    }

    $.keynav.reset = function() {
        var kn = $.keynav;
        kn.el = new Array();
    }
  
    $.keynav.unFocusLast = function() {
        var kn = $.keynav;
        var cur = $.keynav.getCurrent();
        $(cur).removeClass(cur.onClass).addClass(cur.offClass);
    }

    $.keynav.reg = function(e,onClass,offClass) {
        var kn = $.keynav;
        e.pos = $.keynav.getPos(e);
        e.onClass = onClass;
        e.offClass = offClass;
        e.onmouseover = function (e) {
            $.keynav.setActive(this);
        };
        kn.el.push(e);
    }
    $.keynav.setActive = function(e) {
        var kn = $.keynav;
        var cur = $.keynav.getCurrent();
        $(cur).trigger('blur');
        for(var i=0;i<kn.el.length;i++) {
            var tmp = kn.el[i];
            $(tmp).removeClass(tmp.onClass).addClass(tmp.offClass);
        }
        $(e).removeClass(e.offClass).addClass(e.onClass);

        $(e).trigger('focus');
        kn.currentEl = e;
        return false;
    }

    $.keynav.getCurrent = function () {
        var kn = $.keynav;
        if(kn.currentEl) {
            var cur = kn.currentEl;
        }
        else {
            var cur = kn.el[0];
        }
        return cur;
    }
    $.keynav.quad = function(cur,fQuad) {
        var kn = $.keynav;
        var quad = Array();
        for(i=0;i<kn.el.length;i++) {
            var el = kn.el[i];
            if(cur == el) continue;
            if(fQuad((cur.pos.cx - el.pos.cx),(cur.pos.cy - el.pos.cy)))
                quad.push(el);
        }
        return quad;
    }
    $.keynav.activateClosest = function(cur,quad) {
        var closest;
        var od = 1000000;
        var nd = 0;
        var found = false;
        for(i=0;i<quad.length;i++) {
            var e = quad[i];
            nd = Math.sqrt(Math.pow(cur.pos.cx-e.pos.cx,2)+Math.pow(cur.pos.cy-e.pos.cy,2));
            if(nd < od) {
                closest = e;
                od = nd;
                found = true;
            }
        }
        if(found)
            $.keynav.setActive(closest);
    }
  
  
 
    $.keynav.goLeft = function () {
        var cur = $.keynav.getCurrent();
        var quad = $.keynav.quad(cur,function (dx,dy) { 
            if((dy >= 0) && (Math.abs(dx) - dy) <= 0)
                return true;    
            else
                return false;
        });
        $.keynav.activateClosest(cur,quad);
    }
    $.keynav.goRight = function () {
        var cur = $.keynav.getCurrent();
        var quad = $.keynav.quad(cur,function (dx,dy) { 
            if((dy <= 0) && (Math.abs(dx) + dy) <= 0)
                return true;    
            else
                return false;
        });
        $.keynav.activateClosest(cur,quad);
    }

    $.keynav.goUp = function () {
        var cur = $.keynav.getCurrent();
        var quad = $.keynav.quad(cur,function (dx,dy) { 
            if((dx >= 0) && (Math.abs(dy) - dx) <= 0)
                return true;    
            else
                return false;
        });
        $.keynav.activateClosest(cur,quad);
    }

    $.keynav.goDown = function () {
        var cur = $.keynav.getCurrent();
        var quad = $.keynav.quad(cur,function (dx,dy) { 
            if((dx <= 0) && (Math.abs(dy) + dx) <= 0)
                return true;    
            else
                return false;
        });
        $.keynav.activateClosest(cur,quad);
    }
  
    $.keynav.goToEl = function (idToFocus) {
        var Div = document.getElementById(idToFocus);

        if ( Div != undefined && Div != null  ) {
            var kn = $.keynav;

            for(i=0;i<kn.el.length;i++) {
                var el = kn.el[i];
                var ID = el.id;

                if(idToFocus == ID){
                    var elToFocus = el;
                }
            }

            $.keynav.setActive(elToFocus);
        }else{
        }
    }
  
  
    $.keynav.activate = function () {
        var kn = $.keynav;
        $(kn.currentEl).trigger('click');
    }

    /**
   * This function was taken from Stefan's exellent interface plugin
   * http://www.eyecon.ro/interface/
   * 
   * I included it in this library's namespace because the functions aren't
   * quite the same.
   */
    $.keynav.getPos = function (e)
    {
        var l = 0;
        var t  = 0;
        var w = $.intval($.css(e,'width'));
        var h = $.intval($.css(e,'height'));
        while (e.offsetParent){
            l += e.offsetLeft + (e.currentStyle?$.intval(e.currentStyle.borderLeftWidth):0);
            t += e.offsetTop  + (e.currentStyle?$.intval(e.currentStyle.borderTopWidth):0);
            e = e.offsetParent;
        
        }
        l += e.offsetLeft + (e.currentStyle?$.intval(e.currentStyle.borderLeftWidth):0);
        t += e.offsetTop  + (e.currentStyle?$.intval(e.currentStyle.borderTopWidth):0);
        var cx = Math.round(t+(h/2));
        var cy = Math.round(l+(w/2));
        return {
            x:l, 
            y:t, 
            w:w, 
            h:h, 
            cx:cx, 
            cy:cy
        };
    };

    /**
   * This function was taken from Stefan's exellent interface plugin
   * http://www.eyecon.ro/interface/
   */
    $.intval = function (v)
    {
        v = parseInt(v);
        return isNaN(v) ? 0 : v;
    };
})(jQuery);

function isSetNavCSS(id_selector,Move){
    var elt = null;

    for(var j = 0; j < document.styleSheets.length; j++) {
        var ss = document.styleSheets[j];

        // Get the rules array using W3C or IE API
        var rules = ss.cssRules?ss.cssRules:ss.rules;
        // Iterate through those rules
        for(var i = 0; i < rules.length; i++) {
            var rule = rules[i];

            if(rule.selectorText.substr(1) == id_selector ){
                var cssText = rule.cssText;

                switch (Move){
                    case 'up' :
                        elt = parseStyle("nav-up:(.*?);", rule.style.cssText+';');
                        break;
                    
                    case 'down' :
                        elt = parseStyle("nav-down:(.*?);", rule.style.cssText+';');
                        break;
                    
                    case 'left' :
                        elt = parseStyle("nav-left:(.*?);", rule.style.cssText+';');
                        break;
                    
                    case 'right' :
                        elt =  parseStyle("nav-right:(.*?);", rule.style.cssText+';');
                        break;
                }

                if(elt != null) {
                    return elt;
                }
            }              
        }
            
    }
    return elt;
    
}

function parseStyle(a,d){
    var b=RegExp(a).exec(d);
    if(b!=null){
        return( (b=b[1])?b.replace(/ /g,""):b)
    }else return b;
}

function resetKeynav(focus, active_nav) {
    if(!$('.'+active_nav+':visible').length) {
        active_nav = 'navigable';
    }

    var link_visible = $('.'+active_nav+':visible');

    $.keynav.reset();
    link_visible.keynav('focused', '');

    if(!$('#'+focus).length) {
        focus = link_visible.eq(0).attr('id');
    }

    $.keynav.goToEl(focus);
}