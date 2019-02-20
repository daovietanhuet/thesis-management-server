const Client = require('./clients');

class VNUSystemClient extends Client {
    constructor(){
        super("VNU_SYSTEM")
        VNUSystemClient.instance = this
        return VNUSystemClient.instance
    }
}

const VNUSystemClient = new VNUSystemClient();
Object.freeze(VNUSystemClient);

module.exports = VNUSystemClient