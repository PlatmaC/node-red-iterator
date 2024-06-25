module.exports = function(RED) {
    function IteratorNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        const interval = config.interval;

        node.on('input', function(msg) {
            let currentCount = 0;
            const count = msg.count || config.count;
            function triggerFlow() {
                if (currentCount < count) {
                    msg.iteration = currentCount + 1;
                    node.send([msg, null]);
                    currentCount++;
                    node.status({fill:"blue", shape:"dot", text:"Count: " + currentCount + " of:" + count});
                    setTimeout(triggerFlow, interval);
                } else {
                    msg.iteration = "complete";
                    node.status({fill:"green", shape:"dot", text:"Completed"});
                    node.send([msg, null]);
                }
            }

            triggerFlow();
        });
    }
    RED.nodes.registerType('iterator', IteratorNode);
};
