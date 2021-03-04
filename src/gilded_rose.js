class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

class Shop {
    constructor(items = []) {
        this.items = items;
    }

    updateQuality() {
        const itemUpdateMap = {
            "Sulfuras, Hand of Ragnaros": this.updateSulfurasQuality,
            "Aged Brie": this.updateAgedBrie,
            "Backstage passes to a TAFKAL80ETC concert": this.updateBackstagePassQuality,
            "Conjured": this.updateConjuredQuality,
        };

        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];

            let updateFn = itemUpdateMap[item.name];
            if (!updateFn) {
                updateFn = this.updateRegularItemQuality;
            }
            
            updateFn(this.items[i]);
            item.quality = Math.max(0, item.quality);
            item.quality = Math.min(50, item.quality);
        }

        return this.items;
    }
    
    updateSulfurasQuality() {
    }

    updateConjuredQuality(item) {
        --item.sellIn;
        item.quality -= 2;

        if (item.sellIn < 0) {
            item.quality -= 2;
        }
    }

    updateRegularItemQuality(item) {
        --item.quality;

        --item.sellIn;

        if (item.sellIn < 0) {
            --item.quality;
        }
    }

    updateBackstagePassQuality(item) {
        ++item.quality;

        if (item.sellIn < 11) {
            ++item.quality;
        }
        
        if (item.sellIn < 6) {
            ++item.quality;
        }

        --item.sellIn;

        if (item.sellIn < 0) {
            item.quality = 0;
        }
    }

    updateAgedBrie(item) {
        ++item.quality;

        --item.sellIn;

        if (item.sellIn < 0) {
            ++item.quality;
        }
    }
}

module.exports = {
    Item,
    Shop
}
