const {SALONS, SRVRNR, EXCLUSIONS} = require('../../config')

function fsm(EE, changeHandler = () => {}, init = {}) {
	const states = Object.create(null)

	function reset() {
		states.nodes = [];
		states.transmitters = {};
		SALONS.forEach(sln => {
			states.transmitters[sln.name] = null;
		})
	}

	reset()

	Object.assign(states, init)

	function on(event, handler) {
		if (typeof EE.addEventListener === 'function') {
			EE.addEventListener(event, evt => {
				handler(JSON.parse(evt.data))
			})
		} else {
			EE.on(event, handler)
		}
	}

	// node = [server, salon, name, IP];

	nodeIndex = (arr, nd) => {	
		var [a,b,c] = nd;
		for (var i = 0; i < arr.length; i++) {
			var [d,e,f] = arr[i];
			if ((a === d) && (b === e) && (c === f)){
				return i;
			}
		}
		return -1;
	}
	
	isExcluded = (nd) => {
		if (nd[0] === SRVRNR){
			const excl = EXCLUSIONS[nd[1]];
			if (excl.includes(nd[2])){
				return true
			}
		}
		return false
	}


	on('ReflectorLogic.loginOk', (data) => {
		const idx = nodeIndex(states.nodes, data);
		if (idx <0 ) {
			states.nodes.unshift(data);
		}
	})

	on('ReflectorLogic.disconnected', (data) => {
		const idx = nodeIndex(states.nodes, data);
		if (idx > -1) {
			states.nodes.splice(idx, 1)
		}
	})

	on('ReflectorLogic.talkerStart', (data) => {
		if (! isExcluded(data)){
			states.transmitters[data[1]] = data;
		}
	})

	on('ReflectorLogic.talkerStop', (data) => { 
		if (! isExcluded(data)){
			states.transmitters[data[1]] = null;
		}
	})

	return states
}


module.exports= fsm;

