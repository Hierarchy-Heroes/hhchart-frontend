const http = require("http");
const url = require("url");

const rand = length => {
    var result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
};

const generateTree = size => {
    if (size < 1) return null;

    let root = {
        firstName: rand(12),
        lastName: rand(12),
        email: rand(25),
        picture: rand(30),
        position: rand(30),
        children: []
    }

    let nodesLeft = size - 1;
    let queue = [root];

    while (nodesLeft > 0 && queue.length > 0) {
        let node = queue[0];

        queue.shift();

        let foo = [];
        for (let i = 0; i < Math.min(nodesLeft, 5); ++i) {
            foo.push({
                firstName: rand(12),
                lastName: rand(12),
                email: rand(25),
                picture: rand(30),
                position: rand(30),
                children: []
            });

            nodesLeft--;
        }

        node.children = foo;
        foo.forEach(a => {
            queue.push(a);
        });
    }

    return root;
};

http.createServer((request, response) => {
    const q = url.parse(request.url, true).query;

    response.write(JSON.stringify(generateTree(q.size)));
    response.end();
}).listen(9000);
