class StateMachine {
    constructor(owner){
        this.m_pOwner = owner;
        this.m_pCurrentState = null;
        this.m_pPreviousState = null;
    }

    SetCurrentState(s){
        this.m_pCurrentState = s;
    }

    SetPreviousState(s){
        this.m_pPreviousState = s;
    }

    Update(){
        if(this.m_pCurrentState){
            this.m_pCurrentState.Execute(this.m_pOwner);
        }
    }

    ChangeState(pNewState){
        if (!pNewState) {
            throw new Error("<StateMachine::changeState>: trying to change to a null state");
        }

        // Keep record of previous state
        this.m_pPreviousState = this.m_pCurrentState;

        // Call the exit method of the existing state
        this.m_pCurrentState.Exit(this.m_pOwner);

        // Change state to new state
        this.m_pCurrentState = pNewState;

        // Call the entry method of the new state
        this.m_pCurrentState.Enter(this.m_pOwner);
    }

    RevertToPreviousState(){
        this.ChangeState(this.m_pPreviousState);
    }

    // Accessors
    CurrentState() { return this.m_pCurrentState; }
    PreviousState() { return this.m_pCurrentState; }

}