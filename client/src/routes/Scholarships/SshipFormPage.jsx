import { useForm } from 'react-hook-form';
import { useSships } from '../../context/SshipsContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const SshipFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { beca, createBeca, getBeca, actualizarBeca } = useSships();
  const navigate = useNavigate();
  const params = useParams();
  //console.log(beca);

  useEffect(() => {
    const loadBeca = async () => {
      if (params.id) {
        const sship = await getBeca(params.id);
        setValue('title', sship.title);
        setValue('description', sship.description);
        setValue(
          'date',
          sship.date ? dayjs(sship.date).utc().format('YYYY-MM-DD') : ''
        );
        setValue('completed', sship.completed);
      }
    };
    loadBeca();
  }, []);

  const onSubmitReg = handleSubmit((data) => {
    if (params.id) {
      actualizarBeca(params.id, {
        ...data,
        date: dayjs.utc(data.date).format(),
      });
    } else {
      createBeca({
        ...data,
        date: dayjs.utc(data.date).format(),
      });
    }
    navigate('/becas');
  });

  return (
    <div
      data-name='login'
      className='flex h-[calc(100vh)] items-center justify-center bg-white text-gray-300'
    >
      <div className='bg-slate-900 max-w-md w-full p-10 rounded-lg'>
        <h2 className='text-3xl mb-3 text-slate-500'>Formulario beca</h2>
        <form onSubmit={onSubmitReg}>
          <label htmlFor='title'>Titulo</label>
          <input
            type='text'
            {...register('title', { required: true })}
            className='w-full bg-slate-100 text-black px-4 py-2 rounded-lg my-2'
            placeholder='Titulo'
            autoFocus
          ></input>
          {/* {errors.email && <p className='text-red-500'>Email es requerido</p>} */}

          <label htmlFor='description'>Descripcion</label>
          <textarea
            rows='3'
            {...register('description', { required: true })}
            className='w-full bg-slate-100 text-black px-4 py-2 rounded-lg my-2'
            placeholder='Descripcion'
          ></textarea>
          {/* {errors.password && (
            <p className='text-red-500'>Contraseña es requerida</p>
          )} */}
          <label htmlFor='date'>Fecha</label>
          <input
            type='date'
            {...register('date', { required: true })}
            className='w-full bg-slate-100 text-black px-4 py-2 rounded-lg my-2'
          />
          <button className='rounded-md text-green-50 px-6 py-3 my-2 flex items-center bg-green-500 hover:bg-green-600'>
            Crear
          </button>
        </form>
      </div>
    </div>
  );
};

export default SshipFormPage;
