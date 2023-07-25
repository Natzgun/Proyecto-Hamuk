import { useEffect } from 'react';
import { useSships } from '../../context/SshipsContext';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const ScholarshipPage = () => {
  const { getBecas, becas, eliminarBeca } = useSships();

  useEffect(() => {
    getBecas();
  }, []);

  return (
    <div className='container mx-auto py-36 px-4'>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {becas.map((beca) => (
          <div key={beca._id} className='rounded-lg shadow-lg flex flex-col justify-between'>
            <img
              className='rounded-t-lg'
              src='https://unab.edu.pe/nueva-web/wp-content/uploads/2022/05/280366694_535258778158195_6699245807989852168_n.jpg'
              alt=''
            />
            <div className='p-5'>
              <h2 className='text-2xl text-slate-700 mb-3 font-bold'>
                {beca.title}
              </h2>
              <p className='text-lg font-normal mb-3 text-gray-600'>
                {beca.description}
              </p>
            </div>
            <div className='p-5 flex justify-between'>
              <div>
                <p className='text-lg font-normal mb-3 text-gray-700'>
                  {dayjs(beca.date).utc().format('DD/MM/YYYY')}
                </p>
              </div>

              <div className='gap-x-2'>
                <button onClick={() => {
                  eliminarBeca(beca._id);
                }}
                  type='submit'
                  className='rounded-md text-green-50 px-6 py-3 my-2 flex items-center bg-red-500 hover:bg-red-600'
                >
                  Eliminar
                </button>
                <Link to={`/beca/${beca._id}`}
                  type='submit'
                  className='rounded-md text-green-50 px-6 py-3 my-2 flex items-center bg-green-500 hover:bg-green-600'
                >
                  Actualizar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipPage;
