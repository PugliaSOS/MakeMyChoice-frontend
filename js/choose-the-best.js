//produces an ordered list 
function getList(items) {
    var list = [];
    for(var i in items) {
        list.push({
            item : items[i],
            priority : 0
        });
    }
    return list;
}

//Find the priority of each interested product
function findPriority(value, max, min) {
    return ((value - min) * 10 / (max - min));
}

function chooseTheBest (products, preferences) {

    var list = getList(products);

    for(var feature in preferences) {
        var temp = {
            feature: preferences[feature],
            item: null
        };
        for(var i in list) {
            if(list[i].item.features[feature] >= temp.feature) {
                temp.feature = list[i].item.features[feature];
                temp.item = i;
            }
        }
        if(temp.item != null) {
            list[temp.item].priority++;
        }
    }

    _.sortBy(list, function(o){ return o.priority });

    return list;
}