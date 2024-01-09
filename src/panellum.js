const viewer = pannellum.viewer("panorama", {
  default: {
    firstScene: "scene1",
    sceneFadeDuration: 1000,
  },
  scenes: {
    scene1: {
      hfov: 75,
      type: "equirectangular",
      panorama: "/360_1.jpg",
      hotSpots: [
        {
          pitch: 0,
          yaw: 0,
          type: "scene",
          sceneId: "scene2",
          clickHandlerFunc: (hotSpot, args) =>
            loadSceneWithPitchYaw(viewer, args),
          clickHandlerArgs: "scene2",
        },
      ],
    },
    scene2: {
      hfov: 75,
      type: "equirectangular",
      panorama: "/360_2.jpg",
      hotSpots: [
        {
          pitch: 0,
          yaw: 170,
          type: "scene",
          sceneId: "scene1",
          clickHandlerFunc: (hotSpot, args) =>
            loadSceneWithPitchYaw(viewer, args),
          clickHandlerArgs: "scene1",
        },
      ],
    },
  },
  autoLoad: true,
});

function loadSceneWithPitchYaw(viewer, args) {
  viewer.loadScene(args, viewer.getPitch(), viewer.getYaw(), viewer.getHfov());
}
