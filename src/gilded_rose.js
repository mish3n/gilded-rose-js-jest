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
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name === "Sulfuras, Hand of Ragnaros") {
                this.updateSulfurasQuality(i);
            } else if (this.items[i].name === "Aged Brie") {
                this.updateAgedBrie(i);
            } else if(this.items[i].name === "Backstage passes to a TAFKAL80ETC concert") {
                this.updateBackstagePassQuality(i);
            } else if (this.items[i].name === "Conjured") {
                this.updateConjuredQuality(i);
            } else {
                this.updateRegularItemQuality(i);
            }
        }

        return this.items;
    }
    
    updateSulfurasQuality(i) {
    }

    updateConjuredQuality(i) {
        --this.items[i].sellIn;
        this.items[i].quality -= 2;

        if (this.items[i].sellIn < 0) {
            this.items[i].quality -= 2;
        }

        this.items[i].quality = Math.max(0, this.items[i].quality);
    }

    updateRegularItemQuality(i) {
        if (this.items[i].quality > 0) {
            --this.items[i].quality;
        }

        --this.items[i].sellIn;

        if (this.items[i].sellIn < 0) {
            if (this.items[i].quality > 0) {
                --this.items[i].quality;
            }
        }
    }

    updateBackstagePassQuality(i) {
        if (this.items[i].quality < 50) {
            ++this.items[i].quality;

            if (this.items[i].sellIn < 11) {
                if (this.items[i].quality < 50) {
                    ++this.items[i].quality;
                }
            }
            if (this.items[i].sellIn < 6) {
                if (this.items[i].quality < 50) {
                    ++this.items[i].quality;
                }
            }
        }

        --this.items[i].sellIn;

        if (this.items[i].sellIn < 0) {
            this.items[i].quality = 0;
        }
    }

    updateAgedBrie(i) {
        if (this.items[i].quality < 50) {
            ++this.items[i].quality;
        }

        --this.items[i].sellIn;

        if (this.items[i].sellIn < 0) {
            if (this.items[i].quality < 50) {
                ++this.items[i].quality;
            }
        }
    }
}

module.exports = {
    Item,
    Shop
}
