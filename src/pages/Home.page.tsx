import WebLayout from '@/layouts/WebLayout';
import Login from './auth/Login';

export function HomePage() {
  return (
    <>
      <WebLayout>
        <Login />
      </WebLayout>
    </>
  );
}
