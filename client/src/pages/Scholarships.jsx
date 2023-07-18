import { useEffect } from 'react';
import { useSships } from '../context/SshipsContext';

const Scholarships = () => {
  const { getBecas, becas } = useSships();

  useEffect(() => {
    getBecas();
  }, []);

  // Aqui puede agregar un if que verifique si hay o no tareas
  return (
    <div
      data-name='login'
      className='flex h-[calc(100vh)] items-center justify-center bg-white text-gray-700'
    >
      <div className='bg-slate-800 max-w-md w-full p-10'>
        <h2 className='text-7xl mb-3 text-slate-500'>Becas uwu</h2>
        {becas.map((beca) => (
          <div key={beca._id} className='bg-slate-100 my-2 p-4'>
            <h1 className='font-bold'>{beca.title}</h1>
            <p>{beca.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scholarships;
