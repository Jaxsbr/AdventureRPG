class GameTime {
    public delta: number = 0;
    private previousLoopTime: number = Date.now();

    update() {
        var currentTime = Date.now();
        var delta = currentTime - this.previousLoopTime;
        this.delta = delta / 1000;
        this.previousLoopTime = currentTime;
    }
}