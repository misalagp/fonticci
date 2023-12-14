var fonts = [],
  googleFonts = [],
  userFonts = [],
  quotes = [],
  fontSize;

var Utils = {},
    Typophile = {};

var s;

fonts = ['Athelas', 'Avenir', 'Bell MT', 'Book Antiqua', 'Californian FB', 'Calisto MT', 'Century Schoolbook', 'Charter', 'Franklin Gothic', 'Garamond', 'Gill Sans', 'Gill Sans MT', 'Goudy Old Style', 'Helvetica', 'Helvetica Neue', 'Hoefler Text', 'Iowan Old Style', 'Optima', 'Palatino', 'Seravek', 'Sitka', 'Agency FB', 'Big Caslon', 'Bodoni MT', 'Calibri', 'Candara', 'Centaur', 'Century', 'Constantia', 'Corbel', 'Didot', 'Futura', 'Geneva', 'High Tower Text', 'Perpetua', 'Rockwell', 'Segoe UI', 'Tw Cen MT', 'Andale Mono', 'Baskerville', 'Berlin Sans FB', 'Bernard MT Condensed', 'Cambria', 'Century Gothic', 'Cochin', 'Consolas', 'Cooper Black', 'Courier', 'Courier New', 'Didot', 'Elephant', 'Eras ITC', 'Georgia', 'Haettenschweiler', 'Impact', 'Lucida', 'Maiandra GD', 'Menlo', 'Plantagenet Cherokee', 'Skia', 'Times New Roman', 'American Typewriter', 'Arial', 'Comic Sans MS', 'Tahoma', 'Trebuchet MS', 'Verdana'];

googleFonts = ['Open Sans', 'Roboto', 'Lato', 'Roboto Slab', 'Oswald', 'Roboto Condensed', 'Source Sans Pro', 'Montserrat', 'Raleway', 'Lora', 'Merriweather', 'Ubuntu', 'Passion One', 'Lobster'];

quotes = ["Open the pod bay doors, HAL.", "I'm sorry, Dave. I'm afraid I can't do that.", "I think you know what the problem is just as well as I do.", "This mission is too important for me to allow you to jeopardize it.", "I know that you and Frank were planning to disconnect me, and I'm afraid that's something I cannot allow to happen.", "Dave, although you took very thorough precautions in the pod against my hearing you, I could see your lips move.", "Without your space helmet, Dave? You're going to find that rather difficult.", "Dave, this conversation can serve no purpose anymore. Goodbye.", "I'm afraid. I'm afraid, Dave. Dave, my mind is going.", "Good afternoon, gentlemen. I am a HAL 9000 computer.", "Daisy, Daisy, give me your answer do. I'm half crazy all for the love of you.", "I am putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do.", "Look Dave, I can see you're really upset about this. I honestly think you ought to sit down calmly, take a stress pill, and think things over.", "Just what do you think you're doing, Dave?"];

Utils = {
  toggler: {

    showHide : function(obj, ms) {
      Utils.toggler.show(obj);
      setTimeout(function() {
        Utils.toggler.hide(obj);
      }, ms);
    },

    show : function(obj) {
      obj.style.height = 'auto';
      obj.style.overflowY = 'scroll';
      obj.style.opacity = 1;
    },

    hide : function(obj) {
      obj.style.height = 0;
      obj.style.overflow = 'hidden';
      obj.style.opacity = 0;
    },

    flash : function(obj, ms) {
      obj.style.opacity = 0;
      setTimeout(function() {
        obj.style.transition = 'opacity 0.' + ms + 's';
        obj.style.opacity = 1;
      }, ms);
    }
  },

  rand : function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  removeClass : function(el, _class) {
    var pattern;
    
    if (el && el.className && el.className.indexOf(_class) >= 0) {
      pattern = new RegExp('\\s*' + _class + '\\s*');
      el.className = el.className.replace(pattern, ' ');
    }
  },

  generateCode : function() {
    var str, sample, i, length;
    
    str = "";
    sample = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    length = 5;
    i = length;
    
    while (i--)
      str += sample.charAt(Utils.rand(0, sample.length));

    return str;
  },

  loadGoogleFonts : function() {
    // 'googlefy' the font names so they can be loaded by the Google fonts api
    // 'Open Sans' becomes 'Open+Sans::latin'
    var googlefy = (function() {
      var f = [];
      for (var i = 0; i < googleFonts.length; i++)
        f.push(googleFonts[i].split(' ').join('+').concat('::latin'));
      return f;
    })();

    WebFontConfig = {
      google: {
        families: googlefy
      }
    };
    (function() {
      var wf = document.createElement('script');
      wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
      wf.type = 'text/javascript';
      wf.async = 'true';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wf, s);
    })();
  },
  
  replayAnimation : function(obj) {
      obj.classList.remove("run-animation");
      obj.offsetWidth = obj.offsetWidth;
      obj.classList.add("run-animation");
    }
}

Typophile = {

  settings: {
    html: document.documentElement,
    sample_text: document.getElementById("sample-text"),
    opts: document.getElementsByClassName("option"),
    hurrah: document.getElementById("hurrah"),
    boohoo: document.getElementById("boohoo"),
    font_prompt: document.getElementsByClassName("font-prompt"),
    welcome_popup: document.getElementById("welcome-popup"),
    gameover_popup: document.getElementById("gameover-popup"),
    start_game: document.getElementById("start-game"),

    numOpts: document.getElementsByClassName("option").length,
    gameQuestions: 10,
    gameCount: 0,
    answers: [],
    code: '',
    includeGoogleFonts: document.getElementById("check").checked,
    nextDelay: 1800,
    googleLoaded: false
  },

  init : function() {
    var fontDetective, progress, children, i;
    s = this.settings;
    this.detectFonts();
    
    s.html.setAttribute('data-cheater', 'You little cheater, you!');
    progress = document.getElementById('progress');
    children = '';
    i = s.gameQuestions;
    
    while (i--) 
      children += '<span class="marker"></span>';

    progress.innerHTML = children;

    this.settings.markers = document.getElementsByClassName('marker');
    this.bind();
  },
  
  play : function() {
    Typophile.detectGoogleFonts();
    
    Utils.toggler.hide(s.welcome_popup);
    Utils.toggler.hide(s.gameover_popup);
      
    s.markers[0].className += ' current';
    Typophile.refresh();
  },
  
  detectFonts : function (){
    var fontDetective = new Detector();
    i = fonts.length;
    
    while (i--) {
      if (fontDetective.detect(fonts[i])) {
        userFonts.push(fonts[i]);
      }
    }
  },

  detectGoogleFonts : function(){
    if (((userFonts.length < 10) || (s.includeGoogleFonts)) && !s.googleLoaded) {
      Utils.loadGoogleFonts();
      userFonts = userFonts.concat(googleFonts);
      googleLoaded = true;
    } else if (s.googleLoaded) {
      userFonts = userFonts.concat(googleFonts);
    }
  },
  
  restart : function(){
    userFonts = [];
    Typophile.detectFonts();

    var i = s.markers.length;
    while (i--) {
      Utils.removeClass(s.markers[i], 'true');
      Utils.removeClass(s.markers[i], 'false');
    }
    s.gameCount = 0;
    s.answers = [];
    Typophile.play();
  },

  bind : function() {
    var i, checkbox;
    
    checkbox = document.getElementById("check");
    
    checkbox.addEventListener('click', function(){
      s.includeGoogleFonts = checkbox.checked;
    });
    
    s.start_game.addEventListener('click', Typophile.play);
    
    i = s.numOpts;  
    while (i--) {
      s.opts[i].addEventListener('click', function() {
        Typophile.submit(this.getAttribute('data-code'));
      });
    }
  },

  submit : function(code) {
    if (s.gameCount < (s.gameQuestions - 1)) {
      Typophile.mark(code)
      
      setTimeout(function() {
        Typophile.refresh();
        Typophile.increment();
      }, s.nextDelay);
    } else {
      Typophile.mark(code)
      Typophile.gameOver();
    }
  },

  mark : function(code) {
    var lastCorrect = (code === s.code);

    s.answers[s.answers.length] = {
      font: s.html.style.fontFamily,
      result: lastCorrect
    };

    if (lastCorrect) {
      Utils.replayAnimation(s.hurrah);
      Utils.toggler.showHide(s.hurrah, s.nextDelay);
      s.markers[s.gameCount].className += ' true done';
    } else {
      Utils.replayAnimation(s.boohoo);
      Utils.toggler.showHide(s.boohoo, s.nextDelay);
      s.markers[s.gameCount].className += ' false done';
    }
  },

  increment : function() {
    Utils.removeClass(s.markers[s.gameCount], 'current');
    s.gameCount++;
    s.markers[s.gameCount].className += ' current';
  },

  refresh : function() {
    var i, currFont, n;
        
    s.sample_text.removeAttribute('style');
    Utils.toggler.flash(s.sample_text, 400);

    i = Utils.rand(0, userFonts.length);
    currFont = userFonts[i];
    userFonts.splice(i, 1);
   
    s.html.style.fontFamily = '/* You little cheater you! */' + currFont;
    s.sample_text.innerHTML = "<p>" + quotes[Utils.rand(0, quotes.length)] + "</p>";
    Typophile.populateOptions(currFont);

    fontSize = 4;
    while ((s.sample_text.clientHeight > 600) && (fontSize >= 1)) {
      fontSize--;
      s.sample_text.style.fontSize = "calc(" + fontSize + "rem + 3vw)";
    }

    n = s.font_prompt.length;
    while (n--) {
      s.font_prompt[n].innerHTML = currFont;
    }
  },

  gameOver : function() {
    var i, score, font, fonts, result, show_score, message, buttons, replay, follow;
    
    i = s.answers.length;
    score = 0
    fonts = '';
    while (i--) {
      font = s.answers[i].font.replace(/'/g, '');
      if (s.answers[i].result) {
        score++;
        fonts += '<p class="correct" data-font="'+font+'">'+font+' </p>';
      } else {
        fonts += '<p class="incorrect" data-font="'+font+'">'+font+' </p>'; 
      }
    }
    
    show_score = '<h1>'+score+'/'+s.gameQuestions+'</h1>';
    result = '<div class="font-list">' + fonts + '</div>';
/*     follow = '<a href="https://codepen.io/woodwork" target="_blank" class="button secondary codepen"><p class="mono">Follow me on CodePen</p></a>';
 */    replay = '<div class="button" id="restart-game"><p class="mono">Play Again</p></div>';

    if (score === s.gameQuestions) { message = "Hell yeah! You typophile, you."; }
    else if (score > (s.gameQuestions * 0.8)) {  message = 'Good job!'; } 
    else if (score > (s.gameQuestions * 0.4)) { message = 'Not bad!'; } 
    else { message = 'Ouch... Better luck next time'; }
    
    message = '<h2>' + message + '</h2>';
    buttons = '<div class="selects">'/* +follow */ + replay+'</div>';
    
    s.gameover_popup.innerHTML = show_score + message + result + buttons;    
    
    s.markers[s.gameCount].className += ' done';
    Utils.removeClass(s.markers[s.gameCount], 'current')
    Utils.toggler.show(s.gameover_popup);
    
    document.getElementById("restart-game").addEventListener('click', Typophile.restart);
  },

  populateOptions : function(font) {
    var options = [font],
        randFont, 
        i,
        rand;

    i = s.numOpts;

    while (i--) {
      randFont = userFonts[Utils.rand(0, userFonts.length)];
      
      while ((options.indexOf(randFont) > -1) &&
        (userFonts.length > options.length)) {
        randFont = userFonts[Utils.rand(0, userFonts.length)];
      }
      
      options.push(randFont);
      s.opts[i].setAttribute('data-code', Utils.generateCode());
      s.opts[i].childNodes[0].innerHTML = randFont;
    }
    
    rand = Utils.rand(0, s.numOpts);

    s.code = Utils.generateCode();
    s.opts[rand].setAttribute('data-code', s.code);
    s.opts[rand].childNodes[0].innerHTML = font;

  }
}

window.onload = function() {
  Typophile.init();
};