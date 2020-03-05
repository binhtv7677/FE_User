import React, { useContext } from "react";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

export default registerForPushNotificationsAsync = async () => {
  // const gobalState = useContext(gobalStateContext);
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return;
  }

  try {
    let token = await Notifications.getExpoPushTokenAsync();
    // await firebase
    //   .database()
    //   .ref("users/" + "/push_token")
    //   .set(token);
    return token;
  } catch (error) {
    console.log(error);
  }
}
