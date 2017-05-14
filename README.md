# audiobo
Music streamer

### Build prerequisites
* Java
* Maven
* node/npm
* angular-cli

### Build instructions
    cd ui
    npm install
    ng build --prod --aot
    cd ../api
    mvn clean install

The jar file will be generated in api/target.