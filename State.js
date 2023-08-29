class State{
    constructor() {}

    Enter(entity) { throw new Error("Method 'Enter' must be implemented."); }
    Execute(entity) { throw new Error("Method 'Execute' must be implemented."); }
    Exit(entity) { throw new Error("Method 'Exit' must be implemented."); }
}