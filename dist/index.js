'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const start_1 = require("./start");
start_1.start()
    .catch((err) => {
    // tslint:disable-next-line:no-console
    console.error(`Error starting server: ${err.message}`);
    process.exit(-1);
});
