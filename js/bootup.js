var EG1 = EG1 || {};

EG1.Bootup = function() {
}

EG1.Bootup.prototype = {
  preload: function() {
    console.log("Bootup preload");
    this.load.image('preloadeImage', 'assets/loader.gif');
  },
  create: function() {
    console.log("Bootup create");
    this.game.input.maxPointers = 1;

    console.log("Set-up scaling and orientation rules");
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.minWidth = EG1.relWidth;
    this.game.scale.minHeight = EG1.relHeight;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.setScreenSize(true);
    this.game.state.start("preload");
  },
  create_HIDE: function() {
    console.log("Bootup create");
    this.game.input.maxPointers = 1;

//Following code based on https://github.com/photonstorm/phaser/blob/master/resources/Project%20Templates/Full%20Screen%20Mobile/src/Boot.js
        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 480;
            this.scale.minHeight = 260;
            this.scale.maxWidth = 1024;
            this.scale.maxHeight = 768;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setScreenSize(true);
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 480;
            this.scale.minHeight = 260;
            this.scale.maxWidth = 1024;
            this.scale.maxHeight = 768;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.hasResized.add(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
        }

    this.game.state.start("preload");
  },
    gameResized: function (width, height) {
      console.log("Game Resized");
        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device.

    },

    enterIncorrectOrientation: function () {

        BasicGame.orientated = false;

        jQuery('#orientation').style({display:"block"});

    },

    leaveIncorrectOrientation: function () {

        //BasicGame.orientated = true; Flag so the update loop can know to pause if orientation changes

        jQuery('#orientation').style({display:"none"});

    }
};