class VisitBankAndDepositGold extends State {
    // Singleton
    static m_pInstance = new VisitBankAndDepositGold();
    
    static Instance(){
        return VisitBankAndDepositGold.m_pInstance;
    }

    Enter(dwarf){
        ConsoleLog(dwarf, "Goin' to the bank, yes siree");
    }

    Execute(dwarf){
        dwarf.DepositGoldInBank();

        ConsoleLog(dwarf, "Depositin' mah gold. Total savings now: " + dwarf.GetTotalSavings());

        if(dwarf.IsExhausted()){
            dwarf.m_pStateMachine.ChangeState(GoHomeAndSleepUntilRested.Instance());
        } else {
            dwarf.m_pStateMachine.ChangeState(EnterMineAndDigForNugget.Instance());
        }
    }

    Exit(dwarf){
        ConsoleLog(dwarf, "Woohoo! Rich enuff' fo' now, leavin' tha bank");
    }
}