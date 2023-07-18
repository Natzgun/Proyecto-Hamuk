import { useForm } from 'react-hook-form';
import { useSships } from '../../context/SshipsContext';

const SshipFormPage = () => {
  const {register, handleSubmit} = useForm();
  const { beca, createBeca } = useSships();
  console.log(beca);

  const onSubmitReg = handleSubmit((data) =>{
    createBeca(data);
  })

  return (
    <div
      data-name='login'
      className='flex h-[calc(100vh)] items-center justify-center bg-white text-gray-300'
    >
      <div className='bg-slate-900 max-w-md w-full p-10'>
        <h2 className='text-3xl mb-3 text-slate-500'>Formulario beca</h2>
        <form onSubmit={onSubmitReg}>
          <input
            type='text'
            {...register('title', { required: true })}
            className='w-full bg-slate-100 text-black px-4 py-2 rounded-lg my-2'
            placeholder='Titulo'
            autoFocus
          ></input>
          {/* {errors.email && <p className='text-red-500'>Email es requerido</p>} */}

          <textarea
            rows="3"
            {...register('description', { required: true })}
            className='w-full bg-slate-100 text-black px-4 py-2 rounded-lg my-2'
            placeholder='Descripcion'
          ></textarea>
          {/* {errors.password && (
            <p className='text-red-500'>Contraseña es requerida</p>
          )} */}

          <button type='submit' className='rounded-md text-green-50 px-6 py-3 my-2 flex items-center bg-green-500 hover:bg-green-600'>
            Crear
          </button>
        </form>
      </div>
    </div>
  );
};

export default SshipFormPage;
