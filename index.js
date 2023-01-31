const app = require("./app");
require ("./src/database");
const main = () =>{
    app.listen(8000,()=>console.log("magni-demaria inicida en puerto 8000"));
}

main();