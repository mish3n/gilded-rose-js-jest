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
            let updateFn = itemUpdateMap[this.items[i].name];
            if (!updateFn) {
                updateFn = this.updateRegularItemQuality;
            }
            
            updateFn(this.items[i]);
        }

        return this.items;
    }
    
    updateSulfurasQuality(item) {
    }

    updateConjuredQuality(item) {
        --item.sellIn;
        item.quality -= 2;

        if (item.sellIn < 0) {
            item.quality -= 2;
        }

        item.quality = Math.max(0, item.quality);
    }

    updateRegularItemQuality(item) {
        if (item.quality > 0) {
            --item.quality;
        }

        --item.sellIn;

        if (item.sellIn < 0) {
            if (item.quality > 0) {
                --item.quality;
            }
        }
    }

    updateBackstagePassQuality(item) {
        if (item.quality < 50) {
            ++item.quality;

            if (item.sellIn < 11) {
                if (item.quality < 50) {
                    ++item.quality;
                }
            }
            if (item.sellIn < 6) {
                if (item.quality < 50) {
                    ++item.quality;
                }
            }
        }

        --item.sellIn;

        if (item.sellIn < 0) {
            item.quality = 0;
        }
    }

    updateAgedBrie(item) {
        if (item.quality < 50) {
            ++item.quality;
        }

        --item.sellIn;

        if (item.sellIn < 0) {
            if (item.quality < 50) {
                ++item.quality;
            }
        }
    }
}

module.exports = {
    Item,
    Shop
}
