class EnemyEngine {
    map: Map;
    game: Game;

    enemies: Enemy[] = [];
    relevantEnemyIndexes: number[] = [];

    encounteredEnemy: Enemy;

    constructor(map: Map, game: Game) {
        this.map = map;
        this.game = game;

        // TEMP
        this.enemies.push(new Enemy(this.map, this.map.collisionGrid[5][5], this.game.assetManager));
        this.enemies.push(new Enemy(this.map, this.map.collisionGrid[7][6], this.game.assetManager));
    }

    udpate(delta: number) {
        if (this.encounteredEnemy != null) { return; }
        this.udpateRelevantEnemies(delta)
    }

    udpateRelevantEnemies(delta: number) {
        this.relevantEnemyIndexes = [];

        // TEMP: take all
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.isRelevant(i)) {
                this.relevantEnemyIndexes.push(i);
                this.enemies[i].udpate(delta);

                // If player encountered and enemy we stop normal updates
                if (this.encounteredEnemy != null) { break; }
            }
        }
    }

    playerEncountered(enemy: Enemy) {      
        this.encounteredEnemy = enemy;  
        this.game.stateManager.changeGameState(this.game.matchState);
    }

    isRelevant(index: number) {
        // Find relevant enemies in player area.
        // This area is usual enemies in screen view or proximity to player.
        return true;
    }

    resize() {
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].setPosition();
        }
    }
        
    render(context: CanvasRenderingContext2D) {
        for (let i = 0; i < this.relevantEnemyIndexes.length; i++) {
            let index = this.relevantEnemyIndexes[i];
            this.enemies[index].render(context);
        }
    }
}