import { renderRoutes } from 'react-router-config';
import { RouterProps } from '@/interfaces';
export default function App(props: RouterProps) {
  // 在这里可以做一些公共的处理
  console.log('APP:', { props });
  return renderRoutes(props.route?.routes);
}
