import type { Scene } from "@security-education/course";
import { TitleSceneView } from "./TitleSceneView.tsx";
import { PointsSceneView } from "./PointsSceneView.tsx";
import { EmailSceneView } from "./EmailSceneView.tsx";
import { SmsSceneView } from "./SmsSceneView.tsx";
import { UrlSceneView } from "./UrlSceneView.tsx";
import { PasswordsSceneView } from "./PasswordsSceneView.tsx";

export const SceneView = ({ scene, narrationFrames }: { scene: Scene; narrationFrames: number }) => {
  switch (scene.kind) {
    case "title":
      return <TitleSceneView scene={scene} />;
    case "points":
      return <PointsSceneView scene={scene} narrationFrames={narrationFrames} />;
    case "email":
      return <EmailSceneView scene={scene} narrationFrames={narrationFrames} />;
    case "sms":
      return <SmsSceneView scene={scene} narrationFrames={narrationFrames} />;
    case "url":
      return <UrlSceneView scene={scene} narrationFrames={narrationFrames} />;
    case "passwords":
      return <PasswordsSceneView scene={scene} narrationFrames={narrationFrames} />;
  }
};
