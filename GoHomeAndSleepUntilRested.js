class GoHomeAndSleepUntilRested extends State {
    // Singleton
    static m_pInstance = new GoHomeAndSleepUntilRested();

    constructor() {
        super();

        this.SleepLines = new WeightedRandomSelector();
        this.SleepLines.AddItem("zzzZZzzZz...", 0.4);
        this.SleepLines.AddItem("zzZz..ZZzzzZz..", 0.4);
        this.SleepLines.AddItem("zzZzz..beard.braided..zzZz..in.gold..zZZZz..", 0.02);
        this.SleepLines.AddItem("zzZz..gold...maidens..power...zZZZz..", 0.02);
        this.SleepLines.AddItem("zzZZZzZZz..mmm...river..of.ale..ZzzZz..", 0.02);
        this.SleepLines.AddItem("zzZ..neverendin..mug...must..find..ZzzZz..", 0.02);
        this.SleepLines.AddItem("zzZZzz..get...off..me..you.foul..beast...zZz..", 0.02);
    }
    
    static Instance(){
        return GoHomeAndSleepUntilRested.m_pInstance;
    }

    Enter(dwarf){
        ConsoleLog(dwarf, "These bones be achin', time to head back to mah nest to rest");
    }

    Execute(dwarf){
        dwarf.IncreaseEnergy(2);
        ConsoleLog(dwarf, this.SleepLines.GetRandomItem());

        if(dwarf.IsFullyRested()){
            dwarf.m_pStateMachine.ChangeState(EnterMineAndDigForNugget.Instance());
        }
    }

    Exit(dwarf){
        ConsoleLog(dwarf, "What a god-darn spankin' nap! Leavin mah home");
    }

}