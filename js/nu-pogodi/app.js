/* 
 * @projectDescription NuPogodi HTML5 Game
 *
 * @version 0.0.1
 * @author Paweł Winiecki <pawel.winiecki@nerdlab.pl>
 * @copyright 2014 NerdLab.pl
 * @license MIT License
 * 
 */

var NuPogodi = NuPogodi || {};

(function() {
    "use strict";
    
    window.createGame = function(city) {

        // Creating Phaser Game object
        NuPogodi.game = new Phaser.Game(1350, 808, Phaser.AUTO, 'board', null, true, true);
        if (typeof city == 'undefined') {
            city = 'gdansk';
        }

        NuPogodi.city = city // Gdańsk Gdynia Poznan

        // Adding States to Game
        NuPogodi.game.state.add('Boot', NuPogodi.BootState);
        NuPogodi.game.state.add('Preload', NuPogodi.PreloadState);
        NuPogodi.game.state.add('Menu', NuPogodi.MenuState);
        NuPogodi.game.state.add('Game', NuPogodi.GameState);

        // Starting whole game with Boot State
        NuPogodi.game.state.start('Boot');

        //document.querySelectorAll('#board')[0].className = NuPogodi.city;


    };
})();

