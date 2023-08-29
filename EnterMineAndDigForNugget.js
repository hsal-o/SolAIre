class EnterMineAndDigForNugget extends State {
    // Singleton
    static m_pInstance = new EnterMineAndDigForNugget();

    constructor() {
        super();

        this.OreBlock = new WeightedRandomSelector();
        this.OreBlock.AddItem(OreTypes.NovaCrystal, 0.005);
        this.OreBlock.AddItem(OreTypes.EchoPearl, 0.005);
        this.OreBlock.AddItem(OreTypes.WyrmHeart, 0.005);
        this.OreBlock.AddItem(OreTypes.StarSteel, 0.005);
        this.OreBlock.AddItem(OreTypes.Gold, 0.18);
        this.OreBlock.AddItem(OreTypes.Quartzite, 0.25);
        this.OreBlock.AddItem(OreTypes.FlintIron, 0.25);
        this.OreBlock.AddItem(OreTypes.PlainStone, 0.3);
    }
    
    static Instance(){
        return EnterMineAndDigForNugget.m_pInstance;
    }

    Enter(dwarf){
        ConsoleLog(dwarf, "im'a dwarf, gonna head to the mine to dig'");
    }

    Execute(dwarf) {
        dwarf.DecreaseEnergy();

        const MinedOre = this.OreBlock.GetRandomItem();
        const Amount = 1;
        dwarf.Backpack.AddOre(MinedOre, Amount);

        ConsoleLog(dwarf, "Strikin' my pick n' picked up " + Amount + " " + MinedOre.GetName());


        if (dwarf.HasBackpackFull()) {
            dwarf.m_pStateMachine.ChangeState(GoTradeOresForGold.Instance());
        } else if (dwarf.IsExhausted()) {
            dwarf.m_pStateMachine.ChangeState(GoHomeAndSleepUntilRested.Instance());
        }
    }


    //Execute(dwarf){
    //    dwarf.AddToGoldCarried(1);
    //    dwarf.DecreaseEnergy();

    //    console.log("Strikin' my pick n' pickin' up a nugget");
    //    ConsoleLog(dwarf, "Strikin' my pick n' pickin' up a nugget");

    //    if(dwarf.HasPocketsFull()){
    //        dwarf.m_pStateMachine.ChangeState(VisitBankAndDepositGold.Instance());
    //    }

    //    if(dwarf.IsExhausted()){
    //        dwarf.m_pStateMachine.ChangeState(GoHomeAndSleepUntilRested.Instance());
    //    }
    //}

    Exit(dwarf){
        ConsoleLog(dwarf, "Ah'm leavin' the mine with mah pockets ful o' sweet gold");
    }

}