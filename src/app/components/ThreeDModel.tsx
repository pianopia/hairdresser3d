import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeDModel = ({ textureUrl }: { textureUrl: string }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // シーン、カメラ、レンダラーの初期化
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // テクスチャ付きの球体メッシュの作成
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const texture = new THREE.TextureLoader().load(textureUrl);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 10;

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // メモリリーク防止のためのクリーンアップ
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [textureUrl]);

  return <div ref={mountRef} />;
};

export default ThreeDModel;

