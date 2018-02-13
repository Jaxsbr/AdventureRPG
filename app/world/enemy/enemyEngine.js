var EnemyEngine = (function () {
    function EnemyEngine(map, game) {
        this.enemies = [];
        this.relevantEnemyIndexes = [];
        this.map = map;
        this.game = game;
        // TEMP
        this.enemies.push(new Enemy(this.map, this.map.collisionGrid[5][5], this.game.assetManager));
        this.enemies.push(new Enemy(this.map, this.map.collisionGrid[7][6], this.game.assetManager));
    }
    EnemyEngine.prototype.udpate = function (delta) {
        if (this.encounteredEnemy != null) {
            return;
        }
        this.udpateRelevantEnemies(delta);
    };
    EnemyEngine.prototype.udpateRelevantEnemies = function (delta) {
        this.relevantEnemyIndexes = [];
        // TEMP: take all
        for (var i = 0; i < this.enemies.length; i++) {
            if (this.isRelevant(i)) {
                this.relevantEnemyIndexes.push(i);
                this.enemies[i].udpate(delta);
                // If player encountered and enemy we stop normal updates
                if (this.encounteredEnemy != null) {
                    break;
                }
            }
        }
    };
    EnemyEngine.prototype.playerEncountered = function (enemy) {
        this.encounteredEnemy = enemy;
        this.game.stateManager.changeGameState(this.game.matchState);
    };
    EnemyEngine.prototype.isRelevant = function (index) {
        // Find relevant enemies in player area.
        // This area is usual enemies in screen view or proximity to player.
        return true;
    };
    EnemyEngine.prototype.resize = function () {
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].setPosition();
        }
    };
    EnemyEngine.prototype.render = function (context) {
        for (var i = 0; i < this.relevantEnemyIndexes.length; i++) {
            var index = this.relevantEnemyIndexes[i];
            this.enemies[index].render(context);
        }
    };
    return EnemyEngine;
}());
//# sourceMappingURL=enemyEngine.js.map