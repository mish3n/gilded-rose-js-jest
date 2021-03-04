const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
    it.each([
        ["foo", 0, 0, -1, 0],
        ["foo", 1, 10, 0, 9],
        ["foo", 0, 10, -1, 8],
        ["Aged Brie", 1, 10, 0, 11],
        ["Aged Brie", 0, 10, -1, 12],
        ["Aged Brie", 0, 49, -1, 50],
        ["Sulfuras, Hand of Ragnaros", 0, 49, 0, 49],
        ["Backstage passes to a TAFKAL80ETC concert", 11, 10, 10, 11],
        ["Backstage passes to a TAFKAL80ETC concert", 10, 10, 9, 12],
        ["Backstage passes to a TAFKAL80ETC concert", 5, 10, 4, 13],
        ["Backstage passes to a TAFKAL80ETC concert", 1, 10, 0, 13],
        ["Backstage passes to a TAFKAL80ETC concert", 1, 48, 0, 50],
        ["Backstage passes to a TAFKAL80ETC concert", 0, 48, -1, 0],
    ])("%p (si: %p, q: %p) => (esi: %p, eq: %p)", function(name, sellIn, quality, expectedSellIn, expectedQuality) {
        const gildedRose = new Shop([new Item(name, sellIn, quality)]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).toBe(name);
        expect(items[0].sellIn).toBe(expectedSellIn);
        expect(items[0].quality).toBe(expectedQuality);
    });
});
