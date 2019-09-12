/* Configuration du TABLEAU DE BORD RRF - API SERVER*/

/* Serveur */

const PORT = 4443;        // Port Number
const PROTOCOL = "http";    // Http, https protocols
const SRVRNR = 3;         // Server Number
const SRVRNAME = "RRF3"   // Server Name


/* Liste et paramètres des salons hébergés sur ce serveur */

const SALONS = [
  {name: "RRF", 
      file: "/tmp/svxreflector.log",
  },
  {name: "Technique", 
      file: "/tmp/svxreflectortec.log",
  },
  {name: "International", 
      file: "/tmp/svxreflectorint.log",
  },
  {name: "Satellite", 
      file: "/tmp/svxreflectofon.log",
  },
];
  
const EXCLUSIONS = {"RRF": ["RRF"], "Technique": ["TECHNIQUE"], "International": ["INTERNATIONAL"], "Satellite": ["SATELLITE"]}

module.exports.PORT=PORT;
module.exports.PROTOCOL=PROTOCOL;
module.exports.SRVRNR=SRVRNR;
module.exports.SRVRNAME=SRVRNAME;
module.exports.SALONS=SALONS;
module.exports.EXCLUSIONS=EXCLUSIONS;
