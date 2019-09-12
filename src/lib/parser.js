const Tail = require('tail').Tail;
const { SRVRNR, EXCLUSIONS } = require('../../config');


const isExcluded = (name, server, salon) => {
	console.log(name, server, salon)
	if (server === SRVRNR){
		const excl = EXCLUSIONS[salon];
		if (excl.includes(name)){
			console.log("true")
			return true
		}
	}
	console.log("false")
	return false
}


class SvxlinkParser {
	constructor(EE,path,server,salon) {

		const tail = new Tail(path, {fromBeginning: true})        // reading the svxreflector.log file
		tail.on("line", line => {
			var event = null;
			var name = "";
			var IP = "";
			
			line = line.toString('utf8').replace(/\n/g,'')
			const log = line.split(': ')
 
			if (line.includes('Login OK')) {
				name = log[1];
              	if (log[2]){
				IP = log[2].substring(14,log[2].indexOf(':'));
				event = "loginOk";
                } else {
                  var d = new Date().toISOString();
                  console.log(d," ERROR : >>>>>>>>>>>>>>>>>>", line, "\n");
                }
			} else if (line.includes('disconnected')){
				if ( log[1] && (! log[1].startsWith('Client'))){
					name = log[1];
					event = "disconnected";
				}
			} else if (log[2] && (log[2].startsWith("Talker start"))) {
				name = log[1];
				if (isExcluded(name, server,salon)){
					event =  null
				} else {
					event = "talkerStart"
				}
//					console.log("talkerStart : ","name = ",'|'+name+'|'," event = ", event)
					
			} else if (log[2] && (log[2].startsWith("Talker stop"))) {
				name = log[1];
				if (isExcluded(name, server,salon)){
					event =  null
				} else {
					event = "talkerStop"
				}
//				console.log("talkerStop : ","name = ",'|'+name+'|'," event = ", event)
			}

			if ( event !== null){
				if (event === "loginOk"){
					var args = [server, salon, name, IP];
				} else {
					var args = [server, salon, name];
				}

				EE.emit('ReflectorLogic.' + event, args);
			}

	})

	tail.on('error', (error) => {
		console.error("Error parsing SvxReflector Log : ", error);
	})
}


}

module.exports = SvxlinkParser;