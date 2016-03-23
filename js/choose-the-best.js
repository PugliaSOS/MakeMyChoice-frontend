//produces an ordered list 
function addPriority(items) {
    for(var i in items) {
      items[i].priority = 0;
    }
    return items;
}

//Find the priority of each interested product
function findPriority(value, max, min) {
    return ((value - min) * 10 / (max - min));
}

function chooseTheBest(products, preferences) {
    
    /*Assign priority 0 to each product in the list*/
    products = addPriority(products);

    /*For each feature(ram, camera, ecc)*/
    for(var feature in preferences) {
        if( feature !== "price") {
            /*Find the max value of the analyzed feature*/
            var max = _.maxBy(products, function(o) { 
                return o.features[feature]; 
            });
            max = max.features[feature];
           
            /*Find the max value of the analyzed feature*/
            var min = _.minBy(products, function(o) { 
                return o.features[feature]; 
            });
            min = min.features[feature];
        }
        
        for(var product in products) {
            if(feature === "price") 
                products[product].priority += 
                    preferences[feature] / products[product].features[feature];
    
            else
                products[product].priority += 
                    preferences[feature] * 
                    findPriority(
                        products[product].features[feature], max, min
                    );
        }  
    }
    
    return _.sortBy(products, function(o) { return o.priority; }).reverse();
}

