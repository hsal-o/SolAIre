class Vendor {
    BuyFrom(Seller, OreType, Amount) {

        let PayAmount = OreType.GetCost() * Amount;

        ConsoleLog(Seller, "Sold " + Amount + " " + OreType.Name + " to Vendor for " + PayAmount + " gold nuggets");

        Seller.GetBackpack().RemoveOre(OreType, Amount);
        Seller.AddToGoldCarried(PayAmount);
    }
}

class GoTradeOresForGold extends State {
    // Singleton
    static m_pInstance = new GoTradeOresForGold();

    static Instance() {
        return GoTradeOresForGold.m_pInstance;
    }

    constructor() {
        super();

        this.LocalVendor = new Vendor();
    }

    Enter(dwarf) {
        ConsoleLog(dwarf, "Headin' ov'r to tha Tradin' Tarps to trade me some gold");
    }

    Execute(dwarf) {

        if (!dwarf.HasBackpackEmpty()) {
            const keysArray = Array.from(dwarf.GetBackpack().GetItems().keys());
            const randomIndex = Math.floor(Math.random() * keysArray.length);
            const randomKey = keysArray[randomIndex];
            const randomValue = dwarf.GetBackpack().GetItems().get(randomKey);

            this.LocalVendor.BuyFrom(dwarf, randomKey, randomValue);
        } else {

            ConsoleLog(dwarf, "There ya go, mah bag be empty now yesiree");

            dwarf.m_pStateMachine.ChangeState(VisitBankAndDepositGold.Instance());
        }

        
    }

    Exit(dwarf) {
        ConsoleLog(dwarf, "Nuff tradin' fo' me, got me some sweet gold");
    }

}