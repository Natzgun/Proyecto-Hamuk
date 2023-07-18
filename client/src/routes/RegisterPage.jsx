import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isAuthenticated, signup, errors: registerErrors } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigation('/tasks');
    }
  }, [isAuthenticated]);

  const onSubmitReg = handleSubmit(async (values) => {
    signup(values);
  });
  return (
    <div className='flex h-[calc(100vh)] items-center justify-center bg-slate-800 text-gray-300'>
      <div className='bg-white max-w-md w-full p-10 rounded-md'>
        <h2 className='text-3xl mb-3 text-slate-500 font-bold'>Registro</h2>
        {registerErrors.map((error, i) => (
          <div className='bg-red-500 p-2' key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmitReg}>
          <input
            type='text'
            {...register('username', { required: true })}
            className='w-full bg-slate-500 text-white px-4 py-2 rounded-sm my-2'
            placeholder='Usuario'
          ></input>
          {errors.username && (
            <p className='text-red-500'>Nombre de usuario es requerido</p>
          )}

          <input
            type='email'
            {...register('email', { required: true })}
            className='w-full bg-slate-500 text-white px-4 py-2 rounded-sm my-2'
            placeholder='Correo'
          ></input>
          {errors.email && <p className='text-red-500'>Email es requerido</p>}

          <input
            type='password'
            {...register('password', { required: true })}
            className='w-full bg-slate-500 text-white px-4 py-2 rounded-sm my-2'
            placeholder='Contraseña'
          ></input>
          {errors.password && (
            <p className='text-red-500'>Contraseña es requerida</p>
          )}

          <button type='submit' className=''>
            Registrarse
          </button>
        </form>
        <p className='flex gap-x-2 justify-between'>
          Ya tienes una cuenta? <Link to='/login' className='text-sky-500'>Inicia Sesión</Link>{' '}
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
