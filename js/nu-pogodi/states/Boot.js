/**
* @author Paweł Winiecki <pawel.winiecki@nerdlab.pl>
* @copyright 2014 NerdLab.pl
* @license MIT License
*/

var NuPogodi = NuPogodi || {};

/**
 * BootState constructor
 *
 * @class NuPogodi.BootState
 * @constructor
 * @see Phaser.State
 */
NuPogodi.BootState = function() {

};

NuPogodi.BootState.prototype = {
    preload: function() {
        // loading assets for PreloadState
        this.game.load.image('loader-empty', './assets/sprites/loader-empty.png');
        this.game.load.image('loader-full', './assets/sprites/'+ NuPogodi.city + '/loader-full.png');
    },
    create: function() {    
        // set scalling mode and resize game
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //1350, 808
        this.game.scale.setMinMax(1350/2, 808/2, 1350, 808);
        //this.game.scale.pageAlignHorizontally = true;
        //this.game.scale.pageAlignVertically = false;
        //this.game.stage.scale.refresh();

        this.game.state.start('Preload');
    },
    update: function() {

    }
};


