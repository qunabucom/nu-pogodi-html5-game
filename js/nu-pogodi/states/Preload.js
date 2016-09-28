/**
* @author Paweł Winiecki <pawel.winiecki@nerdlab.pl>
* @copyright 2014 NerdLab.pl
* @license MIT License
*/

var NuPogodi = NuPogodi || {};

/**
 * PreloadState constructor
 *
 * @constructor
 * @see Phaser.State
 */
NuPogodi.PreloadState = function() {

};

NuPogodi.PreloadState.prototype = {
    /**
     * Loading all assets using in Menu and Game states
     * 
     * @class NuPogodi.MenuState
     * @method NuPogodi.PreloadState#preload
     * @see Phaser.State.preload
     */
    preload: function() {

        // adding sprites for loader bar
        this.game.add.sprite(this.game.world.centerX - 101,
                this.game.world.centerY - 8,
                'loader-empty');
        this.loaderFull = this.game.add.sprite(this.game.world.centerX - 101,
                this.game.world.centerY - 8,
                'loader-full');
        this.loaderFull.cropEnabled = true;
        this.loaderFull.crop = new Phaser.Rectangle(0, 0, 0,
                this.loaderFull.height);
        this.loaderFull.name = 'loaderFull';

        // array has image files name without path and extension
        var imagesData = [
            'hare',
            'wolf-left',
            'basket-left-up',
            'basket-left-down',
            'wolf-right',
            'basket-right-up',
            'basket-right-down',
            'egg-left-1',
            'egg-left-2',
            'egg-left-3',
            'egg-left-4',
            'egg-left-5',
            'egg-right-1',
            'egg-right-2',
            'egg-right-3',
            'egg-right-4',
            'egg-right-5',
            'bird-left-1',
            'bird-left-2',
            'bird-left-3',
            'bird-left-4',
            'bird-left-5',
            'bird-right-1',
            'bird-right-2',
            'bird-right-3',
            'bird-right-4',
            'bird-right-5',
            'button-left-down',
            'button-left-up',
            'button-right-down',
            'button-right-up',
            'start'
        ];



        // loading images using array of names
        for (var i = 0; i < imagesData.length; i++) {
          var isPng = true;
            this.game.load.image(imagesData[i],
                    './assets/sprites/'
                    + ( isPng ? NuPogodi.city + '/' : '' )
                    + imagesData[i]
                    + ( isPng ? '.png' : '.svg' ));
        }

        // spritesheet with blinking bird


      switch (NuPogodi.city) {
        case "poznan":
          this.game.load.spritesheet('bird-life', './assets/sprites/'+NuPogodi.city+'/bird-life.png', 39, 36);
          break;
        case "gdansk":
          this.game.load.spritesheet('bird-life', './assets/sprites/'+NuPogodi.city+'/bird-life.png', 39, 43);
          break;
        case "gdynia":
          this.game.load.spritesheet('bird-life', './assets/sprites/'+NuPogodi.city+'/bird-life.png', 49, 43);
          break;
      }


      this.game.load.spritesheet('button-left-down', './assets/sprites/'+NuPogodi.city+'/button-left-down.png', 92, 92);
      this.game.load.spritesheet('button-left-up', './assets/sprites/'+NuPogodi.city+'/button-left-up.png', 81, 83);
      this.game.load.spritesheet('button-right-down', './assets/sprites/'+NuPogodi.city+'/button-right-down.png', 94, 94);
      this.game.load.spritesheet('button-right-up', './assets/sprites/'+NuPogodi.city+'/button-right-up.png', 98, 104);

        // array has audio files name without path and extension
        var audioData = [
            'basket',
            'egg-crash',
            'egg-left-up',
            'egg-left-down',
            'egg-right-up',
            'egg-right-down',
            'game-over',
            'bird'
        ];

        // loading audio using array of names
        for (var i = 0; i < audioData.length; i++) {
            this.game.load.audio(audioData[i],
                    ['./assets/audio/' + audioData[i] + '.mp3']);
        }

        // adding function to cast after adding every file 
        this.load.onFileComplete.add(this.fileLoaded, this);

    },
    /**
     * Callback for loaded file.
     * 
     * @class NuPogodi.MenuState
     * @method NuPogodi.PreloadState#fileLoaded
     */
    fileLoaded: function(progress) {
        // progression of Progress Bar
        this.loaderFull.crop.width = (202 / 100) * progress;
    },
    /**
     * starting Menu state
     * 
     * @see Phaser.State.create
     */
    create: function() {
        this.game.state.start('Menu');
    },
    update: function() {

    }
};
