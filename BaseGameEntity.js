class BaseGameEntity {
    constructor(id) {
        this.SetID(id);
    }

    SetID(val){
        this.m_ID = val;
    }

    Update() { throw new Error("Method 'Update' must be implemented."); }

    ID() { return this.m_ID; }
}