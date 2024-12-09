import { CardWithForm } from './Cards';

export function Welcome() {
  return (
    <>
      <h1 className="bg-red-500">hey mitron</h1>

      <div>
        <h1 className="text-4xl font-bold text-center">Welcome to Mantine</h1>
        <p className="text-center mt-4 text-lg">
          This is a simple Mantine app created with Vite. It includes basic setup with Mantine
          components and TypeScript.
        </p>
      </div>
      <CardWithForm />
    </>
  );
}
