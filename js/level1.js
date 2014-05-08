var EG1 = EG1 || {};

EG1.Level1 = function() {
  this.bird;
  this.strings;//30 balls per String
  this.timer;

  this.ballNames = ['rball', 'bball', 'gball', 'yball'];
  this.ballGroups = [];
  this.g1;
  this.birdCollided = false;
  this.collideSound;
  this.deadSound;
}

EG1.Level1.prototype = {
  preload: function() {
    console.log("Level1.preload");
  },
  create: function() {
    console.log("Level1.create");

    this.collideSound = this.game.add.audio("medFart");
    this.deadSound = this.game.add.audio("medFart");

    this.game.stage.backgroundColor = "#00FFFF";

    this.bird = this.game.add.sprite(300, 300, 'bird');
    this.bird.animations.add("flap");
    this.bird.animations.play("flap", 10, true);


    this.game.physics.enable(this.bird, Phaser.Physics.ARCADE);
    this.bird.body.bounce.y = 0.2;
    this.bird.body.gravity.y = 500;
    //Change bounding box of body, so we don''t get
    //colissions in whitepspace.  Now I know why
    //folks like to create games with rectaugular
    //things
    this.bird.anchor.setTo(0.5, 0.5);
    this.bird.body.setSize(212,49,21,5);


    console.log("Starting Hack...");
    this.g1 = this.game.add.group();
    for(var i = 0; i<10; i++) {
      console.log("Outer loop " + i);
      for(var j = 0; j<4; j++) {
        console.log("Creating Ball (i=" + i + ", j=" + j + ")");
        var b = this.g1.create(200, 200, this.ballNames[j]);

        this.game.physics.enable(b, Phaser.Physics.ARCADE);
        b.anchor.setTo(0.5, 0.5);
        b.body.immovable = true;
        b.outOfBoundsKill = true;
        b.checkWorldBounds = true;
        b.kill();
      }
    }


    this.game.input.onTap.add(this.tapHandler, this);

    this.timer = this.game.time.events.loop(1600, this.addNewString, this);


  },
  update: function() {
    //Useful thing which shows the bounding box of the sprite
//    this.game.debug.body(this.bird);

    this.game.physics.arcade.collide(this.bird, this.g1, this.birdHitBall, null, this);
//    console.log("Level1.update");
//    this.game.state.start('level1');
  },
  //Although the signature from "collide" would imply otherwise, the ball sprite (and not the group)
  //is passed as
  birdHitBall: function(bird, ball) {

    //Check Body not sprite.  Sprite may be updated

    if(!this.birdCollided) {
      this.birdCollided = true;
      this.bird.body.gravity.y = 1000;
      this.game.input.onTap.remove(this.tapHandler, this);
      this.collideSound.play();
      this.game.state.start('level1');
    }

    var between = this.game.physics.arcade.angleBetween(bird, ball);
    console.log(between);
  },
  addNewString: function() {

      var b = this.g1.getFirstDead();
      console.log("Move one ball of " + this.g1.countLiving() + " alive and " + this.g1.countDead() + " dead");
      b.reset(800, (Math.floor(Math.random()*500) + 1));
      b.body.velocity.x = -50;

/*
    console.log("Adding new String");
    var index;
    var ball;
    var group;
    for(var i = 0; i<37; i++) {
      index = Math.floor(Math.random() * 3) + 1;
      console.log("adding ball of index: " + index);
      group = ballGroups[index];
      console.log("Group's living count: " + group.countLiving());
      ball = group.getFirstDead();
      console.log("Set position to 750, " + i*16);
      ball.reset(750, i*30);
      ball.body.velocity.x = -250;
//      ball.outOfBoundsKill = true;

    }
*/
  },
  tapHandler: function() {
    console.log("Tap");
    this.bird.body.velocity.y = -300;
  }
};