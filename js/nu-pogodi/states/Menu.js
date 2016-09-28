/**
* @author Paweł Winiecki <pawel.winiecki@nerdlab.pl>
* @copyright 2014 NerdLab.pl
* @license MIT License
*/

var NuPogodi = NuPogodi || {};

/**
 * MenuState constructor
 * 
 * @class NuPogodi.MenuState
 * @constructor
 * @see Phaser.State
 */
NuPogodi.MenuState = function() {

};

NuPogodi.MenuState.prototype = {
    /**
     * Setup operations for Menu state
     * 
     * @method NuPogodi.MenuState#create 
     * @see Phaser.State#create
     */
    create: function() {
        // showing score if was set
        if (typeof NuPogodi.score != 'undefined') {
            this.game.add.text(
                    this.game.world.centerX - 90,
                    this.game.world.centerY + 70,
                    "Your score: " + NuPogodi.score,
                    {
                        font: 32 + "px lets_go_digitalregular",
                        fill: "#000000",
                        align: "center"
                    }
            );
        }

        // adding beginGame function for space and enter
        var enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(this.beginGame, this);
        var space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.add(this.beginGame, this);

        // adding buttons whit beginGame function
        this.game.add.button(this.game.world.centerX - 100,
                this.game.world.centerY - 55,
                'start',
                this.beginGame, this);
        this.game.add.button(115, 634, 'button-left-down', this.beginGame, this, 0, 0, 1);
        this.game.add.button(120, 497, 'button-left-up', this.beginGame, this, 0, 0, 1);
        this.game.add.button(1141, 633, 'button-right-down', this.beginGame, this, 0, 0, 1);
        this.game.add.button(1140, 490, 'button-right-up', this.beginGame, this, 0, 0, 1);


    },
    /**
     * Function for start start Game state.
     * 
     * @method NuPogodi.MenuState#startGame
     */
    beginGame: function() {
        this.game.input.keyboard.clearCaptures();
        this.game.state.start('Game');
    }
};


