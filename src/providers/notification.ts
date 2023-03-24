import { NotificationType } from "@web3-onboard/core/dist/types";
import { useNotifications } from "@web3-onboard/react";

export const notify = (
  type: NotificationType,
  message: string,
  calllback: string
) => {
  const [notifications, customNotification, updateNotify] = useNotifications();
  const { update, dismiss } = customNotification({
    eventCode: "dbUpdate",
    type,
    message,
    
    onClick: () => window.open(calllback),
  });
  // Update your notification example below
  // setTimeout(
  //   () =>
  //     update({
  //       eventCode: 'dbUpdateSuccess',
  //       message: 'Hint notification reason resolved!',
  //       type: 'success',
  //       autoDismiss: 5000
  //     }),
  //   4000
  // )
  setTimeout(
    () =>
      // use the dismiss method returned or add an autoDismiss prop to the notification
      dismiss(),
    4000
  );
};
  