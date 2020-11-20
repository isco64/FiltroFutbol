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
	var bocaAbierta = false;
	var timeoutTimer = null;

	// FACE & HAT MATERIALS
	var hatMat = null, faceMat = null;;
	
	// FACE TEXTURES
	var chilFaceTxt = null, peruFaceTxt = null, argeFaceTxt = null, coloFaceTxt = null, urugFaceTxt = null, panaFaceTxt = null, ecuaFaceTxt = null, brasFaceTxt = null, cariFaceTxt = null, mexiFaceTxt = null;
	
	// HAT TEXTURES
	var chilHatTxt = null, peruHatTxt = null, argeHatTxt = null, coloHatTxt = null, urugHatTxt = null, panaHatTxt = null, ecuaHatTxt = null, brasHatTxt = null, cariHatTxt = null, mexiHatTxt = null;

	// SELECTED COUNTRY INDEX
	var paisIndex = await Patches.outputs.getScalar('paisIndex');

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
		Materials.findFirst('lambert1'),
		Materials.findFirst('FaceMat'),
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
		Textures.findFirst('Gorro_GorroMotionLatam_AlbedoTransparency'),
		Textures.findFirst('Gorro_GorroMotionLatam_Normal'),
		Textures.findFirst('Gorro_GorroMotionLatam_Normal'),
		Textures.findFirst('Gorro_GorroMotionLatam_Normal'),
		Textures.findFirst('Gorro_GorroMotionLatam_Normal'),
		Textures.findFirst('Gorro_GorroMotionLatam_Normal'),
		Textures.findFirst('Gorro_GorroMotionLatam_Normal'),
		Textures.findFirst('Gorro_GorroMotionLatam_Normal'),
		Textures.findFirst('Gorro_GorroMotionLatam_Normal'),
		Textures.findFirst('Gorro_GorroMotionLatam_Normal')
	]).then(function (results) {

		hatMat = results[1];
		faceMat = results[2];
		chilFaceTxt = results[3];
		peruFaceTxt = results[4];
		argeFaceTxt = results[5];
		coloFaceTxt = results[6];
		urugFaceTxt = results[7];
		panaFaceTxt = results[8];
		ecuaFaceTxt = results[9];
		brasFaceTxt = results[10];
		cariFaceTxt = results[11];
		mexiFaceTxt = results[12];
		chilHatTxt = results[13];
		peruHatTxt = results[14];
		argeHatTxt = results[15];
		coloHatTxt = results[16];
		urugHatTxt = results[17];
		panaHatTxt = results[18];
		ecuaHatTxt = results[19];
		brasHatTxt = results[20];
		cariHatTxt = results[21];
		mexiHatTxt = results[22];

		paisIndex.monitor().subscribe(function () {
			// HideHats(results);
			hatMat.hidden = false;

			switch (paisIndex.pinLastValue()) {
				case 0:
					faceMat.diffuse = chilFaceTxt;
					hatMat.diffuse = chilHatTxt
					// code block
					break;
				case 1:
					faceMat.diffuse = peruFaceTxt;
					hatMat.diffuse = peruHatTxt
					// code block
					break;
				case 2:
					// code block
					faceMat.diffuse = argeFaceTxt;
					hatMat.diffuse = argeHatTxt
					break;
				case 3:
					// code block
					faceMat.diffuse = coloFaceTxt;
					hatMat.diffuse = coloHatTxt
					break;
				case 4:
					// code block
					faceMat.diffuse = urugFaceTxt;
					hatMat.diffuse = urugHatTxt
					break;
				case 5:
					// code block
					faceMat.diffuse = panaFaceTxt;
					hatMat.diffuse = panaHatTxt
					break;
				case 6:
					// code block
					faceMat.diffuse = ecuaFaceTxt;
					hatMat.diffuse = ecuaHatTxt
					break;
				case 7:
					// code block
					faceMat.diffuse = brasFaceTxt;
					hatMat.diffuse = brasHatTxt
					break;
				case 8:
					// code block
					faceMat.diffuse = cariFaceTxt;
					hatMat.diffuse = cariHatTxt
					break;
				case 9:
					// code block
					faceMat.diffuse = mexiFaceTxt;
					hatMat.diffuse = mexiHatTxt
					break;
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
