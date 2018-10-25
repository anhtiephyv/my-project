
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
// class notification extends Component {
//   createNotification = (type) => {
//     return () => {
//       switch (type) {
//         case 'info':
//           NotificationManager.info('Info message');
//           break;
//         case 'success':
//           NotificationManager.success('Success message', 'Title here');
//           break;
//         case 'warning':
//           NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
//           break;
//         case 'error':
//           NotificationManager.error('Error message', 'Click me!', 5000, () => {
//             alert('callback');
//           });
//           break;
//       }
//     };
//   };
// }
export function success(message, messageTitle = null,timeOut=2000) {
    return   NotificationManager.success(message,messageTitle,timeOut);
}
export function info(message, messageTitle = null,timeOut=2000) {
    return   NotificationManager.info(message,messageTitle,timeOut);
}
export function warning(message, messageTitle = null,timeOut=2000) {
    return   NotificationManager.warning(message,messageTitle,timeOut);
}
export function error(message, messageTitle = null,timeOut=2000) {
    return   NotificationManager.error(message,messageTitle,timeOut);
}