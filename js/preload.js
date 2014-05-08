var EG1 = EG1 || {};

EG1.Preload = function() {
  this.loadComplete = false;
  this.preloadSprite;
}

EG1.Preload.prototype = {
  preload: function() {
    console.log("Preload.preload");

    //Nuking this for now.  Not enough to load to be significant (i.e.
    //the spinner just flashes even on my phone)
    //this.preloadSprite = this.add.sprite(this.game.world.width/2,this.game.world.height/2, 'preloadeImage');

    this.game.load.spritesheet('bird', 'assets/narhwal.png', 309, 74);
    this.game.load.image('rball', 'assets/redBall.png');
    this.game.load.image('bball', 'assets/blueBall.png');
    this.game.load.image('gball', 'assets/greenBall.png');
    this.game.load.image('yball', 'assets/yellowBall.png');
    this.game.load.image('startButton', 'assets/startButton.png');
    this.game.load.image('gameLogo', 'assets/someGame.png');

    this.load.audio("burp", "assets/burp.mp3");
    this.load.audio("medFart", "assets/medFart.mp3");

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
  },
  create: function() {
    console.log("Preload.create");
  },
  update: function() {
    if(this.loadComplete) {
      console.log("Preload.update - load complete");
      this.game.state.start("options");
    }
  },
  onLoadComplete: function() {
    console.log("Preload.onLoadComplete");
    this.loadComplete = true;
//    this.preloadSprite.destroy();
  }
};
