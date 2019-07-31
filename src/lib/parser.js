const EventEmitter = require('events');
const sliceFile = require('slice-file');

class SvxlinkParser extends EventEmitter {
	constructor(path) {
		super()

		//console.log("Constructor SvxlinkParser")
		const sf = sliceFile(path)
		sf.follow(0).on('data', line => {
			line = line.toString('utf8')
			//console.log(line)
			const log = line.split(': ')

			var event = "";
			if (log[1].startsWith('ReflectorLogic')) {
				switch (log[2]) {
					case "Connected nodes":
						event = "MsgNodeList";
						//console.log(line)
						//console.log(log[3])
						break;
					case "Node joined":
						event = "MsgNodeJoined";
						break;
					case "Node left":
						event = "MsgNodeLeft";
						break;
					case "Talker start":
						event = "MsgTalkerStart";
						break;
					case "Talker stop":
						event = "MsgTalkerStop";
						break;
					default:
						event = null;
				}
				if ( !(event === null)){
					const log3 = log[3].replace(/\n/g,"");
					const args = log3.split(', ');
					//console.log(log[3])
					//console.log(event, " - ", args)
					this.emit('ReflectorLogic.' + event, args);
				}
				
			} /*else if (log[1] === 'Using configuration file') {
				const network = log[2].slice(log[2].lastIndexOf('.') + 1)
				this.emit('spotnik.network', network)
			} else if ((log[1] === 'SimplexLogic') && (log[2].startsWith('digit='))) {
				this.emit('SimplexLogic.digit', log[2].slice(log[2].lastIndexOf('=') + 1))
			} else if (log[1] === 'RX1'){
				if (log[2].startsWith('The squelch is OPEN')) {
					this.emit('Rx1.open')
				} else if (log[2].startsWith('The squelch is CLOSED')) {
					this.emit('Rx1.closed')
				}
			} else if (log[1] === 'TX1'){
				if (log[2].startsWith('Turning the transmitter ON')) {
					this.emit('Tx1.on')
				} else if (log[2].startsWith('Turning the transmitter OFF')) {
					this.emit('Tx1.off')
				}
			}*/
		})
	}
}

module.exports = SvxlinkParser;