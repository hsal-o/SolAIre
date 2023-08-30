class Ore {
    constructor(Name, Cost) {
        this.Name = Name;
        this.Cost = Cost;
    }

    GetName() {
        return this.Name;
    }

    GetCost() {
        return this.Cost;
    }
}

const OreTypes = {
    NovaCrystal: new Ore('NovaCrystal Ore', 250),
    EchoPearl: new Ore('EchoPearl Ore', 250),
    WyrmHeart: new Ore('WyrmHeart Ore', 250),
    StarSteel: new Ore('StarSteel Ore', 250),
    Gold: new Ore('Gold Ore', 8),
    Quartzite: new Ore('Quartzite Ore', 2),
    FlintIron: new Ore('FlintIron Ore', 1),
    PlainStone: new Ore('PlainStone Ore', 1),
}

class Backpack {
    constructor() {
        this.SizeLimit = 24;
        this.TotalOreCount = 0;
        this.CarriedOresCount = new Map();
    }

    GetItems() {
        return this.CarriedOresCount;
    }

    IsFull() {
        return this.TotalOreCount >= this.SizeLimit;
    }

    IsEmpty() {
        return this.TotalOreCount <= 0;
    }

    GetCurrentSize() {
        return this.TotalOreCount;
    }

    GetSizeLimit() {
        return this.SizeLimit;
    }

    IncreaseSizeLimit(Amount) {
        this.SizeLimit += Amount;
    }

    AddOre(OreType, Amount) {
        if (this.CarriedOresCount.has(OreType)) {
            const CurrentOreCount = this.CarriedOresCount.get(OreType);
            this.CarriedOresCount.set(OreType, CurrentOreCount + Amount);
        } else {
            this.CarriedOresCount.set(OreType, Amount);
        }
        this.TotalOreCount += Amount;

        document.getElementById(OreType.Name).textContent = this.CarriedOresCount.get(OreType);

        this.UpdateUI();
    }

    RemoveOre(OreType, Amount) {
        if (this.CarriedOresCount.has(OreType)) {
            const CurrentOreCount = this.CarriedOresCount.get(OreType);
            this.CarriedOresCount.set(OreType, CurrentOreCount - Amount);
            this.TotalOreCount -= Amount;

            if (CurrentOreCount - Amount == 0) {
                this.CarriedOresCount.delete(OreType);
                document.getElementById(OreType.Name).textContent = 0;
            } else {
                document.getElementById(OreType.Name).textContent = this.CarriedOresCount.get(OreType);
            }
        } 

        this.UpdateUI();
    }

    RemoveAllOfOre(OreType) {
        if (this.CarriedOresCount.has(OreType)) {
            const CurrentOreCount = this.CarriedOresCount.get(OreType);
            //this.CarriedOresCount.set(OreType, 0);
            this.CarriedOresCount.delete(OreType);
            this.TotalOreCount -= CurrentOreCount;

            document.getElementById(OreType.Name).textContent = 0;
        } 

        this.UpdateUI();
    }

    UpdateUI() {
        document.getElementById("CountDisplay").textContent = `${this.TotalOreCount}/${this.SizeLimit}`;
    }
}

class Dwarf extends BaseGameEntity{
    constructor(id){
        super(id);

        this.Name = "Dwarf Bilbo";
        this.GoldCarried = 0;
        this.PocketLimit = 10;
        this.MoneyInBank = 0;
        this.MaxHunger = 16;
        this.Hunger = this.MaxHunger;
        this.MaxThirst = 16;
        this.Thirst = this.MaxThirst;
        this.MaxEnergy = 16;
        this.Energy = this.MaxEnergy;

        this.Backpack = new Backpack();

        this.UpdateUI();
        
        this.m_pStateMachine = new StateMachine(this);
        this.m_pStateMachine.SetCurrentState(EnterMineAndDigForNugget.Instance());
    }

    Update(){
        this.m_pStateMachine.Update();
        this.UpdateUI();
    }

    UpdateUI(){
        document.getElementById("GoldCarried").textContent = this.GoldCarried;
        document.getElementById("PocketLimit").textContent = this.PocketLimit;
        document.getElementById("MoneyInBank").textContent = this.MoneyInBank;
        document.getElementById("HungerDisplay").textContent = `${this.Hunger}/${this.MaxHunger}`;
        document.getElementById("ThirstDisplay").textContent = `${this.Thirst}/${this.MaxThirst}`;
        document.getElementById("EnergyDisplay").textContent = `${this.Energy}/${this.MaxEnergy}`;
    }

    AddToGoldCarried(Amount){
        this.GoldCarried += Amount;

        //document.getElementById("GoldCarried").textContent = this.GoldCarried;
    }
    
    IncreaseEnergy(Amount){
        this.Energy += Amount;

        //document.getElementById("Energy").textContent = this.Energy;
    }

    DecreaseEnergy(){
        this.Energy--;

        //document.getElementById("Energy").textContent = this.Energy;
    }

    DepositGoldInBank(){
        this.MoneyInBank += this.GoldCarried;
        this.GoldCarried = 0;

        //document.getElementById("MoneyInBank").textContent = this.MoneyInBank;
        //document.getElementById("GoldCarried").textContent = this.GoldCarried;
    }

    GetBackpack() {
        return this.Backpack;
    }

    GetTotalSavings(){
        return this.MoneyInBank;
    }

    HasBackpackFull() {
        return this.Backpack.IsFull();
    }

    HasBackpackEmpty() {
        return this.Backpack.IsEmpty();
    }

    HasPocketsFull(){
        return this.GoldCarried >= this.PocketLimit;
    }

    IsExhausted(){
        return this.Energy <= 0;
    }

    IsFullyRested(){
        return this.Energy >= this.MaxEnergy;
    }

    GetName(){
        return this.Name;
    }

}