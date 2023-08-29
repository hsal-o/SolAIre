class WeightedRandomSelector {

    constructor() {
        this.Items = [];
        this.TotalWeight = 0;
    }

    AddItem(Item, Weight) {
        this.Items.push({ Item, Weight });
        this.TotalWeight += Weight;
    }

    GetRandomItem() {
        // Calculate random decimal number from (0 , 1]
        let RandomNumber = Math.random() * this.TotalWeight;

        for (const { Item, Weight } of this.Items) {
            // If the current item's weight covers the random number
            if (RandomNumber < Weight) {
                // Return item
                return Item;
            }

            // decrease randomnumber to account for next weight
            RandomNumber -= Weight;
        }

        throw new Error("No Items to select from.");
    }
}