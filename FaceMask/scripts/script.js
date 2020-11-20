/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

// How to load in modules
const Scene = require('Scene');

// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');

const FaceTracking = require('FaceTracking');
const Time = require('Time');
const Patches = require('Patches');
const Materials = require('Materials');
const Textures = require('Textures');

// Enables async/await in JS [part 1]
(async function () {

	// To use variables and functions across files, use export/import keyword
	// export const animationDuration = 10;

	// Use import keyword to import a symbol from another file
	// import { animationDuration } from './script.js'

	// To access scene objects
	// const [directionalLight] = await Promise.all([
	//   Scene.root.findFirst('directionalLight0')
	// ]);

	// To access class properties
	// const directionalLightIntensity = directionalLight.intensity;

	// To log messages to the console
	// Diagnostics.log('Console message logged from the script.');

	// Enables async/await in JS [part 2]

	var particula1 = null, particula2 = null, particula3 = null;
	var chileHat = null, peruHat = null, argentinaHat = null, colombiaHat = null, uruguayHat = null, panamaHat = null, ecuadorHat = null, brasilHat = null, caribeHat = null, mexicoHat = null;
	var chileText = null, peruText = null, argentinaText = null, colombiaText = null, uruguayText = null, panamaText = null, ecuadorText = null, brasilText = null, caribeText = null, mexicoText = null, faceMat = null;
	var bocaAbierta = false;

	var timeoutTimer = null;

	var paisIndex = await Patches.outputs.getScalar('paisIndex');
	Diagnostics.log(paisIndex.pinLastValue());

	Promise.all([
		Scene.root.findFirst('particula1'),
		Scene.root.findFirst('particula2'),
		Scene.root.findFirst('particula3'),
	]).then(function (results) {

		particula1 = results[0];
		particula2 = results[1];
		particula3 = results[2];

		FaceTracking.face(0)
			.mouth.openness.monitor()
			.subscribe(function (event) {

				var nuevoBocaAbierta = (event.newValue > 0.3);

				if (nuevoBocaAbierta != bocaAbierta) {
					bocaAbierta = nuevoBocaAbierta;

					if (timeoutTimer != null) Time.clearTimeout(timeoutTimer);

					if (bocaAbierta) {
						MostrarParticulas();
					}
					else {
						timeoutTimer = Time.setTimeout(OcultarParticulas, 1000);
					}
				}
			});
	});

	Promise.all([
		Scene.root.findFirst('Gorro smooth 1'),
		Scene.root.findFirst('Gorro smooth 2'),
		Textures.findFirst('Chile'),
		Textures.findFirst('Peru'),
		Textures.findFirst('Argentina'),
		Textures.findFirst('Colombia'),
		Textures.findFirst('Uruguay'),
		Textures.findFirst('Panama'),
		Textures.findFirst('Ecuador'),
		Textures.findFirst('Brasil'),
		Textures.findFirst('Caribe'),
		Textures.findFirst('Mexico'),
		Materials.findFirst('FaceMat')
	]).then(function (results) {

		chileHat = results[0];
		peruHat = results[1];
		chileText = results[2];
		peruText = results[3];
		// argentinaText = results[4];
		// colombiaText = results[5];
		// uruguayText = results[6];
		// panamaText = results[7];
		// ecuadorText = results[8];
		// brasilText = results[9];
		// caribeText = results[10];
		// mexicoText = results[11];
		faceMat = results[12];

		paisIndex.monitor().subscribe(function () {
			HideHats(results);

			switch (paisIndex.pinLastValue()) {
				case 0:
					chileHat.hidden = false;
					faceMat.diffuse = chileText;
					// code block
					break;
				case 1:
					peruHat.hidden = false;
					faceMat.diffuse = peruText;
					// code block
					break;
				// case 2:
				// 	// code block
				// 	faceMat.diffuse = argentinaText;
				// 	break;
				// case 3:
				// 	// code block
				// 	faceMat.diffuse = colombiaText;
				// 	break;
				// case 4:
				// 	// code block
				// 	faceMat.diffuse = uruguayText;
				// 	break;
				// case 5:
				// 	// code block
				// 	faceMat.diffuse = panamaText;
				// 	break;
				// case 6:
				// 	// code block
				// 	faceMat.diffuse = ecuadorText;
				// 	break;
				// case 7:
				// 	// code block
				// 	faceMat.diffuse = brasilText;
				// 	break;
				// case 8:
				// 	// code block
				// 	faceMat.diffuse = caribeText;
				// 	break;
				// case 9:
				// 	// code block
				// 	faceMat.diffuse = mexicoText;
				// 	break;
			}
		}
		);


	});

	function MostrarParticulas() {
		particula1.hidden = false;
		particula2.hidden = false;
		particula3.hidden = false;
	}

	function OcultarParticulas() {
		particula1.hidden = true;
		particula2.hidden = true;
		particula3.hidden = true;
	}

	function ChangeCountry(index) {
		Diagnostics.log(index);
	}

	function HideHats(items){
		for(var i = 0; i < items.length; i++){
			items[i].hidden = true;
		}
		// items.forEach(element => {
		// 	element.hidden = true;
		// });
	}

})();
