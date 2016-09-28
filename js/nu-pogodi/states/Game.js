/**
 * @author Paweł Winiecki <pawel.winiecki@nerdlab.pl>
 * @copyright 2014 NerdLab.pl
 * @license MIT License
 */

var NuPogodi = NuPogodi || {};

/**
 * PreloadState constructor
 *
 * @class NuPogodi.GameState
 * @constructor
 * @see Phaser.State
 */
NuPogodi.GameState = function() {
    'use strict';

    /**
     * @property {object} audio - simple key-value container for Phaser.Sound objects.
     * @default
     */
    this.audio = {};

    /**
     * @property {object} sprites - simple key-value container for Phaser.Sprite objects.
     * @default
     */
    this.sprites = {};

    /**
     * @property {Array} animations - array of 'animation' objects.
     * @default
     */
    this.animations = new Array();

    /**
     * @property {NuPogodi.Score} score - score of actual game.
     * @default
     */
    this.score = new NuPogodi.Score(this);

    /**
     * @property {NuPogodi.Wolf} wolf - object handlig wolf on screen.
     * @default
     */
    this.wolf = new NuPogodi.Wolf(this);

    /**
     * @property {NuPogodi.Eggs} eggs - container of eggs.
     * @default
     */
    this.eggs = new NuPogodi.Eggs(this);

    /**
     * @property {number} newEggTimer - timer of adding new egg.
     * @default
     */
    this.newEggTimer = 0;

    /**
     * @property {number} eggMoveTimer - timer of moving next egg.
     * @default
     */
    this.eggMoveTimer = 0;

    /**
     * @property {number} animationsTimer - timer of moving all 'animations'.
     * @default
     */
    this.animationsTimer = 0;

    /**
     * @property {number} hareShowTimer - timer of showing hare on screen.
     * @default
     */
    this.hareShowTimer = 0;

    /**
     * @property {boolean} isHare - true if hare is shown on screen otherwise is false.
     * @default
     */
    this.isHare = false;

};

NuPogodi.GameState.prototype = {
    /**
     * Setup operations for Game state
     * 
     * @method NuPogodi.GameState#create 
     * @see Phaser.State#create
     */
    create: function() {
        // clearing data
        this.eggs.clear();
        this.animations = new Array();

        // array of data to create sprites
        //[<key>,<image>,<posX>,<posY>]
        var spritesData = [];
        if (NuPogodi.city=='cukinsyn') {
          var spritesData = [
            ['wolf-left', 'wolf-left', 554, 368],
            ['basket-left-up', 'basket-left-up', 504, 368],
            ['basket-left-down', 'basket-left-down', 509, 441],
            ['wolf-right', 'wolf-right', 623, 368],
            ['basket-right-up', 'basket-right-up', 764, 365],
            ['basket-right-down', 'basket-right-down', 755, 443],
            ['egg-left-up-1', 'egg-left-1', 431, 326],
            ['egg-left-up-2', 'egg-left-2', 447, 341],
            ['egg-left-up-3', 'egg-left-3', 471, 349],
            ['egg-left-up-4', 'egg-left-4', 489, 361],
            ['egg-left-up-5', 'egg-left-5', 503, 380],
            ['egg-left-down-1', 'egg-left-1', 431, 407],
            ['egg-left-down-2', 'egg-left-2', 447, 422],
            ['egg-left-down-3', 'egg-left-3', 471, 430],
            ['egg-left-down-4', 'egg-left-4', 489, 442],
            ['egg-left-down-5', 'egg-left-5', 503, 461],
            ['egg-right-up-1', 'egg-right-1', 901, 323],
            ['egg-right-up-2', 'egg-right-2', 884, 339],
            ['egg-right-up-3', 'egg-right-3', 864, 348],
            ['egg-right-up-4', 'egg-right-4', 842, 359],
            ['egg-right-up-5', 'egg-right-5', 827, 378],
            ['egg-right-down-1', 'egg-right-1', 901, 405],
            ['egg-right-down-2', 'egg-right-2', 884, 421],
            ['egg-right-down-3', 'egg-right-3', 864, 430],
            ['egg-right-down-4', 'egg-right-4', 842, 441],
            ['egg-right-down-5', 'egg-right-5', 827, 460],
            //['bird-left-1', 'bird-left-1', 328, 426],
            ['bird-left-1', 'bird-left-1', 477,518],
            ['bird-left-2', 'bird-left-2', 496,550], // -8, -34
            ['bird-left-3', 'bird-left-3', 453,535], // -16, +22
            ['bird-left-4', 'bird-left-4', 408,541], // -24, 0
            ['bird-left-5', 'bird-left-5', 370,554], // -28, 0
            //['bird-right-1', 'bird-right-1', 552, 420],
            ['bird-right-1', 'bird-right-1', 802,509],
            ['bird-right-2', 'bird-right-2', 810,546], // -66 26
            ['bird-right-3', 'bird-right-3', 857,531], // 30  16
            ['bird-right-4', 'bird-right-4', 903,538], // 20 0
            ['bird-right-5', 'bird-right-5', 935,550], // 30 0
            ['bird-life-1', 'bird-life', 692, 283],
            ['bird-life-2', 'bird-life', 692 + 40, 283],
            ['bird-life-3', 'bird-life', 692 + 80, 283],
            ['hare', 'hare', 454, 213]
          ];
        }
      if (NuPogodi.city=='korsarz') {
        var spritesData = [
          ['wolf-left', 'wolf-left', 565, 362],
          ['basket-left-up', 'basket-left-up', 472, 395],
          ['basket-left-down', 'basket-left-down', 484, 436],
          ['wolf-right', 'wolf-right', 644, 362],
          ['basket-right-up', 'basket-right-up', 753, 395],
          ['basket-right-down', 'basket-right-down', 754, 436],
          ['egg-left-up-1', 'egg-left-1', 401, 311],
          ['egg-left-up-2', 'egg-left-2', 428, 320],
          ['egg-left-up-3', 'egg-left-3', 444, 336],
          ['egg-left-up-4', 'egg-left-4', 463, 351],
          ['egg-left-up-5', 'egg-left-5', 489, 367],
          ['egg-left-down-1', 'egg-left-1', 401, 385],
          ['egg-left-down-2', 'egg-left-2', 428, 394],
          ['egg-left-down-3', 'egg-left-3', 444, 410],
          ['egg-left-down-4', 'egg-left-4', 463, 425],
          ['egg-left-down-5', 'egg-left-5', 489, 441],
          ['egg-right-up-1', 'egg-right-1', 892, 324],
          ['egg-right-up-2', 'egg-right-2', 881, 344],
          ['egg-right-up-3', 'egg-right-3', 864, 353],
          ['egg-right-up-4', 'egg-right-4', 852, 358],
          ['egg-right-up-5', 'egg-right-5', 842, 376],
          ['egg-right-down-1', 'egg-right-1', 932, 374],
          ['egg-right-down-2', 'egg-right-2', 911, 394],
          ['egg-right-down-3', 'egg-right-3', 890, 406],
          ['egg-right-down-4', 'egg-right-4', 869, 420],
          ['egg-right-down-5', 'egg-right-5', 842, 436],
          //['bird-left-1', 'bird-left-1', 328, 426],
          ['bird-left-1', 'bird-left-1', 401+96,435+78],
          ['bird-left-2', 'bird-left-2', 401+111,435+50],
          ['bird-left-3', 'bird-left-3', 401+78,435+28],
          ['bird-left-4', 'bird-left-4', 401+42,435+9],
          ['bird-left-5', 'bird-left-5', 401+0,435+0],
          //['bird-right-1', 'bird-right-1', 552, 420],
          ['bird-right-1', 'bird-right-1', 791,518],
          ['bird-right-2', 'bird-right-2', 810, 495],
          ['bird-right-3', 'bird-right-3', 837, 475],
          ['bird-right-4', 'bird-right-4', 871, 460],
          ['bird-right-5', 'bird-right-5', 918, 460],
          ['bird-life-1', 'bird-life', 692, 313],
          ['bird-life-2', 'bird-life', 692 + 40, 313],
          ['bird-life-3', 'bird-life', 692 + 80, 313],
          ['hare', 'hare', 408, 226]
        ];
      }
      if (NuPogodi.city=='zboczek') {
        var spritesData = [
          ['wolf-left', 'wolf-left', 213+354, 143+195],
          ['basket-left-up', 'basket-left-up', 155+354, 171+195],
          ['basket-left-down', 'basket-left-down', 162+354, 233+195],
          ['wolf-right', 'wolf-right', 290+354, 143+195],
          ['basket-right-up', 'basket-right-up', 406+354, 182+195],
          ['basket-right-down', 'basket-right-down', 404+354, 233+195],
          ['egg-left-up-1', 'egg-left-1', 408, 304],
          ['egg-left-up-2', 'egg-left-2', 446, 316],
          ['egg-left-up-3', 'egg-left-3', 465, 327],
          ['egg-left-up-4', 'egg-left-4', 489, 342],
          ['egg-left-up-5', 'egg-left-5', 507, 356],
          ['egg-left-down-1', 'egg-left-1', 408, 385],
          ['egg-left-down-2', 'egg-left-2', 446, 397],
          ['egg-left-down-3', 'egg-left-3', 465, 408],
          ['egg-left-down-4', 'egg-left-4', 489, 423],
          ['egg-left-down-5', 'egg-left-5', 507, 437],
          ['egg-right-up-1', 'egg-right-1', 906, 304],
          ['egg-right-up-2', 'egg-right-2', 877, 316],
          ['egg-right-up-3', 'egg-right-3', 852, 327],
          ['egg-right-up-4', 'egg-right-4', 834, 342],
          ['egg-right-up-5', 'egg-right-5', 815, 356],
          ['egg-right-down-1', 'egg-right-1', 906, 385],
          ['egg-right-down-2', 'egg-right-2', 877, 397],
          ['egg-right-down-3', 'egg-right-3', 852, 408],
          ['egg-right-down-4', 'egg-right-4', 834, 423],
          ['egg-right-down-5', 'egg-right-5', 815, 437],
          //['bird-left-1', 'bird-left-1', 328, 426],
          ['bird-left-1', 'bird-left-1', 490,507],
          ['bird-left-2', 'bird-left-2', 458, 503], // -8, -34
          ['bird-left-3', 'bird-left-3', 428, 490], // -16, +22
          ['bird-left-4', 'bird-left-4', 386, 497], // -24, 0
          ['bird-left-5', 'bird-left-5', 356, 516], // -28, 0
          //['bird-right-1', 'bird-right-1', 552, 420],
          ['bird-right-1', 'bird-right-1', 811, 505],
          ['bird-right-2', 'bird-right-2', 865, 506], // -66 26
          ['bird-right-3', 'bird-right-3', 899, 493], // 30  16
          ['bird-right-4', 'bird-right-4', 935, 509], // 20 0
          ['bird-right-5', 'bird-right-5', 945, 539], // 30 0
          ['bird-life-1', 'bird-life', 692, 263],
          ['bird-life-2', 'bird-life', 692 + 40, 263],
          ['bird-life-3', 'bird-life', 692 + 80, 263],
          ['hare', 'hare', 464, 228]
        ];
      }

        // adding all sprites using in game
        for (var i = 0; i < spritesData.length; i++) {
            this.sprites[spritesData[i][0]] =
                    this.game.add.sprite(
                            spritesData[i][2],
                            spritesData[i][3],
                            spritesData[i][1]
                            );
            // All are killed. We refresh them during the game.
            this.sprites[spritesData[i][0]].kill();
        }

        var audioData = [
            'basket',
            'egg-crash',
            'egg-left-up',
            'egg-left-down',
            'egg-right-up',
            'egg-right-down',
            'egg-left-1',
            'egg-left-2',
            'egg-left-3',
            'egg-left-4',
            'egg-left-5',
            'game-over',
            'bird'
        ];

        // adding all sounds using in game
        for (var i = 0; i < audioData.length; i++) {
            this.audio[audioData[i]] = this.game.add.audio(audioData[i]);
        }

        // adding text showing actual score
        this.score.savedText = this.game.add.text(670, 240, "0", {
            font: "36px lets_go_digitalregular",
            fill: "#000000",
            align: "right"
        });
        this.score.resetScore();

        this.wolf.render();

        var left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        var right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        var up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        var down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        left.onDown.add(this.wolf.moveWolfLeft, this.wolf);
        right.onDown.add(this.wolf.moveWolfRight, this.wolf);
        up.onDown.add(this.wolf.moveBasketUp, this.wolf);
        down.onDown.add(this.wolf.moveBasketDown, this.wolf);

        var btn_ld = this.game.add.button(115, 634, 'button-left-down', this.actionButtonLeftDown, this, 0, 0, 1);
        var btn_lu = this.game.add.button(120, 497, 'button-left-up', this.actionButtonLeftUp, this, 0, 0, 1);
        var btn_rd = this.game.add.button(1141, 633, 'button-right-down', this.actionButtonRightDown, this, 0, 0, 1);
        var btn_ru = this.game.add.button(1140, 490, 'button-right-up', this.actionButtonRightUp, this, 0, 0, 1);

        // setting timers for begin the game
        this.newEggTimer = this.game.time.now + 1000;
        this.eggMoveTimer = this.game.time.now + 1300;
        this.animationsTimer = this.game.time.now + 2500;
        this.hareShowTimer = this.game.time.now + 5000;

        left.onDown.add(function() {
            if (this.basketPosition) {
              btn_lu.setFrames(1,1,1);
            } else {
              btn_ld.setFrames(1,1,1);
            }
        },this.wolf)
        left.onUp.add(function() {
          btn_lu.setFrames(0, 0, 1);
          btn_ld.setFrames(0, 0, 1);
        })

      right.onDown.add(function() {
        if (this.basketPosition) {
          btn_ru.setFrames(1,1,1);
        } else {
          btn_rd.setFrames(1,1,1);
        }
      },this.wolf)
      right.onUp.add(function() {
        btn_ru.setFrames(0, 0, 1);
        btn_rd.setFrames(0, 0, 1);
      })

      up.onDown.add(function() {
        if (this.wolfPosition) {
          btn_ru.setFrames(1,1,1);
        } else {
          btn_lu.setFrames(1,1,1);
        }
      },this.wolf)
      up.onUp.add(function() {
        btn_ru.setFrames(0, 0, 1);
        btn_lu.setFrames(0, 0, 1);
      })

      down.onDown.add(function() {
        if (this.wolfPosition) {
          btn_rd.setFrames(1,1,1);
        } else {
          btn_ld.setFrames(1,1,1);
        }
      },this.wolf)
      down.onUp.add(function() {
        btn_rd.setFrames(0, 0, 1);
        btn_ld.setFrames(0, 0, 1);
      })

    },
    /**
     * Setup operations for Game state
     * 
     * @method NuPogodi.GameState#update
     * @see Phaser.State#update
     */
    update: function() {

        if (this.game.time.now > this.newEggTimer) {
            var added = this.eggs.addNewEgg();
            var factor = this.factor();
            this.newEggTimer = this.game.time.now
                    + (1250 - (1250 * factor))
                    + ((added) ? this.eggs.length * (250 - (250 * factor)) : 0);
        }

        if (this.game.time.now > this.eggMoveTimer) {
            //console.log('saved eggs: '+this.score.savedEggs);
            var moved = this.eggs.moveNextEgg();
            this.eggMoveTimer = this.game.time.now
                    + ((moved) ? ((1000 - (1000 * this.factor())) / this.eggs.length + 1) : 0);
            //console.log('saved eggs: '+this.score.savedEggs)
            //console.log('moved: '+moved);
        }


        if ((this.animations.length > 0)
                && (this.game.time.now > this.animationsTimer)) {
            for (var i = 0; i < this.animations.length; i++) {
                this.animations[i].move();
                this.animationsTimer = this.game.time.now + 600;
            }
        }

        if (this.game.time.now > this.hareShowTimer) {

            this.animations.push(new NuPogodi.Hare(this));
            this.hareShowTimer = this.game.time.now + 15000 + 10000 * (Math.random());

        }

    },
    /**
     * Function for end game and start menu state.
     * 
     * @method NuPogodi.GameState#endGame
     */
    endGame: function() {
        // it's clear all keyboards actions before change state
        this.game.input.keyboard.clearCaptures()

        // setting timers to avoid problems in another game
        this.newEggTimer = this.game.time.now + 10000;
        this.eggMoveTimer = this.game.time.now + 10000;
        this.birdMoveTimer = this.game.time.now + 10000;

        // score for display in MenuState
        NuPogodi.score = this.score.savedEggs;

        this.game.state.start('Menu');
    },
    /**
     * Callback for button.
     * 
     * @method NuPogodi.GameState#actionButtonLeftDown
     */
    actionButtonLeftDown: function() {
        this.wolf.moveWolfLeft();
        this.wolf.moveBasketDown();
    },
    /**
     * Callback for button.
     * 
     * @method NuPogodi.GameState#actionButtonLeftUp
     */
    actionButtonLeftUp: function() {
        this.wolf.moveWolfLeft();
        this.wolf.moveBasketUp();
    },
    /**
     * Callback for button.
     * 
     * @method NuPogodi.GameState#actionButtonRightDown
     */
    actionButtonRightDown: function() {
        this.wolf.moveWolfRight();
        this.wolf.moveBasketDown();
    },
    /**
     * Callback for button.
     * 
     * @method NuPogodi.GameState#actionButtonRightUp
     */
    actionButtonRightUp: function() {
        this.wolf.moveWolfRight();
        this.wolf.moveBasketUp();
    },
    /**
     * Method for calcualting factor for timers. Factor is using for calculate 
     * timers for new egg end move egg. 143 level is limit, later log() give to higher value
     * 
     * @method NuPogodi.GameState#factor
     * @return {number} factor for calcualte timers.
     */
    factor: function() {
        return (this.score.level < 143) ? (Math.log(this.score.level + 1) / 5) : 0.99;
    }
};
