import * as THREE from 'three';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import { MindARThree } from 'mindar-image-three';


document.addEventListener("DOMContentLoaded", () => {
	const start = async() => {
		const mindarThree = new MindARThree({
			container: document.body,
			imageTargetSrc: "targets_2.mind",
			uiScanning: "yes",
			uiLoading: "yes",
			maxTrack: 2,
		      });
		const {renderer, scene, camera} = mindarThree;

		const anchor_go = mindarThree.addAnchor(0);
		const anchor_parody = mindarThree.addAnchor(1);

		var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 5);
		scene.add(light);

		const loader = new GLTFLoader();

		loader.load("ship_j.glb", (model1) => {
			anchor_go.group.add(model1.scene);
			model1.scene.scale.set(0.2, 0.2, 0.2);
			model1.scene.position.set(0, 0, 0);
		});

		loader.load("crystal_stone_rock.glb", (model2) => {
			anchor_parody.group.add(model2.scene);
			model2.scene.scale.set(0.45, 0.45, 0.45);
		});


		await mindarThree.start();
		renderer.setAnimationLoop(() => {
			  renderer.render(scene, camera);
		});
	}
	start();
});