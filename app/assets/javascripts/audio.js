// (function(audiojs, audiojsInstance, container) {
//   var path = (function() {
//     var re = new RegExp('audio(\.min)?\.js.*'),
//         scripts = document.getElementsByTagName('script');
//     for (var i = 0, ii = scripts.length; i < ii; i++) {
//       var path = scripts[i].getAttribute('src');
//       if(re.test(path)) return path.replace(re, '');
//     }
//   })();
//   container[audiojs] = {
//     instanceCount: 0,
//     instances: {},
//     flashSource: '\
//     <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="$1" width="1" height="1" name="$1" style="position: absolute; left: -1px;"> \
//       <param name="movie" value="$2?playerInstance='+audiojs+'.instances[\'$1\']&datetime=$3"> \
//       <param name="allowscriptaccess" value="always"> \
//       <embed name="$1" src="$2?playerInstance='+audiojs+'.instances[\'$1\']&datetime=$3" width="1" height="1" allowscriptaccess="always"> \
//     </object>',
//     settings: {
//       autoplay: false,
//       loop: false,
//       preload: true,
//       imageLocation: path + 'player-graphics.gif',
//       swfLocation: path + 'audiojs.swf',
//       useFlash: (function() {
//         var a = document.createElement('audio');
//         return !(a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''));
//       })(),
//       hasFlash: (function() {
//         if (navigator.plugins && navigator.plugins.length && navigator.plugins['Shockwave Flash']) {
//           return true;
//         } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
//           var mimeType = navigator.mimeTypes['application/x-shockwave-flash'];
//           return mimeType && mimeType.enabledPlugin;
//         } else {
//           try {
//             var ax = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
//             return true;
//           } catch (e) {}
//         }
//         return false;
//       })(),
//       createPlayer: {
//         markup: '\
//           <div class="play-pause"> \
//             <p class="play"></p> \
//             <p class="pause"></p> \
//             <p class="loading"></p> \
//             <p class="error"></p> \
//           </div> \
//           <div class="scrubber"> \
//             <div class="progress"></div> \
//             <div class="loaded"></div> \
//           </div> \
//           <div class="time"> \
//             <em class="played">00:00</em>/<strong class="duration">00:00</strong> \
//           </div> \
//           <div class="error-message"></div>',
//         playPauseClass: 'play-pause',
//         scrubberClass: 'scrubber',
//         progressClass: 'progress',
//         loaderClass: 'loaded',
//         timeClass: 'time',
//         durationClass: 'duration',
//         playedClass: 'played',
//         errorMessageClass: 'error-message',
//         playingClass: 'playing',
//         loadingClass: 'loading',
//         errorClass: 'error'
//       },

//       css: '\
//         .audiojs audio { position: absolute; left: -1px; } \
//         .audiojs { width: 460px; height: 36px; background: #404040; overflow: hidden; font-family: monospace; font-size: 12px; \
//           background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #444), color-stop(0.5, #555), color-stop(0.51, #444), color-stop(1, #444)); \
//           background-image: -moz-linear-gradient(center top, #444 0%, #555 50%, #444 51%, #444 100%); \
//           -webkit-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); -moz-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); \
//           -o-box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3); } \
//         .audiojs .play-pause { width: 25px; height: 40px; padding: 4px 6px; margin: 0px; float: left; overflow: hidden; border-right: 1px solid #000; } \
//         .audiojs p { display: none; width: 25px; height: 40px; margin: 0px; cursor: pointer; } \
//         .audiojs .play { display: block; } \
//         .audiojs .scrubber { position: relative; float: left; width: 280px; background: #5a5a5a; height: 14px; margin: 10px; border-top: 1px solid #3f3f3f; border-left: 0px; border-bottom: 0px; overflow: hidden; } \
//         .audiojs .progress { position: absolute; top: 0px; left: 0px; height: 14px; width: 0px; background: #ccc; z-index: 1; \
//           background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #ccc), color-stop(0.5, #ddd), color-stop(0.51, #ccc), color-stop(1, #ccc)); \
//           background-image: -moz-linear-gradient(center top, #ccc 0%, #ddd 50%, #ccc 51%, #ccc 100%); } \
//         .audiojs .loaded { position: absolute; top: 0px; left: 0px; height: 14px; width: 0px; background: #000; \
//           background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #222), color-stop(0.5, #333), color-stop(0.51, #222), color-stop(1, #222)); \
//           background-image: -moz-linear-gradient(center top, #222 0%, #333 50%, #222 51%, #222 100%); } \
//         .audiojs .time { float: left; height: 36px; line-height: 36px; margin: 0px 0px 0px 6px; padding: 0px 6px 0px 12px; border-left: 1px solid #000; color: #ddd; text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5); } \
//         .audiojs .time em { padding: 0px 2px 0px 0px; color: #f9f9f9; font-style: normal; } \
//         .audiojs .time strong { padding: 0px 0px 0px 2px; font-weight: normal; } \
//         .audiojs .error-message { float: left; display: none; margin: 0px 10px; height: 36px; width: 400px; overflow: hidden; line-height: 36px; white-space: nowrap; color: #fff; \
//           text-overflow: ellipsis; -o-text-overflow: ellipsis; -icab-text-overflow: ellipsis; -khtml-text-overflow: ellipsis; -moz-text-overflow: ellipsis; -webkit-text-overflow: ellipsis; } \
//         .audiojs .error-message a { color: #eee; text-decoration: none; padding-bottom: 1px; border-bottom: 1px solid #999; white-space: wrap; } \
//         \
//         .audiojs .play { background: url("$1") -2px -1px no-repeat; } \
//         .audiojs .loading { background: url("$1") -2px -31px no-repeat; } \
//         .audiojs .error { background: url("$1") -2px -61px no-repeat; } \
//         .audiojs .pause { background: url("$1") -2px -91px no-repeat; } \
//         \
//         .playing .play, .playing .loading, .playing .error { display: none; } \
//         .playing .pause { display: block; } \
//         \
//         .loading .play, .loading .pause, .loading .error { display: none; } \
//         .loading .loading { display: block; } \
//         \
//         .error .time, .error .play, .error .pause, .error .scrubber, .error .loading { display: none; } \
//         .error .error { display: block; } \
//         .error .play-pause p { cursor: auto; } \
//         .error .error-message { display: block; }',

//         trackEnded: function(e) {},
//       flashError: function() {
//         var player = this.settings.createPlayer,
//             errorMessage = getByClass(player.errorMessageClass, this.wrapper),
//             html = 'Missing <a href="http://get.adobe.com/flashplayer/">flash player</a> plugin.';
//         if (this.mp3) html += ' <a href="'+this.mp3+'">Download audio file</a>.';
//         container[audiojs].helpers.removeClass(this.wrapper, player.loadingClass);
//         container[audiojs].helpers.addClass(this.wrapper, player.errorClass);
//         errorMessage.innerHTML = html;
//       },
//       loadError: function(e) {
//         var player = this.settings.createPlayer,
//             errorMessage = getByClass(player.errorMessageClass, this.wrapper);
//         container[audiojs].helpers.removeClass(this.wrapper, player.loadingClass);
//         container[audiojs].helpers.addClass(this.wrapper, player.errorClass);
//         errorMessage.innerHTML = 'Error loading: "'+this.mp3+'"';
//       },
//       init: function() {
//         var player = this.settings.createPlayer;
//         container[audiojs].helpers.addClass(this.wrapper, player.loadingClass);
//       },
//       loadStarted: function() {
//         var player = this.settings.createPlayer,
//             duration = getByClass(player.durationClass, this.wrapper),
//             m = Math.floor(this.duration / 60),
//             s = Math.floor(this.duration % 60);
//         container[audiojs].helpers.removeClass(this.wrapper, player.loadingClass);
//         duration.innerHTML = ((m<10?'0':'')+m+':'+(s<10?'0':'')+s);
//       },
//       loadProgress: function(percent) {
//         var player = this.settings.createPlayer,
//             scrubber = getByClass(player.scrubberClass, this.wrapper),
//             loaded = getByClass(player.loaderClass, this.wrapper);
//         loaded.style.width = (scrubber.offsetWidth * percent) + 'px';
//       },
//       playPause: function() {
//         if (this.playing) this.settings.play();
//         else this.settings.pause();
//       },
//       play: function() {
//         var player = this.settings.createPlayer;
//         container[audiojs].helpers.addClass(this.wrapper, player.playingClass);
//       },
//       pause: function() {
//         var player = this.settings.createPlayer;
//         container[audiojs].helpers.removeClass(this.wrapper, player.playingClass);
//       },
//       updatePlayhead: function(percent) {
//         var player = this.settings.createPlayer,
//             scrubber = getByClass(player.scrubberClass, this.wrapper),
//             progress = getByClass(player.progressClass, this.wrapper);
//         progress.style.width = (scrubber.offsetWidth * percent) + 'px';

//         var played = getByClass(player.playedClass, this.wrapper),
//             p = this.duration * percent,
//             m = Math.floor(p / 60),
//             s = Math.floor(p % 60);
//         played.innerHTML = ((m<10?'0':'')+m+':'+(s<10?'0':'')+s);
//       }
//     },
//     create: function(element, options) {
//       var options = options || {}
//       if (element.length) {
//         return this.createAll(options, element);
//       } else {
//         return this.newInstance(element, options);
//       }
//     },
//     createAll: function(options, elements) {
//       var audioElements = elements || document.getElementsByTagName('audio'),
//           instances = []
//           options = options || {};
//       for (var i = 0, ii = audioElements.length; i < ii; i++) {
//         instances.push(this.newInstance(audioElements[i], options));
//       }
//       return instances;
//     },
//     newInstance: function(element, options) {
//       var element = element,
//           s = this.helpers.clone(this.settings),
//           id = 'audiojs'+this.instanceCount,
//           wrapperId = 'audiojs_wrapper'+this.instanceCount,
//           instanceCount = this.instanceCount++;
//       if (element.getAttribute('autoplay') != null) s.autoplay = true;
//       if (element.getAttribute('loop') != null) s.loop = true;
//       if (element.getAttribute('preload') == 'none') s.preload = false;
//       if (options) this.helpers.merge(s, options);
//       if (s.createPlayer.markup) element = this.createPlayer(element, s.createPlayer, wrapperId);
//       else element.parentNode.setAttribute('id', wrapperId);
//       var audio = new container[audiojsInstance](element, s);
//       if (s.css) this.helpers.injectCss(audio, s.css);
//       if (s.useFlash && s.hasFlash) {
//         this.injectFlash(audio, id);
//         this.attachFlashEvents(audio.wrapper, audio);
//       } else if (s.useFlash && !s.hasFlash) {
//         this.settings.flashError.apply(audio);
//       }
//       if (!s.useFlash || (s.useFlash && s.hasFlash)) this.attachEvents(audio.wrapper, audio);
//       this.instances[id] = audio;
//       return audio;
//     },
//     createPlayer: function(element, player, id) {
//       var wrapper = document.createElement('div'),
//           newElement = element.cloneNode(true);
//       wrapper.setAttribute('class', 'audiojs');
//       wrapper.setAttribute('className', 'audiojs');
//       wrapper.setAttribute('id', id);
//       if (newElement.outerHTML && !document.createElement('audio').canPlayType) {
//         newElement = this.helpers.cloneHtml5Node(element);
//         wrapper.innerHTML = player.markup;
//         wrapper.appendChild(newElement);
//         element.outerHTML = wrapper.outerHTML;
//         wrapper = document.getElementById(id);
//       } else {
//         wrapper.appendChild(newElement);
//         wrapper.innerHTML = wrapper.innerHTML + player.markup;
//         element.parentNode.replaceChild(wrapper, element);
//       }
//       return wrapper.getElementsByTagName('audio')[0];
//     },
//     attachEvents: function(wrapper, audio) {
//       if (!audio.settings.createPlayer) return;
//       var player = audio.settings.createPlayer,
//           playPause = getByClass(player.playPauseClass, wrapper),
//           scrubber = getByClass(player.scrubberClass, wrapper),
//           leftPos = function(elem) {
//             var curleft = 0;
//             if (elem.offsetParent) {
//               do { curleft += elem.offsetLeft; } while (elem = elem.offsetParent);
//             }
//             return curleft;
//           };

//       container[audiojs].events.addListener(playPause, 'click', function(e) {
//         audio.playPause.apply(audio);
//       });

//       container[audiojs].events.addListener(scrubber, 'click', function(e) {
//         var relativeLeft = e.clientX - leftPos(this);
//         audio.skipTo(relativeLeft / scrubber.offsetWidth);
//       });
//       if (audio.settings.useFlash) return;
//       container[audiojs].events.trackLoadProgress(audio);

//       container[audiojs].events.addListener(audio.element, 'timeupdate', function(e) {
//         audio.updatePlayhead.apply(audio);
//       });

//       container[audiojs].events.addListener(audio.element, 'ended', function(e) {
//         audio.trackEnded.apply(audio);
//       });

//       container[audiojs].events.addListener(audio.source, 'error', function(e) {
//         clearInterval(audio.readyTimer);
//         clearInterval(audio.loadTimer);
//         audio.settings.loadError.apply(audio);
//       });

//     },
//     attachFlashEvents: function(element, audio) {
//       audio['swfReady'] = false;
//       audio['load'] = function(mp3) {
//         audio.mp3 = mp3;
//         if (audio.swfReady) audio.element.load(mp3);
//       }
//       audio['loadProgress'] = function(percent, duration) {
//         audio.loadedPercent = percent;
//         audio.duration = duration;
//         audio.settings.loadStarted.apply(audio);
//         audio.settings.loadProgress.apply(audio, [percent]);
//       }
//       audio['skipTo'] = function(percent) {
//         if (percent > audio.loadedPercent) return;
//         audio.updatePlayhead.call(audio, [percent])
//         audio.element.skipTo(percent);
//       }
//       audio['updatePlayhead'] = function(percent) {
//         audio.settings.updatePlayhead.apply(audio, [percent]);
//       }
//       audio['play'] = function() {
//         if (!audio.settings.preload) {
//           audio.settings.preload = true;
//           audio.element.init(audio.mp3);
//         }
//         audio.playing = true;
//         audio.element.pplay();
//         audio.settings.play.apply(audio);
//       }
//       audio['pause'] = function() {
//         audio.playing = false;
//         audio.element.ppause();
//         audio.settings.pause.apply(audio);
//       }
//       audio['setVolume'] = function(v) {
//         audio.element.setVolume(v);
//       }
//       audio['loadStarted'] = function() {
//         audio.swfReady = true;
//         if (audio.settings.preload) audio.element.init(audio.mp3);
//         if (audio.settings.autoplay) audio.play.apply(audio);
//       }
//     },
//     injectFlash: function(audio, id) {
//       var flashSource = this.flashSource.replace(/\$1/g, id);
//       flashSource = flashSource.replace(/\$2/g, audio.settings.swfLocation);
//       flashSource = flashSource.replace(/\$3/g, (+new Date + Math.random()));
//       var html = audio.wrapper.innerHTML,
//           div = document.createElement('div');
//       div.innerHTML = flashSource + html;
//       audio.wrapper.innerHTML = div.innerHTML;
//       audio.element = this.helpers.getSwf(id);
//     },
//     helpers: {
//       merge: function(obj1, obj2) {
//         for (attr in obj2) {
//           if (obj1.hasOwnProperty(attr) || obj2.hasOwnProperty(attr)) {
//             obj1[attr] = obj2[attr];
//           }
//         }
//       },
//       clone: function(obj){
//         if (obj == null || typeof(obj) !== 'object') return obj;
//         var temp = new obj.constructor();
//         for (var key in obj) temp[key] = arguments.callee(obj[key]);
//         return temp;
//       },
//       addClass: function(element, className) {
//         var re = new RegExp('(\\s|^)'+className+'(\\s|$)');
//         if (re.test(element.className)) return;
//         element.className += ' ' + className;
//       },
//       removeClass: function(element, className) {
//         var re = new RegExp('(\\s|^)'+className+'(\\s|$)');
//         element.className = element.className.replace(re,' ');
//       },
//       injectCss: function(audio, string) {
//         var prepend = '',
//             styles = document.getElementsByTagName('style'),
//             css = string.replace(/\$1/g, audio.settings.imageLocation);

//         for (var i = 0, ii = styles.length; i < ii; i++) {
//           var title = styles[i].getAttribute('title');
//           if (title && ~title.indexOf('audiojs')) {
//             style = styles[i];
//             if (style.innerHTML === css) return;
//             prepend = style.innerHTML;
//             break;
//           }
//         };

//         var head = document.getElementsByTagName('head')[0],
//             firstchild = head.firstChild,
//             style = document.createElement('style');

//         if (!head) return;

//         style.setAttribute('type', 'text/css');
//         style.setAttribute('title', 'audiojs');

//         if (style.styleSheet) style.styleSheet.cssText = prepend + css;
//         else style.appendChild(document.createTextNode(prepend + css));

//         if (firstchild) head.insertBefore(style, firstchild);
//         else head.appendChild(styleElement);
//       },
//       cloneHtml5Node: function(audioTag) {
//         var fragment = document.createDocumentFragment(),
//             doc = fragment.createElement ? fragment : document;
//         doc.createElement('audio');
//         var div = doc.createElement('div');
//         fragment.appendChild(div);
//         div.innerHTML = audioTag.outerHTML;
//         return div.firstChild;
//       },
//       getSwf: function(name) {
//         var swf = document[name] || window[name];
//         return swf.length > 1 ? swf[swf.length - 1] : swf;
//       }
//     },
//     events: {
//       memoryLeaking: false,
//       listeners: [],
//       addListener: function(element, eventName, func) {
//         if (element.addEventListener) {
//           element.addEventListener(eventName, func, false);
//         } else if (element.attachEvent) {
//           this.listeners.push(element);
//           if (!this.memoryLeaking) {
//             window.attachEvent('onunload', function() {
//               if(this.listeners) {
//                 for (var i = 0, ii = this.listeners.length; i < ii; i++) {
//                   container[audiojs].events.purge(this.listeners[i]);
//                 }
//               }
//             });
//             this.memoryLeaking = true;
//           }
//           element.attachEvent('on' + eventName, function() {
//             func.call(element, window.event);
//           });
//         }
//       },

//       trackLoadProgress: function(audio) {
//         if (!audio.settings.preload) return;

//         var readyTimer,
//             loadTimer,
//             audio = audio,
//             ios = (/(ipod|iphone|ipad)/i).test(navigator.userAgent);
//             readyTimer = setInterval(function() {
//               if (audio.element.readyState > -1) {
//                 if (!ios) audio.init.apply(audio);
//           }
//           if (audio.element.readyState > 1) {
//             if (audio.settings.autoplay) audio.play.apply(audio);
//             clearInterval(readyTimer);
//             loadTimer = setInterval(function() {
//               audio.loadProgress.apply(audio);
//               if (audio.loadedPercent >= 1) clearInterval(loadTimer);
//             });
//           }
//         }, 10);
//         audio.readyTimer = readyTimer;
//         audio.loadTimer = loadTimer;
//       },
//       purge: function(d) {
//         var a = d.attributes, i;
//         if (a) {
//           for (i = 0; i < a.length; i += 1) {
//             if (typeof d[a[i].name] === 'function') d[a[i].name] = null;
//           }
//         }
//         a = d.childNodes;
//         if (a) {
//           for (i = 0; i < a.length; i += 1) purge(d.childNodes[i]);
//         }
//       },
//       ready: (function() { return function(fn) {
//         var win = window, done = false, top = true,
//         doc = win.document, root = doc.documentElement,
//         add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
//         rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
//         pre = doc.addEventListener ? '' : 'on',
//         init = function(e) {
//           if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
//           (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
//           if (!done && (done = true)) fn.call(win, e.type || e);
//         },
//         poll = function() {
//           try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
//           init('poll');
//         };
//         if (doc.readyState == 'complete') fn.call(win, 'lazy');
//         else {
//           if (doc.createEventObject && root.doScroll) {
//             try { top = !win.frameElement; } catch(e) { }
//             if (top) poll();
//           }
//           doc[add](pre + 'DOMContentLoaded', init, false);
//           doc[add](pre + 'readystatechange', init, false);
//           win[add](pre + 'load', init, false);
//         }
//       }
//       })()

//     }
//   }
//   container[audiojsInstance] = function(element, settings) {
//     this.element = element;
//     this.wrapper = element.parentNode;
//     this.source = element.getElementsByTagName('source')[0] || element;
//     this.mp3 = (function(element) {
//       var source = element.getElementsByTagName('source')[0];
//       return element.getAttribute('src') || (source ? source.getAttribute('src') : null);
//     })(element);
//     this.settings = settings;
//     this.loadStartedCalled = false;
//     this.loadedPercent = 0;
//     this.duration = 1;
//     this.playing = false;
//   }
//   container[audiojsInstance].prototype = {
//     updatePlayhead: function() {
//       var percent = this.element.currentTime / this.duration;
//       this.settings.updatePlayhead.apply(this, [percent]);
//     },
//     skipTo: function(percent) {
//       if (percent > this.loadedPercent) return;
//       this.element.currentTime = this.duration * percent;
//       this.updatePlayhead();
//     },
//     load: function(mp3) {
//       this.loadStartedCalled = false;
//       this.source.setAttribute('src', mp3);
//       this.element.load();
//       this.mp3 = mp3;
//       container[audiojs].events.trackLoadProgress(this);
//     },
//     loadError: function() {
//       this.settings.loadError.apply(this);
//     },
//     init: function() {
//       this.settings.init.apply(this);
//     },
//     loadStarted: function() {
//       if (!this.element.duration) return false;

//       this.duration = this.element.duration;
//       this.updatePlayhead();
//       this.settings.loadStarted.apply(this);
//     },
//     loadProgress: function() {
//       if (this.element.buffered != null && this.element.buffered.length) {
//         if (!this.loadStartedCalled) {
//           this.loadStartedCalled = this.loadStarted();
//         }
//         var durationLoaded = this.element.buffered.end(this.element.buffered.length - 1);
//         this.loadedPercent = durationLoaded / this.duration;

//         this.settings.loadProgress.apply(this, [this.loadedPercent]);
//       }
//     },
//     playPause: function() {
//       if (this.playing) this.pause();
//       else this.play();
//     },
//     play: function() {
//       var ios = (/(ipod|iphone|ipad)/i).test(navigator.userAgent);
//       if (ios && this.element.readyState == 0) this.init.apply(this);
//       if (!this.settings.preload) {
//         this.settings.preload = true;
//         this.element.setAttribute('preload', 'auto');
//         container[audiojs].events.trackLoadProgress(this);
//       }
//       this.playing = true;
//       this.element.play();
//       this.settings.play.apply(this);
//     },
//     pause: function() {
//       this.playing = false;
//       this.element.pause();
//       this.settings.pause.apply(this);
//     },
//     setVolume: function(v) {
//       this.element.volume = v;
//     },
//     trackEnded: function(e) {
//       this.skipTo.apply(this, [0]);
//       if (!this.settings.loop) this.pause.apply(this);
//       this.settings.trackEnded.apply(this);
//     }
//   }
//   var getByClass = function(searchClass, node) {
//     var matches = [];
//     node = node || document;

//     if (node.getElementsByClassName) {
//       matches = node.getElementsByClassName(searchClass);
//     } else {
//       var i, l, 
//           els = node.getElementsByTagName("*"),
//           pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");

//       for (i = 0, l = els.length; i < l; i++) {
//         if (pattern.test(els[i].className)) {
//           matches.push(els[i]);
//         }
//       }
//     }
//     return matches.length > 1 ? matches : matches[0];
//   };
// })('audiojs', 'audiojsInstance', this);
